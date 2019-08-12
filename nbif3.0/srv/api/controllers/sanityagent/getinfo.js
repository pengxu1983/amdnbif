module.exports = {


  friendlyName: 'Getinfo',


  description: 'Getinfo sanityagent.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    branchname  : {
      type  : 'string'
    },

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanityagent/getinfo');
    sails.log(inputs);
    if(inputs.kind  =='sanityinfo'){
      let R;
      //variants
      let variants = await Variants.find({
        isSanity  : 'yes',
        isValid   : 'yes'
      });
      //projects
      let projects = await Projects.find({
        isValid   : 'yes'
      });
      return exits.success(JSON.stringify({
        ok  : 'ok',
        variants  : JSON.stringify(variants),
        projects  : JSON.stringify(projects),
      }));
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
