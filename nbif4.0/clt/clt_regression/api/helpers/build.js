let moment          = require('moment');
let querystring     = require('querystring');
let http            = require('http');
let fs              = require('fs');
let child_process   = require('child_process');
let cronJob         = require("cron").CronJob;
module.exports = {


  friendlyName: 'Build',


  description: 'Build general.',


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
    }

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.log('tree build script');
    sails.log(inputs);
    let treeRoot = inputs.workspace+'/'+inputs.projectname+'.'+inputs.variantname;
    let text = '';
    text += '#!/tool/pandora64/bin/tcsh\n';
    text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
    text += 'cd '+treeRoot+'\n';
    text += 'bootenv -v '+inputs.variantname+'\n';
    text += 'be_dj -l regression_build_log -m -DREGRESS -DUSE_VRQ -DCGM run_test -s nbifall demo_test_0_nbif_all_rtl  -a execute=off\n';
    fs.writeFileSync(treeRoot+'.build',text,{
      encoding  : 'utf8',
      mode      : '0700',
      flag      : 'w'
    });
  }


};

