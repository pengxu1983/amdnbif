module.exports = {


  friendlyName: 'Get',


  description: 'Get groups.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    isBAPU      : {
      type  : 'string'
    },
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/groups/get');
    sails.log(inputs);
    if(inputs.kind  ==  'Bygrp'){
      let R = await Groups.find({
        //id  : {'>=':0}
        projectname : inputs.projectname,
        variantname : inputs.variantname,
        isBAPU      : inputs.isBAPU
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
