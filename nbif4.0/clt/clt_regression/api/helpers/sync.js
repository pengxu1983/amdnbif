let moment          = require('moment');
let querystring     = require('querystring');
let http            = require('http');
let fs              = require('fs');
let child_process   = require('child_process');
let cronJob         = require("cron").CronJob;
module.exports = {


  friendlyName: 'Sync',


  description: 'Sync general.',


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
    sails.log('tree sync script');
    sails.log(inputs);
    let text = '';
    text += '#!/tool/pandora64/bin/tcsh\n';
    text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
    text += '/home/benpeng/rtlogin\n';
    text += 'cd '+inputs.treeRoot+'\n';
    text += 'bootenv -v '+inputs.variantname+'\n';
    if(inputs.changelist  ==  'latest'){
      text += 'p4w sync_all\n';
    }
    else{
      text += 'p4w sync_all @'+inputs.changelist+'\n';
    }
    fs.writeFileSync(inputs.treeRoot+'.sync',text,{
      encoding  : 'utf8',
      mode      : '0700',
      flag      : 'w'
    });
    
  }


};

