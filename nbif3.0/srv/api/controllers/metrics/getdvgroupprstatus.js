let moment =require('moment');
module.exports = {


  friendlyName: 'Getdvgroupprstatus',


  description: 'Getdvgroupprstatus metrics.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    DVgroup : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/metrics/getdvgroupprstatus');
    sails.log(inputs);
    // All done.
    if(inputs.kind  ==  'Bygrp'){
      //
    }
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'not valid kind'
    }));

  }


};
