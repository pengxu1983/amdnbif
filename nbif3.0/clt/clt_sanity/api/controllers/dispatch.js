let moment        = require('moment');
let querystring   = require('querystring');
let http          = require('http');
let fs            = require('fs');
let child_process = require('child_process');
let cronJob       = require("cron").CronJob;
//let workdir       = '/proj/cip_floyd_genz/nbif_regression/';
//let refTreeRoot   = workdir+'/nbif.main/';
let cron_disbatch  = new cronJob('0 */2 * * * *',function(){
  console.log('cron_disbatch start at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  
},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Dispatch',


  description: 'Dispatch something.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
