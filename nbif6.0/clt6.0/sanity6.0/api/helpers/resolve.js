let resolvefail     = /resolve skipped/;
let querystring     = require('querystring');
let http            = require('http');
let moment          = require('moment');
let process         = require('process');
let cronJob         = require("cron").CronJob;
let child_process   = require('child_process');
let fs              = require('fs');
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
module.exports = {


  friendlyName: 'Resolve',


  description: 'Resolve something.',


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
    sails.log('/resolve');
    sails.log(inputs);
    let treeRoot  = inputs.treeRoot;
    let DB  = await Sanitysummary.findOne({
      codeline    : inputs.codeline,
      branch_name : inputs.branch_name,
      changelist  : inputs.changelist,
      shelve      : inputs.shelve,
      describe    : inputs.describe,
      checktype   : inputs.checktype
    });
    if((DB.result  =='KILLED')||(DB.result  =='TOKILL')||(DB.result  =='KILLING')){
      return;
    }
    console.log(loginit()+treeRoot+' resolve start');
    child_process.execSync('echo "<html><body><h3>Hi '+inputs.username+'</h3><h4>Your shelve/changelist start to resolve.</h4><h4><a href="http://logviewer-atl/'+treeRoot+'">Find Details here</a></h4></body></html>" | mutt  -c Benny.Peng@amd.com '+getemail(inputs.username)+' -e \'set content_type="text/html"\' -s [NBIF][Sanitycheck]['+inputs.checktype+'][RESOLVESTART][treeRoot:'+treeRoot+']');
    let resolvestarttime  = new moment();
    child_process.exec(__dirname+'/../../tools/resolve.csh --treeRoot '+treeRoot+' --shelve '+inputs.shelve+' --resolveopt -am > '+treeRoot+'/nb__.resolve.log',async function(){
      let resolveendtime  = new moment();
      console.log(loginit()+treeRoot+' resolve done');
      console.log(loginit()+treeRoot+' resolve cost '+moment.duration(resolveendtime.diff(resolvestarttime)).as('minutes')+' minutes');
      if(!fs.existsSync(treeRoot+'/nb__.resolve.log')){
        fs.writeFileSync(treeRoot+'/nb__.resolve.FAIL','',{
          encoding  : 'utf8',
          mode      : '0600',
          flag      : 'w'
        });
      }
      else{
        let lines=fs.readFileSync(treeRoot+'/nb__.resolve.log','utf8').split('\n');
        lines.pop();
        for(let l=0;l<lines.length;l++){
          if(resolvefail.test(lines[l])){
            fs.writeFileSync(treeRoot+'/nb__.resolve.FAIL','',{
              encoding  : 'utf8',
              mode      : '0600',
              flag      : 'w'
            });
            break;
          }
        }
        if(!fs.existsSync(treeRoot+'/nb__.resolve.FAIL')){
          fs.writeFileSync(treeRoot+'/nb__.resolve.PASS','',{
            encoding  : 'utf8',
            mode      : '0600',
            flag      : 'w'
          });
        }
      }
      if(fs.existsSync(treeRoot+'/nb__.resolve.FAIL')){
        console.log(loginit()+treeRoot+' resolve fail');
        await Sanitysummary.update({
          codeline    : inputs.codeline,
          branch_name : inputs.branch_name,
          changelist  : inputs.changelist,
          shelve      : inputs.shelve,
          username    : inputs.username,
          describe    : inputs.describe,
          checktype   : inputs.checktype,
        },{
          result      : 'FAIL'
        });
        child_process.execSync('echo "<html><body><h3>Hi '+inputs.username+'</h3><h4>Your shelve/changelist failed to resolve.</h4><h4><a href="http://logviewer-atl/'+treeRoot+'">Find Details here</a></h4></body></html>" | mutt  -c Benny.Peng@amd.com '+getemail(inputs.username)+' -e \'set content_type="text/html"\' -s [NBIF][Sanitycheck]['+inputs.checktype+'][RESOLVEFAIL][treeRoot:'+treeRoot+']');
      }
      else if(fs.existsSync(treeRoot+'/nb__.resolve.PASS')){
        console.log(loginit()+treeRoot+' resolve pass');
        child_process.execSync('echo "<html><body><h3>Hi '+inputs.username+'</h3><h4>Your shelve/changelist resolve pass and begin to runtask.</h4><h4><a href="http://logviewer-atl/'+treeRoot+'">Find Details here</a></h4></body></html>" | mutt  -c Benny.Peng@amd.com '+getemail(inputs.username)+' -e \'set content_type="text/html"\' -s [NBIF][Sanitycheck]['+inputs.checktype+'][RESOLVEPASS][treeRoot:'+treeRoot+']');
        let passon  = JSON.parse(JSON.stringify(inputs));
        if(inputs.checktype  ==  'shelvecheck'){
          await sails.helpers.runtask.with(passon);
        }
      }
    });
  }


};

