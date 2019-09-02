module.exports = {


  friendlyName: 'Clean',


  description: 'Clean regression.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/clean');
    sails.log(inputs);
    // All done.
    return exit.success(JSON.stringify({
      ok  : 'notok',
      msg : 'not valid kind'
    }));

  }


};
