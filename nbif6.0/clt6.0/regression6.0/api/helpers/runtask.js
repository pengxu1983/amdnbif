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
    testlist        : {
      type          : 'json'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {
    sails.log('/runtask');
    sails.log(inputs.testlist.length);
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
    let maxbsub = 100;
    let regx  = /(\w+)_nbif_all_rtl/;
    let runtext = '';
    for(let t=0;t<inputs.testlist.length;t++){
      let caseshort;
      inputs.testlist[t]['name'].replace(regx,function(rs,$1){
        caseshort = $1;
      });
      await Regressiondetails.create({
        codeline    : inputs.codeline,
        branch_name : inputs.branch_name,
        changelist  : inputs.changelist,
        shelve      : inputs.shelve,
        variantname : inputs.variantname,
        casename    : caseshort,
        isBAPU      : inputs.isBAPU,
        isOfficial  : inputs.isOfficial,
        seed        : inputs.testlist[t]['seed'],
        config      : inputs.testlist[t]['config'],
        kickoffdate : inputs.kickoffdate,
        group       : inputs.testlist[t]['group'],
        describe    : inputs.describe,
        username    : inputs.username,
        result      : 'NOTSTARTED',
      });
      runtext +=  'bsub -P GIONB-SRDC -W '+runtimeout+' -q regr_high -J nbif_R_rn -R "rusage[mem=5000] select[type==RHEL7_64]" '+__dirname+'/../../tools/runonecase.csh --treeRoot '+inputs.treeRoot+' --variantname '+inputs.variantname+' --tasktype test --runopt runonly --casename  '+caseshort+' --out_anchor '+inputs.out_anchor+'\n';
    }
    fs.writeFileSync(inputs.treeRoot+'/runtest.script',runtext,{
      encoding  : 'utf8',
      mode      : '0700',
      flag      : 'w'
    });
    child_process.exec(inputs.treeRoot+'/runtest.script',async function(err,stdout,stderr){
      console.log(loginit()+inputs.treeRoot+' : ');
      console.log(stdout);
      let lines = stdout.split('\n');
      lines.pop();
      let regx=/Job <(\d+)>/;
      let bsubQlist  = [];
      for(let l=0;l<lines.length;l++){
        if(regx.test(lines[l])){
          lines[l].replace(regx,function(rs,$1){
            bsubQlist.push($1);
          });
        }
      }
      await Regressionsummary.update({
        codeline    : inputs.codeline,
        branch_name : inputs.branch_name,
        changelist  : inputs.changelist,
        shelve      : inputs.shelve,
        describe    : inputs.describe,
        isOfficial  : inputs.isOfficial,
        isBAPU      : inputs.isBAPU,
        kickoffdate : inputs.kickoffdate,
        username    : inputs.username,
        variantname : inputs.variantname,
        grouplist   : inputs.grouplist
      },{
        result      : 'RUNNING',
        bsubQlist   : JSON.stringify(bsubQlist)
      });
      let passon  = JSON.parse(JSON.stringify(inputs));
      await sails.helpers.report.with(passon);
    });
  }


};

