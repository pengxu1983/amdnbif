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
    let treeRoot = inputs.workspace+'/'+inputs.projectname+'.'+inputs.variantname;
    text += '#!/tool/pandora64/bin/tcsh\n';
    text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
    text += '/home/benpeng/rtlogin\n';
    text += 'mkdir '+treeRoot+'\n';
    text += 'cd '+treeRoot+'\n';
    if(inputs.branchname  ==  'main'){
      if(inputs.changelist  = 'latest'){
        text += 'p4_mkwa -codeline nbif2_0\n';
      }
      else{
        text += 'p4_mkwa -codeline nbif2_0 -cl '+inputs.changelist+'\n';
      }
    }
    else{
      if(inputs.changelist  = 'latest'){
        text += 'p4_mkwa -codeline nbif2_0 -branch_name '+inputs.branchname+'\n';
      }
      else{
        text += 'p4_mkwa -codeline nbif2_0 -branch_name '+inputs.branchname+' -cl '+inputs.changelist+'\n';
      }
    }
    fs.writeFileSync(treeRoot+'.sync',text,{
      encoding  : 'utf8',
      mode      : '0700',
      flag      : 'w'
    });
    //child_process.exec('bsub -P bif-shub1 -q normal -Is -J NBIFrg -R \'rusage[mem=1000] select[type==RHEL7_64]\' '+treeRoot+'.sync',(error,stdout,stderr)=>{
    //  if(error){
    //    sails.log(error);
    //    return;
    //  }
    //  sails.log(stdout);
    //  sails.log(stderr);
    //  fs.writeFileSync(inputs.workspace+'/SYNCPASS','',{
    //    encoding  : 'utf8',
    //    mode      : '0600',
    //    flag      : 'w'
    //  });
    //});
    
  }


};

