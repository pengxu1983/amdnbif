var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
module.exports = {


  friendlyName: 'Run',


  description: 'Run common sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.log('helper: /common-sanity/run');
    sails.log(inputs);
    if(inputs.kind  ==  'runall'){
      
    }
  }


};

