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
let HOME            = '/proj/cip_nbif_regress1/regression';
let treeRoot        = HOME+'/nbif2_0.nbif2_0_main.nbif_et_0.1';
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
let cron_check  = new cronJob('*/10 * * * * *',async function(){
  //check if too many running overall
  let shelvecheckRunnings  = await Sanitysummary.find({
    checktype   : 'shelvecheck',
    result      : 'RUNNING'
  });
  console.log(loginit()+'shelvecheck running number is '+shelvecheckRunnings.length);
  let changelistcheckRunnings  = await Sanitysummary.find({
    checktype   : 'changelistcheck',
    result      : 'RUNNING'
  });
  console.log(loginit()+'changelistcheck running number is '+changelistcheckRunnings.length);
  if(shelvecheckRunnings.length>= maxPS_SH){
    console.log(loginit()+'too many shelvecheck Running tasks');
  }
  else{
    let shelvecheckNotstarted = await Sanitysummary.find({
      checktype   : 'shelvecheck',
      result      : 'NOTSTARTED'
    });
    if(shelvecheckNotstarted.length ==  0){
      console.log(loginit()+'no shelvecheck to run');
    }
    else{
      let pickedupitem  = 'NA';
      for(let i=0;i<shelvecheckNotstarted.length;i++){
        //check if exceed limit
        let username  = shelvecheckNotstarted[i].username;
        let DB  = await Sanitysummary.find({
          checktype : 'shelvecheck',
          result    : 'RUNNING',
          username  : username
        });
        if(DB.length>=maxPSperson_SH){
          console.log(loginit()+'too many '+username+' runnings');
        }
        else{
          pickedupitem  = shelvecheckNotstarted[i];
          break;
        }
      }
      if(pickedupitem=='NA'){
        console.log(loginit()+'no shelvecheck to run');
      }
      else{
        //TODO
        await sails.helpers.sync.with({
          codeline    : pickedupitem.codeline    ,
          branch_name : pickedupitem.branch_name ,
          changelist  : pickedupitem.changelist  ,
          shelve      : pickedupitem.shelve      ,
          username    : pickedupitem.username    ,
          describe    : pickedupitem.describe    ,
          checktype   : pickedupitem.checktype   
        });
      }
    }
  }
  if(changelistcheckRunnings.length>= maxPS_CL){
    //TODO
  }
  //check if too many running personally
  //pick up one item
},null,false,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Start',


  description: 'Start something.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/start');
    sails.log(inputs);
    cron_check.start();//TODO
    ////////
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
