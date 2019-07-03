module.exports = {


  friendlyName: 'Get',


  description: 'Get groups.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/groups/get');
    sails.log(inputs);
    if(inputs.kind  ==  'all'){
      let R = await Groups.find({
        id  : {'>=':0}
      })
      return exits.success(JSON.stringify({
        ok  : 'ok',
        groups  : JSON.stringify(R)
      }));
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));
  }


};
