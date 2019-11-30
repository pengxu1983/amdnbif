module.exports = {


  friendlyName: 'Newregressionstart',


  description: 'Newregressionstart regression.',


  inputs: {
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    kickoffdate : {
      type  : 'string'
    },
    isBAPU      : {
      type  : 'string'
    },
    isBACO      : {
      type  : 'string'
    },
    isOfficial  : {
      type  : 'string'
    },
    changelist  : {
      type  : 'string'
    },
    shelve      : {
      type  : 'string'
    },
    testlist    : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/newregressionstart');
    sails.log(inputs);
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
