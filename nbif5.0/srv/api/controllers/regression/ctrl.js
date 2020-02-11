let moment          = require('moment');
let querystring     = require('querystring');
let http            = require('http');
let fs              = require('fs');
let child_process   = require('child_process');
let cronJob         = require("cron").CronJob;
module.exports = {


  friendlyName: 'Ctrl',


  description: 'Ctrl regression.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/ctrl');
    sails.log(inputs);

    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
