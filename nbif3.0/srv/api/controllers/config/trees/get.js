module.exports = {


  friendlyName: 'Get',


  description: 'Get trees.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/trees/get');
    sails.log(inputs);
    if(inputs.kind  ==  'all'){
      let trees = await Trees.find({
        id  : {'>=':0}
      });
      return exits.success(JSON.stringify({
        ok  : 'ok',
        trees : JSON.stringify(trees)
      }));
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
