module.exports = {


  friendlyName: 'Upload',


  description: 'Upload changelist.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    changelists : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/changelist/upload');
    sails.log(inputs);
    if(kind ==  'singlechangelist'){
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
