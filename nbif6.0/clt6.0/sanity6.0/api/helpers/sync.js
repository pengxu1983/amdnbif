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
let variants        = ['nbif_nv10_gpu','nbif_draco_gpu','nbif_et_0','nbif_et_1','nbif_et_2'];//TODO
let kinds           = ['test','task'];//TODO
let tests           = ['demo_test_0','demo_test_1','demo_test_2'];//TODO
let tasks           = ['dcelab'];//TODO
let djregxfail      = /dj exited with errors/;
let djregxpass      = /dj exited successfully/;
let syncregxpass    = /All syncs OK/;
let resolvefail     = /resolve skipped/;
let HOME            = '/proj/cip_nbif_regress1/sanitycheck';
let refTrees        = [HOME+'/nbif.ref.main'];
let maxPS_CL        = 20;
let maxPS_SH        = 20;//TODO
let maxPSperson_SH  = 3;//TODO
let runningtasks_CL = 0;
let runningtasks_SH = 0;
let tasktype;
let params;
let act;
let runtimeout      = 60*6;//6 hrs
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


  friendlyName: 'Sync',


  description: 'Sync something.',


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
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.log('/sync');
    sails.log(inputs);
    let treeID  = inputs.checktype+'.'+inputs.codeline+'.'+inputs.branch_name+'.CL'+inputs.changelist+'.SHELVE'+inputs.shelve+'.'+inputs.describe
    let treeRoot;
    treeRoot  = HOME+'/'+treeID;
    //check if killed
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
    else if(fs.existsSync(treeRoot)){
      //clean up workspace
      console.log(loginit()+treeRoot+' exists. cleaning up');
      child_process.execSync('cd '+treeRoot+' && /tool/pandora64/.package/perforce-2009.2/bin/p4 revert ...');
      child_process.execSync('mv '+treeRoot+' '+treeRoot+'.rm');
      child_process.exec('rm -rf '+treeRoot+'.rm',function(err,stdout,stderr){
        console.log(loginit()+treeRoot+'.rm clean done');
      });
    }
    child_process.execSync('mkdir -p '+treeRoot);
    console.log(loginit()+treeRoot+' sync start');
    await Sanitysummary.update({
      codeline    : inputs.codeline    ,
      branch_name : inputs.branch_name ,
      changelist  : inputs.changelist  ,
      shelve      : inputs.shelve      ,
      username    : inputs.username    ,
      describe    : inputs.describe    ,
      checktype   : inputs.checktype   
    },{
      result      : 'RUNNING',
      resultlocation  : treeRoot,
    });
    child_process.execSync('echo "<html><body><h3>Hi '+inputs.username+'</h3><h4>Your shelve/chengelist start to sync.</h4><h4><a href="http://logviewer-atl/'+treeRoot+'">Find Details here</a></h4></body></html>" | mutt  -c Benny.Peng@amd.com '+getemail(inputs.username)+' -e \'set content_type="text/html"\' -s [NBIF][Sanitycheck]['+inputs.checktype+'][STARTS][treeRoot:'+treeRoot+']');
    let syncstarttime = new moment();
    child_process.exec(__dirname+'/../../tools/synctree.csh --treeRoot '+treeRoot+' --codeline '+inputs.codeline+' --branch_name '+inputs.branch_name+' --changelist '+inputs.changelist+' > '+treeRoot+'.sync.log',async function(err,stdout,stderr){
      let syncendtime = new moment();
      console.log(loginit()+treeRoot+' sync done');
      console.log(loginit()+treeRoot+' sync cost '+moment.duration(syncendtime.diff(syncstarttime)).as('minutes')+' minutes');
      if(!fs.existsSync(treeRoot+'.sync.log')){
        fs.writeFileSync(treeRoot+'/nb__.sync.FAIL','',{
          encoding  : 'utf8',
          mode      : '0600',
          flag      : 'w'
        });
      }
      else{
        let lines = fs.readFileSync(treeRoot+'.sync.log','utf8').split('\n');
        lines.pop();
        for(let l=0;l<lines.length;l++){
          if(syncregxpass.test(lines[l])){
            fs.writeFileSync(treeRoot+'/nb__.sync.PASS','',{
              encoding  : 'utf8',
              mode      : '0600',
              flag      : 'w'
            });
            break;
          }
        }
        if(!fs.existsSync(treeRoot+'/nb__.sync.PASS')){
          fs.writeFileSync(treeRoot+'/nb__.sync.FAIL','',{
            encoding  : 'utf8',
            mode      : '0600',
            flag      : 'w'
          });
        }
      }
      if(fs.existsSync(treeRoot+'/nb__.sync.FAIL')){
        console.log(loginit()+treeRoot+' sync fail');
        child_process.execSync('/home/benpeng/rtlogin');
        child_process.execSync('mv '+treeRoot+'.sync.log '+treeRoot+'.sync.log.review');
        child_process.execSync('mv '+treeRoot+' '+treeRoot+'.rm');
        child_process.exec('rm -rf '+treeRoot+'.rm');
        child_process.execSync('echo "<html><body><h3>Hi '+inputs.username+'</h3><h4>Your shelve/chengelist failed to sync. Please contact Benny.Peng@amd.com</h4></body></html>" | mutt  -c Benny.Peng@amd.com '+getemail(inputs.username)+' -e \'set content_type="text/html"\' -s [NBIF][Sanitycheck]['+inputs.checktype+'][SYNCFAIL][treeRoot:'+treeRoot+']');
        setTimeout(async function(){
          await Sanitysummary.update({
            codeline    : inputs.codeline,
            branch_name : inputs.branch_name,
            changelist  : inputs.changelist,
            shelve      : inputs.shelve,
            describe    : inputs.describe,
            checktype   : inputs.checktype
          },{
            result      : 'NOTSTARTED'
          });
        },1*3600*1000);
      }
      if(fs.existsSync(treeRoot+'/nb__.sync.PASS')){
        console.log(loginit()+treeRoot+' sync pass');
        child_process.execSync('echo "<html><body><h3>Hi '+inputs.username+'</h3><h4>Your shelve/chengelist sync pass.</h4><h4><a href="http://logviewer-atl/'+treeRoot+'">Find Details here</a></h4></body></html>" | mutt  -c Benny.Peng@amd.com '+getemail(inputs.username)+' -e \'set content_type="text/html"\' -s [NBIF][Sanitycheck]['+inputs.checktype+'][SYNCPASS][treeRoot:'+treeRoot+']');
        let passon  = JSON.parse(JSON.stringify(inputs));
        passon.treeRoot =  treeRoot;
        await sails.helpers.resolve.with(passon);
      }
    });
    // All done.
    //return exits.success(JSON.stringify({
    //  ok  : 'ok',
    //  msg : treeRoot+' starts'
    //}));
  }


};

