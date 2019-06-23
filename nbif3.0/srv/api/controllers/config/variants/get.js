module.exports = {


  friendlyName: 'Get',


  description: 'Get variants.',


  inputs: {
    kind  : {
      type  : 'string'
    },
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    //sails.log('/config/variants/get');
    //sails.log(inputs);
    if(inputs.kind  ==  'all'){
      let variants = await Variants.find({
        id  : {'>=':0}
      });
      return exits.success(JSON.stringify({
        ok  : 'ok',
        variants  : JSON.stringify(variants)
      }));
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
