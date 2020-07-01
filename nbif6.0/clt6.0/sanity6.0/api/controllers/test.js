module.exports = {


  friendlyName: 'Test',


  description: 'Test something.',


  inputs: {
    msg : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    sails.log('/test');
    sails.log(inputs);
    // All done.
    return;

  }


};
