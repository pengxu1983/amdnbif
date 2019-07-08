module.exports = {


  friendlyName: 'Upload',


  description: 'Upload users.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    username  : {
      type  : 'string'
    },
    realname  : {
      type  : 'string'
    },
    email     : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/users/upload');
    sails.log(inputs);
    if(inputs.kind =='all'){
      let R = await Users.findOne({
        username  : inputs.username
      });
      if(R){
        await Users.update({
          username  : inputs.username
        },{
          realname  : inputs.realname,
          email     : inputs.email
        });
      }
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
