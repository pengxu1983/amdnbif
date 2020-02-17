let moment          = require('moment');
let querystring     = require('querystring');
let http            = require('http');
let fs              = require('fs');
let child_process   = require('child_process');
let cronJob         = require("cron").CronJob;
module.exports = {


  friendlyName: 'Rtlogin',


  description: 'Rtlogin general.',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.log('/general/rtlogin');
    sails.log(inputs);

  }


};

