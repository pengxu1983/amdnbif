module.exports = {


  friendlyName: 'Upload',


  description: 'Upload config.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    users : {
      type  : 'ref'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/upload');
    sails.log(inputs);
    if(inputs.kind  ==  'usersupload'){
      await Users.destroy({
        id: {'>=':0}
      });
      await Users.createEach(users);
      return exits.success({ok:'ok'});
    }
    // All done.
    //return exits.success({});

  }


};
