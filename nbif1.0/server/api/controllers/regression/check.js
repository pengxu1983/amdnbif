var moment = require('moment');
module.exports = {


  friendlyName: 'Check',


  description: 'Check regression.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    datestart : {
      type  : 'string'
    },
    dateend : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    sails.log('/regression/check');
    sails.log(inputs);
    if(inputs.kind  ==  'rangepassingrate'){
      var result  = await sails.helpers.rangepassingrate.with({
        datestart : inputs.datestart,
        dateend   : inputs.dateend
      });
      return exits.success(result);
    }

  }


};
