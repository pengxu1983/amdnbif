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
    isBAPU      : {
      type      : 'string'
    },
    isOfficial  : {
      type      : 'string'
    },
    treeRoot    : {
      type      : 'string'
    },
    variantname : {
      type      : 'string'
    },
    username    : {
      type      : 'string'
    },
    grouplist   : {
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
    let treeID  = '';
    if(inputs.isOfficial  ==  'yes'){
      treeID  +=  'Official.';
    }
    else{
      treeID  +=  'nonOfficial.';
    }
    treeID  +=  inputs.codeline+'.'+inputs.branch_name+'.CHANGELIST'+inputs.changelist+'.SHELVE'+inputs.shelve+'.'+inputs.describe;
    treeRoot  = HOME+'/'+treeID;
    //check if killed
    let DB  = await Regressionsummary.findOne({
      codeline    : inputs.codeline,
      branch_name : inputs.branch_name,
      changelist  : inputs.changelist,
      shelve      : inputs.shelve,
      describe    : inputs.describe,
      isBAPU      : inputs.isBAPU,
      isOfficial  : inputs.isOfficial,
      variantname : inputs.variantname
    });
    if((DB.result  =='KILLED')||(DB.result  =='TOKILL')||(DB.result  =='KILLING')){
      return;
    }
    if(!fs.existsSync(treeRoot)){
      //clean up workspace
      console.log(loginit()+treeRoot+' not exists please contact Benny.Peng@amd.com');
      return;
    }
    console.log(loginit()+treeRoot+' sync start');
    await Regressionsummary.update({
      codeline    : inputs.codeline    ,
      branch_name : inputs.branch_name ,
      changelist  : inputs.changelist  ,
      shelve      : inputs.shelve      ,
      describe    : inputs.describe    ,
      isBAPU      : inputs.isBAPU      ,
      isOfficial  : inputs.isOfficial  ,
      variantname : inputs.variantname 
    },{
      result      : 'RUNNING',
      treeRoot    : treeRoot
    });
    child_process.execSync('echo "<html><body><h3>Hi benpeng</h3><h4>Regression start to sync.</h4><h4><a href="http://logviewer-atl/'+treeRoot+'">Find Details here</a></h4></body></html>" | mutt  Benny.Peng@amd.com  -e \'set content_type="text/html"\' -s [NBIF][regression][isOfficial:'+inputs.isOfficial+'][isBAPU:'+inputs.isBAPU+'][codeline:'+inputs.codeline+'][branch_name:'+branch_name+'][changelist:'+inputs.changelist+'][shelve:'+inputs.shelve+'][STARTS]');
    let syncstarttime = new moment();
    child_process.exec(__dirname+'/../../tools/synctree.csh --treeRoot '+treeRoot+' --changelist '+inputs.changelist+' --codeline '+inputs.codeline+' --branch_name '+inputs.branch_name+' > '+treeRoot+'/nb__.sync.log',async function(err,stdout,stderr){
      let syncendtime = new moment();
      console.log(loginit()+treeRoot+' sync done');
      console.log(loginit()+treeRoot+' sync cost '+moment.duration(syncendtime.diff(syncstarttime)).as('minutes')+' minutes');
      if(!fs.existsSync(treeRoot+'/nb__.sync.log')){
        fs.writeFileSync(treeRoot+'/nb__.sync.FAIL','',{
          encoding  : 'utf8',
          mode      : '0600',
          flag      : 'w'
        });
      }
      else{
        let lines = fs.readFileSync(treeRoot+'/nb__.sync.log','utf8').split('\n');
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
        child_process.execSync('echo "<html><body><h3>Hi benpeng</h3><h4>Regression sync fail.</h4><h4><a href="http://logviewer-atl/'+treeRoot+'">Find Details here</a></h4></body></html>" | mutt  Benny.Peng@amd.com  -e \'set content_type="text/html"\' -s [NBIF][regression][isOfficial:'+inputs.isOfficial+'][isBAPU:'+inputs.isBAPU+'][codeline:'+inputs.codeline+'][branch_name:'+branch_name+'][changelist:'+inputs.changelist+'][shelve:'+inputs.shelve+'][STARTS]');//FIXME should come from configuration_id
      }
      if(fs.existsSync(treeRoot+'/nb__.sync.PASS')){
        console.log(loginit()+treeRoot+' sync pass');
        child_process.execSync('echo "<html><body><h3>Hi benpeng</h3><h4>Regression sync pass.</h4><h4><a href="http://logviewer-atl/'+treeRoot+'">Find Details here</a></h4></body></html>" | mutt  Benny.Peng@amd.com  -e \'set content_type="text/html"\' -s [NBIF][regression][isOfficial:'+inputs.isOfficial+'][isBAPU:'+inputs.isBAPU+'][codeline:'+inputs.codeline+'][branch_name:'+branch_name+'][changelist:'+inputs.changelist+'][shelve:'+inputs.shelve+'][STARTS]');//FIXME should come from configuration_id
        let passon  = JSON.parse(JSON.stringify(inputs));
        await sails.helpers.resolve.with(passon);
      }
    });
  }


};

