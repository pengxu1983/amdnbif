let moment          = require('moment');
let querystring     = require('querystring');
let http            = require('http');
let fs              = require('fs');
let child_process   = require('child_process');
let cronJob         = require("cron").CronJob;
let treeRoot        = '/proj/cip_nbif_regress2/nbif_regression/nbif.regression.main.nbif_draco_gpu.1/';
module.exports = {


  friendlyName: 'Start',


  description: 'Start regression.',


  inputs: {
    projectname : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/start');
    sails.log(inputs);
    let text = '';
    //kill last run//TODO
    //prepare
    text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
    text += 'bsub -P BIF-SHUB -q normal -Is -J NBIFrg -R \'rusage[mem=5000] select[type==RHEL7_64]\' rm -rf '+treeRoot+'/out/\n';
    fs.
    //sync
    //build
    //run
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok',
    }));

  }


};
