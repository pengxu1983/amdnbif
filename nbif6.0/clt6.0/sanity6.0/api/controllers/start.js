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
let maxPSperson_SH  = 10;//TODO
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
