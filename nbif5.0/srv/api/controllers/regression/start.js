module.exports = {


  friendlyName: 'Start',


  description: 'Start regression.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/start');
    sails.log(inputs);
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok',
      msg : 'ok'
    }));

  }


};
