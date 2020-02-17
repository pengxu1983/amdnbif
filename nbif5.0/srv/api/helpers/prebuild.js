let moment          = require('moment');
let querystring     = require('querystring');
let http            = require('http');
let fs              = require('fs');
let child_process   = require('child_process');
let cronJob         = require("cron").CronJob;
module.exports = {


  friendlyName: 'Prebuild',


  description: 'Prebuild something.',


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
    sails.log('tree prebuild script');
    sails.log(inputs);
    let text = '';
    text += '#!/tool/pandora64/bin/tcsh\n';
    text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
    text += 'cd '+inputs.treeRoot+'\n';
    text += 'bootenv -v '+inputs.variantname+'\n';
    text += 'dj -l testlist.log -DDEBUG -m run_test -s nbifall all -a print -w "config==nbif_all_rtl"\n';
    text += 'rm -rf '+inputs.treeRoot+'/out\n';
    fs.writeFileSync(inputs.treeRoot+'.prebuild',text,{
      encoding  : 'utf8',
      mode      : '0700',
      flag      : 'w'
    });
  }


};

