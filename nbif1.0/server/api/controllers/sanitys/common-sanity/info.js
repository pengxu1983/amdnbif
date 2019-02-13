module.exports = {


  friendlyName: 'Info',


  description: 'Info common sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/common-sanity/info');
    sails.log(inputs);
    if(inputs.kind == 'commonsanityinfo'){
      let variants  = await Variants.find({
        id  : {'>=':0}//FIXME since variants will have sanity non-sanity tag
      });
      let common_sanity_tests = await Common_sanitys.find({
        id  : {'>=':0}
      });
      return exits.success(JSON.stringify({
        ok        : 'ok',
        variants  : variants,
        tests     : common_sanity_tests
      }));
    }
    // All done.
    //return;

  }


};
