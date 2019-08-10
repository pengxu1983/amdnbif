module.exports = {


  friendlyName: 'Get',


  description: 'Get sanity.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanity/get');

    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
