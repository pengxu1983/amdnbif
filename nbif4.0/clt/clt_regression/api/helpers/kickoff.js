let moment          = require('moment');
let querystring     = require('querystring');
let http            = require('http');
let fs              = require('fs');
let child_process   = require('child_process');
let cronJob         = require("cron").CronJob;
module.exports = {


  friendlyName: 'Kickoff',


  description: 'Kickoff general.',


  inputs: {
    workspace : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    branchname  :{
      type  : 'string'
    },
    changelist  : {
      type  : 'string'
    },
    shelve      : {
      type  : 'string'
    },
    isBAPU      : {
      type  : 'string'
    },
    isBACO      : {
      type  : 'string'
    },
    treeRoot    : {
      type  : 'string'
    }

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.log('tree kickoff script');
    sails.log(inputs);
    let text = '';
    text += '#!/tool/pandora64/bin/tcsh\n';
    text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
    text += 'cd '+inputs.treeRoot+'\n';
    text += 'bootenv -v '+inputs.variantname+'\n';
    //text += 'be_dj -l regression_run_log -DRERUN_TDL_BATCH=$batch_name_v $cm_opt run_test -s $suite_opt all -b $trs_opt -w "$set_para" -a run_only'
    text += 'be_dj -l regression_run_log  -m -DREGRESS -DUSE_VRQ -DCGM run_test -s nbifall all -b trs -A trs.batch=abc -A trs.environment='+inputs.variantname+' -A trs.cec.logspec=$STEM/_env/local/nbif_logspec.xml -A trs.switches="-regr-no-results-copy" -w "config==nbif_all_rtl" -a run_only'
    fs.writeFileSync(inputs.treeRoot+'.kickoff',text,{
      encoding  : 'utf8',
      mode      : '0700',
      flag      : 'w'
    });
  }


};

