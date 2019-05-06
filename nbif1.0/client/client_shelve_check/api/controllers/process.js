var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
var workspace     = '/local_vol1_nobackup/benpeng/';
let CONF          = workspace+'/shelvecheckCONF';
module.exports = {


  friendlyName: 'Process',


  description: 'Process something.',


  inputs: {
    
  },


  exits: {

  },


  fn: async function (inputs,exits) {

    // All done.
    return;

  }


};
