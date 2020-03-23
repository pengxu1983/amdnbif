module.exports = {


  friendlyName: 'Check',


  description: 'Check sanity.',


  inputs: {
    username  : {
      type    : 'string' 
    },
    shelve    : {
      type    : 'string' 
    },
    host      : {
      type    : 'string'
    },
    password  : {
      type    : 'string'
    },
    testlist  : {
      type    : 'string'
    },
    treeRoot  : {
      type    : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanity/check');
    sails.log(inputs);
    // All done.
    return;

  }


};
