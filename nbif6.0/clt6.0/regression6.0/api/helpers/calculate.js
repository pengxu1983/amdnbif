let querystring     = require('querystring');
let http            = require('http');
let moment          = require('moment');
let process         = require('process');
let cronJob         = require("cron").CronJob;
let child_process   = require('child_process');
let fs              = require('fs');
let YAML            = require('yamljs');
let runtimeout      = 12*60;
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


  friendlyName: 'Calculate',


  description: 'Calculate something.',


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
    treeRoot        : {
      type          : 'string'
    },
    out_anchor      : {
      type          : 'string'
    },
    testlist        : {
      type          : 'json'
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
    sails.log('/calculate');
    //all 
    let regressionID  = {
      kickoffdate   : inputs.kickoffdate,
      projectname   : inputs.projectname,
      codeline      : inputs.codeline,
      branch_name   : inputs.branch_name,
      changelist    : inputs.changelist,
      shelve        : inputs.shelve,
      variantname   : inputs.variantname,
      isOfficial    : inputs.isOfficial,
      isBAPU        : inputs.isBAPU,
      username      : inputs.username,
      grouplist     : inputs.grouplist,
      describe      : inputs.describe
    };
    let regression  = await Regressionsummary.findOne(regressionID);
    let testnumber  = regression.testnumber;
    //pass 
    let passID      = JSON.parse(JSON.stringify(regressionID));
    passID.result   = 'PASS';
    delete passID.grouplist;
    let passnumber  = await Regressiondetails.count(passID);
    let passrate    = (passnumber/testnumber*100).toFixed(2);
    //fail
    let failID      = JSON.parse(JSON.stringify(regressionID));
    failID.result   = 'FAIL';
    delete failID.grouplist;
    let failnumber  = await Regressiondetails.count(failID);
    let failrate    = (failnumber/testnumber*100).toFixed(2);
    //notrun
    let notrunID    = JSON.parse(JSON.stringify(regressionID));
    notrunID.result = 'NOTSTARTED';
    delete notrunID.grouplist;
    let notrunnumber= await Regressiondetails.count(notrunID);
    let notrunrate  = (notrunnumber/testnumber*100).toFixed(2);
    //running
    let runningID   = JSON.parse(JSON.stringify(regressionID));
    runningID.result= 'RUNNING';
    delete runningID.grouplist;
    let runningnumber= await Regressiondetails.count(runningID);
    let runningrate = (runningnumber/testnumber*100).toFixed(2);
    await Regressionsummary.update(regressionID,{
      passnumber    : passnumber,
      passrate      : passrate,
      failnumber    : failnumber,
      failrate      : failrate,
      notrunnumber  : notrunnumber,
      notrunrate    : notrunrate,
      runningnumber : runningnumber,
      runningrate   : runningrate,
      updatetime    : moment().formate('YYYY-MM-DD HH:mm:ss')
    });
  }


};

