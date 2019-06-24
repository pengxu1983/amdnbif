module.exports = {


  friendlyName: 'Upload',


  description: 'Upload variants.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    variants  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/variants/upload');
    sails.log(inputs);
    if(inputs.kind == 'all'){
      await Variants.destroy({
        id  : {'>=':0}
      });
      let variants = [];
      variants = JSON.parse(inputs.variants);
      sails.log(variants);
      if(variants.length == 0){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'no valid variant'
        }));
      }
      else{
        for(let v=0;v<variants.length;v++){
          if(variants[v].variantname  == ''){
            //ignore
          }
          else{
            await Variants.create(variants[v]);
          }
        }
        return exits.success(JSON.stringify({
          ok  : 'ok',
          msg : 'all variants uploaded'
        }));
      }
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
