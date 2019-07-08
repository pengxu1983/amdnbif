module.exports = {


  friendlyName: 'Get',


  description: 'Get users.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    query : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/users/get');
    sails.log(inputs);
    if(inputs.kind  ==  'all'){
      let R = await Users.find({
        id  : {'>=':0}
      });
      let users=[];
      for(let r=0;r<R.length;r++){
        users.push({
          username  : R[r].username,
          realname  : R[r].realname,
          email     : R[r].email
        });
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        users : JSON.stringify(users)
      }));
    }
    else(inputs.kind  ==  'search'){
      let R = await Users.find({
        realname  : {
          'contains': inputs.query
        }
      });
      let users = [];
      for(let r=0;r<R.length;r++){
        users.push({
          username  : R[r].username,
          realname  : R[r].realname,
          email     : R[r].email
        });
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        users : JSON.stringify(users)
      }));
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
