let moment =require('moment');
module.exports = {


  friendlyName: 'Getdvgroupprstatus',


  description: 'Getdvgroupprstatus metrics.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    DVgroup : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/metrics/getdvgroupprstatus');
    sails.log(inputs);
    if(inputs.kind == 'Bygrp'){
      //get feature groups
      let groups  = await Groups.find({
        projectname : inputs.projectname,
        DVgroup     : inputs.DVgroup
      });
      if(groups.length == 0){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'no group found'
        }));
      }
      else{
      }
      //get tree weeks' status
      ////
      //get targets
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'not valid kind'
    }));

  }


};
