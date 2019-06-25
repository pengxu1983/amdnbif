module.exports = {


  friendlyName: 'Summary',


  description: 'Summary regression.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/summary');
    // All done.
    return;

  }


};
