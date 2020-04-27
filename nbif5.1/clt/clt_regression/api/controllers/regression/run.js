module.exports = {


  friendlyName: 'Run',


  description: 'Run regression.',


  inputs: {
    isOfficial  : {
      type      : 'string'
    },
    variantname : {
      type      : 'string'
    },
    codeline    : {
      type      : 'string'
    },
    branch_name : {
      type      : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/run');
    sails.log(inputs);
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
