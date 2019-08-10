module.exports = {


  friendlyName: 'Get',


  description: 'Get agents.',


  inputs: {
    kind  : {
      type  : 'string'
    },
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/agents/get');
    sails.log(inputs);
    if(inputs.kind  ==  'all'){
      let R = await Agents.find({
        id  : {'>=':0}
      });
      return exits.success(JSON.stringify({
        ok  : 'ok',
        agents  : JSON.stringify(R)
      }));
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
