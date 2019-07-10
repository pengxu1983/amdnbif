module.exports = {


  friendlyName: 'Getvalidvariants',


  description: 'Getvalidvariants metrics.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/metrics/getvalidvariants');
    sails.log(inputs);
    if(inputs.kind  ==  'Bygrp'){
      let R = await Projects.findOne({
        projectname : inputs.projectname
      });
      if(R){
        return exits.success(JSON.stringify({
          ok  : 'ok',
          validvariants : R.validvariants
        }));
      }
      else{
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'not valid proj'
        }));
      }
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'not valid kind'
    }));

  }


};
