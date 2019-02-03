module.exports = {


  friendlyName: 'Process',


  description: 'Process common sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    },
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/common-sanity/process');
    sails.log(inputs);
    if(inputs.kind  ==  'start'){

    }
    // All done.
    return;

  }


};
