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
let djregxfail      = /dj exited with errors/;
let djregxpass      = /dj exited successfully/;
let syncregxpass    = /All syncs OK/;
let resolvefail     = /resolve skipped/;
let tasktype;
let params;
let act;
let runtimeout      = 60*12;//12 hrs
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
let HOME            = '/proj/cip_nbif_regress1/regressions';
module.exports = {


  friendlyName: 'Sync',


  description: 'Sync something.',


  inputs: {
    act             : {
      type          : 'string'
    },
    codeline        : {
      type          : 'string'
    },
    branch_name     : {
      type          : 'string'
    },
    changelist      : {
      type          : 'string'
    },
    shelve          : {
      type          : 'string'
    },
    describe        : {
      type          : 'string'
    },
    isBAPU          : {
      type          : 'string'
    },
    isOfficial      : {
      type          : 'string'
    },
    variantname     : {
      type          : 'string'
    },
    username        : {
      type          : 'string'
    },
    grouplist       : {
      type          : 'string'
    },
    kickoffdate     : {
      type          : 'string'
    },
    projectname     : {
      type          : 'string'
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
    let inputs_local  = JSON.parse(JSON.stringify(inputs));
    let treeID  = 'regression.'+inputs_local.projectname+'.';
    if(inputs_local.isOfficial  ==  'yes'){
      treeID  +=  'Official.';
    }
    else{
      treeID  +=  'nonOfficial.';
    }
    treeID  +=  inputs_local.codeline+'.'+inputs_local.branch_name+'.CHANGELIST'+inputs_local.changelist+'.SHELVE'+inputs_local.shelve+'.'+inputs_local.variantname+'.'+inputs_local.kickoffdate+'.'+inputs_local.describe+'.'+inputs_local.username;
    let treeRoot  = HOME+'/'+treeID;
    if(fs.existsSync(treeRoot)){
      console.log(loginit()+treeRoot+' exists need to clean ');
      child_process.execSync('rm -rf '+treeRoot+'.*.log');
      child_process.execSync('mv '+treeRoot+' '+treeRoot+'.rm');
      child_process.exec('rm -rf '+treeRoot+'.rm',function(err,stdout,stderr){
        console.log(loginit()+treeRoot+'.rm cleaned');
      });
    }
    child_process.execSync('mkdir -p '+treeRoot);
    //check if killed
    let DB  = await Regressionsummary.findOne({
      codeline    : inputs_local.codeline,
      branch_name : inputs_local.branch_name,
      changelist  : inputs_local.changelist,
      shelve      : inputs_local.shelve,
      describe    : inputs_local.describe,
      isBAPU      : inputs_local.isBAPU,
      isOfficial  : inputs_local.isOfficial,
      variantname : inputs_local.variantname,
      kickoffdate : inputs_local.kickoffdate,
      projectname : inputs_local.projectname
    });
    if((DB.result  =='KILLED')||(DB.result  =='TOKILL')||(DB.result  =='KILLING')){
      return;
    }
    console.log(loginit()+treeRoot+' sync start');
    await Regressionsummary.update({
      codeline    : inputs_local.codeline    ,
      branch_name : inputs_local.branch_name ,
      changelist  : inputs_local.changelist  ,
      shelve      : inputs_local.shelve      ,
      describe    : inputs_local.describe    ,
      isBAPU      : inputs_local.isBAPU      ,
      isOfficial  : inputs_local.isOfficial  ,
      variantname : inputs_local.variantname ,
      kickoffdate : inputs_local.kickoffdate ,
      projectname : inputs_local.projectname ,
    },{
      result      : 'RUNNING',
      treeRoot    : treeRoot
    });
    child_process.execSync('echo "<html><body><h3>Hi benpeng</h3><h4>Regression start to sync.</h4><h4><a href="http://logviewer-atl/'+treeRoot+'">Find Details here</a></h4></body></html>" | mutt  Benny.Peng@amd.com  -e \'set content_type="text/html"\' -s [NBIF][regression][isOfficial:'+inputs_local.isOfficial+'][isBAPU:'+inputs_local.isBAPU+'][codeline:'+inputs_local.codeline+'][branch_name:'+inputs_local.branch_name+'][changelist:'+inputs_local.changelist+'][shelve:'+inputs_local.shelve+'][STARTS]');
    let syncstarttime = new moment();
    child_process.exec(__dirname+'/../../tools/synctree.csh --treeRoot '+treeRoot+' --changelist '+inputs_local.changelist+' --codeline '+inputs_local.codeline+' --branch_name '+inputs_local.branch_name+' > '+treeRoot+'.sync.log',async function(err,stdout,stderr){
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
        child_process.execSync('echo "<html><body><h3>Hi benpeng</h3><h4>Regression sync fail.</h4><h4><a href="http://logviewer-atl/'+treeRoot+'">Find Details here</a></h4></body></html>" | mutt  Benny.Peng@amd.com  -e \'set content_type="text/html"\' -s [NBIF][regression][isOfficial:'+inputs_local.isOfficial+'][isBAPU:'+inputs_local.isBAPU+'][codeline:'+inputs_local.codeline+'][branch_name:'+inputs_local.branch_name+'][changelist:'+inputs_local.changelist+'][shelve:'+inputs_local.shelve+'][describe:'+inputs_local.describe+'][SYNCFAIL]');//FIXME should come from configuration_id
      }
      if(fs.existsSync(treeRoot+'/nb__.sync.PASS')){
        console.log(loginit()+treeRoot+' sync pass');
        child_process.execSync('echo "<html><body><h3>Hi benpeng</h3><h4>Regression sync pass.</h4><h4><a href="http://logviewer-atl/'+treeRoot+'">Find Details here</a></h4></body></html>" | mutt  Benny.Peng@amd.com  -e \'set content_type="text/html"\' -s [NBIF][regression][isOfficial:'+inputs_local.isOfficial+'][isBAPU:'+inputs_local.isBAPU+'][codeline:'+inputs_local.codeline+'][branch_name:'+inputs_local.branch_name+'][changelist:'+inputs_local.changelist+'][shelve:'+inputs_local.shelve+'][describe:'+inputs_local.describe+'][SYNCPASS]');//FIXME should come from configuration_id
        let passon  = JSON.parse(JSON.stringify(inputs_local));
        passon.treeRoot = treeRoot;
        await sails.helpers.resolve.with(passon);
      }
    });
  }


};

