module.exports = {


  friendlyName: 'Check',


  description: 'Check sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    shelvenumber: {
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
    if(inputs.changelist != 'top'){
      sails.log('not from top cl');
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok',
      msg : inputs
    }));

  }


};
