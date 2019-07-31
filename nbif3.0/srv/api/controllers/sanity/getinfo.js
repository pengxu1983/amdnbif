module.exports = {


  friendlyName: 'Getinfo',


  description: 'Getinfo sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    },
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanity/getinfo');
    sails.log(inputs);
    // get trees
    // get variants
    // get projects
    // start sync
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'not valid kind'
    }));

  }


};
