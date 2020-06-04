let querystring     = require('querystring');
let http            = require('http');
let moment          = require('moment');
let process         = require('process');
let cronJob         = require("cron").CronJob;
let child_process   = require('child_process');
let fs              = require('fs');
let variants        = ['nbif_et_0','nbif_et_1','nbif_et_2'];
let loginit         = function(){
  return '[LOG]['+moment().format('YYYY-MM-DD HH:mm:ss')+'] ';
};
let djregxfail      = /dj exited with errors/;
let djregxpass      = /dj exited successfully/;
let syncregxpass    = /All syncs OK/;
let resolvefail     = /resolve skipped/;
let HOME            = '/proj/cip_nbif_regress1/regression';
let treeRoots       = [HOME+'/nbif2_0.nbif2_0_main.nbif_et_0.1'];//TODO
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


  friendlyName: 'Start',


  description: 'Start something.',


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
    treeRoot        : {
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
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/start');
    sails.log(inputs);
    if(inputs.act ==  'start'){
      await Regressionsummary.create({
        codeline      : inputs.codeline,
        branch_name   : inputs.branch_name,
        changelist    : inputs.changelist,
        shelve        : inputs.shelve,
        kickoffdate   : moment().format('YYYY-MM-DD'),
        describe      : inputs.describe,
        isOfficial    : inputs.isOfficial,
        isBAPU        : inputs.isBAPU,
        variantname   : inputs.variantname,
        grouplist     : inputs.grouplist,
        testnumber    : 'NOTSTARTED',
        passnumber    : 'NOTSTARTED',
        failnumber    : 'NOTSTARTED',
        passrate      : 'NOTSTARTED',
        notrunnumber  : 'NOTSTARTED',
        runningnumber : 'NOTSTARTED',
      });
      let passon  = JSON.parse(JSON.stringify(inputs));
      await sails.helpers.sync.with(passon);
    }
    ////////
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
