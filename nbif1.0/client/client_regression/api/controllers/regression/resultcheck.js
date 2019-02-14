var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
var workspace     = '/proj/bif_nbio_vol3_backup/benpeng/';
var jobid_regression_checkresults = new cronJob('*/5 * * * * *',function(){
  console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
  console.log('jobid_regression_checkresults start');
  //get info from DB //TODO
  //Projects 
  //Dirs per project
  let dir = '/proj/nbif_mero_regress1/ip_regress/anttili/branch_nv21_normal_split1/';
  let mode = 'normal';
  let projectname = 'NV21';
  let changelist ;
  //get changelist that regression pick
  let R = child_process.execSync('cd '+dir+' && p4 changes -m1 ...#have');
  console.log(R);
},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Resultcheck',


  description: 'Resultcheck regression.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
