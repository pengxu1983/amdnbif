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
    },
    tree    : {
      type  : 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/dcelab/uploadstatus');
    sails.log(inputs);
    if(inputs.tree == 'MAIN'){
      if(inputs.kind == 'dcelabuploadstatus'){
        await Buffer_changelists.update({
          changelist  : inputs.changelist
        },{
          dcelab  : inputs.results
        });
        return exits.success(JSON.stringify({
          ok  : 'ok'
        }));
      }
    }
    if(inputs.tree == 'NV21'){
      if(inputs.kind == 'dcelabuploadstatus'){
        await Buffer_changelists_01.update({
          changelist  : inputs.changelist
        },{
          dcelab  : inputs.results
        });
        return exits.success(JSON.stringify({
          ok  : 'ok'
        }));
      }
    }
  }


};
