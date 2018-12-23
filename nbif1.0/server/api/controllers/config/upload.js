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
      for(var i=0;i<inputs.users.length;i++){
        if(inputs.users[i].realname == ''){
          //Do nothing
        }
        else {
          await Users.create({
            realname  : inputs.users[i].realname,
            email     : inputs.users[i].email
          });
        }
      }
      return exits.success({ok:'ok'});
    }
    // All done.
    //return exits.success({});

  }


};
