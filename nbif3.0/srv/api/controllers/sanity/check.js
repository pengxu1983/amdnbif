module.exports = {


  friendlyName: 'Check',


  description: 'Check sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    changelist  : {
      type  : 'string'
    },
    email : {
      type  : 'string'
    },
    codeline  : {
      type  : 'string'
    },
    branch_name : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    sails.log('/sanity/check');
    sails.log(inputs);
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok',
      msg : inputs
    }));

  }


};
