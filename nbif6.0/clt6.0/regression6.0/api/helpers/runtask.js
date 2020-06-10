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


  friendlyName: 'Runtask',


  description: 'Runtask something.',


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
    casename        : {
      type          : 'string'
    },
    config          : {
      type          : 'string'
    },
    suite           : {
      type          : 'string'
    },
    seed            : {
      type          : 'string'
    },
    group           : {
      type          : 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {
    sails.log('/runtask');
    sails.log(inputs);
    let DB  = await Regressionsummary.findOne({
      codeline    : inputs.codeline,
      branch_name : inputs.branch_name,
      changelist  : inputs.changelist,
      shelve      : inputs.shelve,
      describe    : inputs.describe,
      isOfficial  : inputs.isOfficial,
      isBAPU      : inputs.isBAPU,
      kickoffdate : inputs.kickoffdate,
      username    : inputs.username
    });
    if((DB.result  =='KILLED')||(DB.result  =='TOKILL')||(DB.result  =='KILLING')){
      return;
    }
    let caseshort;
    let regx  = /(\w+)_nbif_all_rtl/;
    inputs.casename.replace(regx,function(rs,$1){
      caseshort = $1;
    });
    console.log(loginit()+inputs.treeRoot+' '+caseshort+' start');
    //child_process.exec('bsub -P GIONB-SRDC -W '+runtimeout+' -q regr_high -J nbif_R_rn -R "rusage[mem=5000] select[type==RHEL7_64]" '+__dirname+'/../../tools/runonecase.csh --treeRoot '+inputs.treeRoot+' --variantname '+inputs.variantname+' --tasktype test --casename  '+caseshort+' --out_anchor '+inputs.treeRoot+'/out.'+inputs.variantname+'.'+inputs.kickoffdate,async function(err_run,stdout_run,stderr_run){
    //  console.log(loginit()+inputs.treeRoot+' '+caseshort+' dispatched');
    //  console.log(stderr_run);
    //});
    return;
  }


};

