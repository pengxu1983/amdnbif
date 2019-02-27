module.exports = {


  friendlyName: 'Uploadstatus',


  description: 'Uploadstatus dcelab.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    changelist : {
      type  : 'string'
    },
    results : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/dcelab/uploadstatus');
    sails.log(inputs);
    if(inputs.kind == 'dcelabuploadstatus'){
      await Buffer_changelists.update({
        changelist  : inputs.changelist
      },{
        dcelab  : inputs.results
      });
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
