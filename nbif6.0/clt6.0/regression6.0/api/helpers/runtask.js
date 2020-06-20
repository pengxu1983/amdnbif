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


  fn: async function (inputs,exits) {
    sails.log('/runtask');
    sails.log(inputs.testlist.length);
    let inputs_local  = JSON.parse(JSON.stringify(inputs));
    let DB  = await Regressionsummary.findOne({
      codeline    : inputs_local.codeline,
      branch_name : inputs_local.branch_name,
      changelist  : inputs_local.changelist,
      shelve      : inputs_local.shelve,
      describe    : inputs_local.describe,
      isOfficial  : inputs_local.isOfficial,
      isBAPU      : inputs_local.isBAPU,
      kickoffdate : inputs_local.kickoffdate,
      username    : inputs_local.username,
      projectname : inputs_local.projectname,
    });
    if((DB.result  =='KILLED')||(DB.result  =='TOKILL')||(DB.result  =='KILLING')){
      return;
    }
    let maxbsub = 100;
    let regx  = /(\w+)_nbif_all_rtl/;
    let runtext = '';
    for(let t=0;t<inputs_local.testlist.length;t++){
      let caseshort;
      inputs_local.testlist[t]['name'].replace(regx,function(rs,$1){
        caseshort = $1;
      });
      await Regressiondetails.create({
        codeline    : inputs_local.codeline,
        branch_name : inputs_local.branch_name,
        changelist  : inputs_local.changelist,
        shelve      : inputs_local.shelve,
        variantname : inputs_local.variantname,
        casename    : caseshort,
        isBAPU      : inputs_local.isBAPU,
        isOfficial  : inputs_local.isOfficial,
        seed        : inputs_local.testlist[t]['seed'],
        config      : inputs_local.testlist[t]['config'],
        kickoffdate : inputs_local.kickoffdate,
        group       : inputs_local.testlist[t]['group'],
        describe    : inputs_local.describe,
        username    : inputs_local.username,
        result      : 'NOTSTARTED',
        projectname : inputs_local.projectname
      });
      runtext +=  'bsub -P GIONB-SRDC -W '+runtimeout+' -q regr_high -J nbif_R_rn -R "rusage[mem=5000] select[type==RHEL7_64]" '+__dirname+'/../../tools/runonecase.csh --treeRoot '+inputs_local.treeRoot+' --variantname '+inputs_local.variantname+' --tasktype test --runopt runonly --casename  '+caseshort+' --out_anchor '+inputs_local.out_anchor+'\n';
    }
    fs.writeFileSync(inputs_local.treeRoot+'/runtest.script',runtext,{
      encoding  : 'utf8',
      mode      : '0700',
      flag      : 'w'
    });
    child_process.exec(inputs_local.treeRoot+'/runtest.script',async function(err,stdout,stderr){
      console.log(loginit()+inputs_local.treeRoot+' : ');
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
        codeline    : inputs_local.codeline,
        branch_name : inputs_local.branch_name,
        changelist  : inputs_local.changelist,
        shelve      : inputs_local.shelve,
        describe    : inputs_local.describe,
        isOfficial  : inputs_local.isOfficial,
        isBAPU      : inputs_local.isBAPU,
        kickoffdate : inputs_local.kickoffdate,
        username    : inputs_local.username,
        variantname : inputs_local.variantname,
        grouplist   : inputs_local.grouplist,
        projectname : inputs_local.projectname,
      },{
        result      : 'RUNNING',
        bsubQlist   : JSON.stringify(bsubQlist)
      });
    });
    let passon  = JSON.parse(JSON.stringify(inputs_local));
    await sails.helpers.report.with(passon);

  }


};

