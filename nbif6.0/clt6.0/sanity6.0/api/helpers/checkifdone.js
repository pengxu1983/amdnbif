let resolvefail     = /resolve skipped/;
let querystring     = require('querystring');
let http            = require('http');
let moment          = require('moment');
let process         = require('process');
let cronJob         = require("cron").CronJob;
let child_process   = require('child_process');
let fs              = require('fs');
let YAML            = require('yamljs');
let runtimeout      = 6*60;
let loginit         = function(){
  return '[LOG]['+moment().format('YYYY-MM-DD HH:mm:ss')+'] ';
};
let getemail        = function(username){
  let email;
  let lines = fs.readFileSync('/home/benpeng/p4users','utf8').split('\n');
  lines.pop();
  let regx  = /^(\w+) <(\S+)>.*accessed/;
  for(let l=0;l<lines.length;l++){
    if(regx.test(lines[l])){
      lines[l].replace(regx,function(rs,$1,$2){
        if($1==username){
          email = $2;
        }
      })
    }
  }
  return email;
}
let djregxfail      = /dj exited with errors/;
let djregxpass      = /dj exited successfully/;
module.exports = {


  friendlyName: 'Checkifdone',


  description: 'Checkifdone something.',


  inputs: {
    codeline    : {
      type      : 'string'
    },
    branch_name : {
      type      : 'string'
    },
    changelist  : {
      type      : 'string'
    },
    shelve      : {
      type      : 'string'
    },
    describe    : {
      type      : 'string'
    },
    username    : {
      type      : 'string'
    },
    hostname    : {
      type      : 'string'
    },
    checktype   : {
      type      : 'string'
    },
    treeRoot    : {
      type      : 'string'
    },
    MASK        : {
      type      : 'string'
    },
    HOME        : {
      type      : 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {
    sails.log('/checkifdone');
    sails.log(inputs);
    let MASK  = JSON.parse(inputs.MASK);
    let isDone='yes';
    let overall='PASS';
    let mailbody  = '';
    mailbody  +=  '<html>\n';
    mailbody  +=  '<body>\n';
    mailbody  +=  '<h3>Hi '+inputs.username+'</h3>\n';
    for(let variantname in MASK){
      mailbody  +=  '<h4>Variant : '+variantname+'</h4>\n';
      mailbody  +=  '<table border="1">\n';
      mailbody  +=  '<tr>\n';
      mailbody  +=  '  <th>Case Name</th>\n';
      mailbody  +=  '  <th>Result</th>\n';
      mailbody  +=  '  <th>Runtime(min)</th>\n';
      mailbody  +=  '</tr>\n';
      
      for(let tasktype  in  MASK[variantname]){
        for(let casename=0;casename <MASK[variantname][tasktype].length;casename++){
          mailbody  +=  '<tr>\n';
          mailbody  +=  '  <td>'+MASK[variantname][tasktype][casename]+'</td>\n';
          let DB = await Sanitydetails.findOne({
            codeline    : inputs.codeline,
            branch_name : inputs.branch_name,
            changelist  : inputs.changelist,
            shelve      : inputs.shelve,
            username    : inputs.username,
            describe    : inputs.describe,
            checktype   : inputs.checktype,
            variantname : variantname,
            tasktype    : tasktype,
            casename    : MASK[variantname][tasktype][casename]
          });
          if(!DB){
            isDone  = 'no';
            overall = 'NOTDONE';
          }
          else{
            let bgcolor;
            if(DB.result  ==  'PASS'){
              bgcolor = 'lightgreen';
            }
            else if(DB.result ==  'FAIL'){
              bgcolor = 'red';
              overall = 'FAIL';
            }
            else{
              bgcolor = 'yellow';
            }
            mailbody  +=  '  <td bgcolor='+bgcolor+'>'+DB.result+'</td>\n';
            mailbody  +=  '  <td>'+DB.runtime+'</td>\n';
            mailbody  +=  '</tr>\n';
          }
        }
      }
      mailbody  +=  '</table>\n';
    }
    mailbody  +=  '<h4><a href="http://logviewer-atl/'+inputs.treeRoot+'">Find Details here</a></h4>\n';
    mailbody  +=  '</body>\n';
    mailbody  +=  '</html>\n';
    fs.writeFileSync(inputs.treeRoot+'/report',mailbody,{
      encoding  : 'utf8',
      mode      : '0600',
      flag      : 'w'
    });
    if(isDone ==  'yes'){
      console.log(loginit()+'sending email');
      let DBall  = await Sanitycheckdetails.find({
        codeline    : inputs.codeline,
        branch_name : inputs.branch_name,
        changelist  : inputs.changelist,
        shelve      : inputs.shelve,
        username    : inputs.username,
        describe    : inputs.describe,
        checktype   : inputs.checktype
      });
      console.log(loginit()+'done tasks number '+DBall.length);
      let longesttasktype;
      let longesttask;
      let runtime =0;
      let longestvariantname;
      for(let t=0;t<DBall.length;t++){
        if(t==0){
          longesttask = DBall[t].casename;
          longesttasktype = DBall[t].tasktype;
          runtime = DBall[t].runtime;
          longestvariantname  = DBall[t].variantname;
        }
        else{
          if(runtime<DBall[t].runtime){
            longesttask = DBall[t].casename;
            longesttasktype = DBall[t].tasktype;
            runtime = DBall[t].runtime;
            longestvariantname  = DBall[t].variantname;
          }
        }
      }
      console.log('longesttasktype  : '+longesttasktype);
      console.log('longesttask  : '+longesttask);
      console.log('runtime  : '+runtime);
      console.log('longestvariantname : '+longestvariantname);
      child_process.execSync('mutt '+getemail(inputs.username)+' -c Benny.Peng@amd.com -e  \'set content_type="text/html"\' -s [NBIF][SanityCheck]['+inputs.checktype+'][CheckDone:'+overall+'][treeRoot:'+inputs.treeRoot+'] < '+inputs.treeRoot+'/report');
      await Sanitysummary.update({
        codeline    : inputs.codeline,
        branch_name : inputs.branch_name,
        changelist  : inputs.changelist,
        shelve      : inputs.shelve,
        username    : inputs.username,
        describe    : inputs.describe,
        checktype   : inputs.checktype,
      },{
        result      : overall,
        runtime     : runtime,
        longesttasktype : longesttasktype,
        longesttask : longesttask,
        longestvariantname  : longestvariantname
      });
      if(overall  =='FAIL'){
        setTimeout(async function(){
          child_process.exec('cd '+inputs.treeRoot+' && /tool/pandora64/.package/perforce-2009.2/bin/p4 revert ...',function(){
            child_process.execSync('rm -rf '+inputs.treeRoot+'.sync.log');
            child_process.execSync('mv '+inputs.treeRoot+' '+inputs.treeRoot+'.rm');
            child_process.exec('rm -rf '+inputs.treeRoot+'.rm',function(){
              console.log(loginit()+inputs.treeRoot+'.rm is cleaned');
            });
          });
        },48*3600*1000);
      }
      else{
        child_process.exec('cd '+inputs.treeRoot+' && /tool/pandora64/.package/perforce-2009.2/bin/p4 revert ...',function(){
          child_process.execSync('rm -rf '+inputs.treeRoot+'.*.log');
          child_process.execSync('mv '+inputs.treeRoot+' '+inputs.treeRoot+'.rm');
          child_process.exec('rm -rf '+inputs.treeRoot+'.rm',function(){
            console.log(loginit()+inputs.treeRoot+'.rm is cleaned');
          });
        });
      }
    }
  }
};

