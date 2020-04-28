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
    },
    groupname   : {
      type      : 'string'
    },
    projectname : {
      type      : 'string'
    },
    isBAPU      : {
      type      : 'string'
    },
    shelve      : {
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
