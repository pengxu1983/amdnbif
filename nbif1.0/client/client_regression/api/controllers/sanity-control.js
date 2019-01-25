var moment = require('moment');
var fs= require('fs');
var cronJob = require("cron").CronJob;
var child_process = require('child_process');
var workspace = '/local_vol1_nobackup/benpeng';
var jobid_regression_mero_normal = new cronJob('0 42 19 * * *',function(){
  var today = moment().format('YYYYMMDD');
  var text  = '';
  //Remove previous tree
  console.log('Checking if Dir already exists');
  if(fs.existsSync(workspace+'/nbif_main_sanity_mero')){
    console.log('TreeDir already exists');
    console.log('Cleaning up previous tree');
    child_process.execSync('rm -rf '+workspace+'/nbif_main_sanity_mero');
    console.log('Cleaning done');
  }
  else{
    console.log('TreeDir not exists');
    //Do nothing
  }
  //Make a new DIR
  console.log('Making up a new Tree dir');
  fs.mkdirSync(workspace+'/nbif_main_sanity_mero');
  console.log('Tree Dir made');
  console.log('Preparing running script');
  text += '#!/tool/pandora64/bin/tcsh\n';
  text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
  text += 'cd '+workspace+'/nbif_main_sanity_mero\n';
  text += 'p4_mkwa -codeline nbif2_0\n';
  text += 'source useful_cmd\n';
  text += 'mdj_l demo_test_0 12345678\n';
  text += 'mdj_l demo_test_1 12345678\n';
  text += 'mdj_l demo_test_2 12345678\n';
  fs.writeFileSync(workspace+'/nbif_main_sanity_mero_script',text,{
    encoding  : 'utf8',
    mode      : '0700',
    flag      : 'w'
  });
  console.log('Running script prepared');
  console.log('Execute the script');
  child_process.execFileSync(workspace+'/nbif_main_sanity_mero_script');
  console.log('Execute done');
},null,false,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Regression control',


  description: '',


  inputs: {
    kind  : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('sanity-control');
    jobid_regression_mero_normal.start();
    // All done.
    return exits.success({
      ok  : 'ok'
    });

  }


};
