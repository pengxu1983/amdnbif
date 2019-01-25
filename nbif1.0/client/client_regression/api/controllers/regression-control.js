var moment = require('moment');
var fs= require('fs');
var cronJob = require("cron").CronJob;
var child_process = require('child_process');
var jobid_regression_mero_normal = new cronJob('0 46 20 * * *',function(){
  var today = moment().format('YYYYMMDD');
  var text  = '';
  //Remove previous tree
  console.log('Checking if Dir already exists');
  if(fs.existsSync('/proj/bif_nbio_vol1_backup/benpeng/nbif_main_mero_normal')){
    console.log('TreeDir already exists');
    console.log('Cleaning up previous tree');
    child_process.execSync('rm -rf /proj/bif_nbio_vol1_backup/benpeng/nbif_main_mero_normal');
    console.log('Cleaning done');
  }
  else{
    console.log('TreeDir not exists');
    //Do nothing
  }
  //Make a new DIR
  console.log('Making up a new Tree dir');
  fs.mkdirSync('/proj/bif_nbio_vol1_backup/benpeng/nbif_main_mero_normal');
  console.log('Tree Dir made');
  console.log('Preparing running script');
  text += '#!/tool/pandora64/bin/tcsh\n';
  text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
  text += 'cd /proj/bif_nbio_vol1_backup/benpeng/nbif_main_mero_normal\n';
  text += 'p4_mkwa -codeline nbif2_0\n';
  text += 'source useful_cmd -proj mero -cyb\n';
  text += 'bdji -l /proj/bif_nbio_vol1_backup/benpeng/nbif_main_mero_normal/bdji_buildlog -m -DREGRESS -DUSE_VRQ -DCGM run_test -s nbifall demo_test_0_nbif_all_rtl  -a execute=off\n';
  text += 'set cm_opt="-m -DREGRESS -DUSE_VRQ -DCGM"\n';
  text += 'set nbif_signature_file=$STEM/_env/local/nbif_logspec.xml\n';
  text += 'set trs_opt="trs -A trs.batch=mero_normal -A trs.environment=$ENV_VIEW -A trs.cec.logspec=$nbif_signature_file -A trs.switches="-regr-no-results-copy""\n';
  text += 'set suite_opt="nbifall"\n';
  text += 'set cfg_opt="nbif_all_rtl"\n';
  text += 'set set_para = "config==$cfg_opt && when=~/nbif_nightly/"\n';
  text += 'bdji -l /proj/bif_nbio_vol1_backup/benpeng/nbif_main_mero_normal/bdji_simlog  $cm_opt run_test -s $suite_opt all -b $trs_opt -w "$set_para" -a run_only\n';
  fs.writeFileSync('/proj/bif_nbio_vol1_backup/benpeng/nbif_main_mero_normal_script',text,{
    encoding  : 'utf8',
    mode      : '0700',
    flag      : 'w'
  });
  console.log('Running script prepared');
  console.log('Execute the script');
  child_process.execFileSync('/proj/bif_nbio_vol1_backup/benpeng/nbif_main_mero_normal_script');
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
    sails.log('regression-control');
    jobid_regression_mero_normal.start();
    // All done.
    return exits.success({
      ok  : 'ok'
    });

  }


};
