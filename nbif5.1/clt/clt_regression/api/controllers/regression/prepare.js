module.exports = {


  friendlyName: 'Prepare',


  description: 'Prepare regression.',


  inputs: {

  },


  exits: {
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


  fn: async function (inputs) {

    // All done.
    return;

  }


};
