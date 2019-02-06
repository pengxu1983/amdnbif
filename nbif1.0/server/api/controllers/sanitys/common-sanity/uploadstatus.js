module.exports = {


  friendlyName: 'Uploadstatus',


  description: 'Uploadstatus common sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    changelist : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    testname : {
      type  : 'string'
    },
    result  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/common-sanity/uploadstatus');
    sails.log(inputs);
    if(inputs.kind == 'singlevariant'){
      if(parseInt(inputs.changelist)>parseInt(singletest.lastCL)){
      }
      else{
        //ignore
      }
    }
    // All done.
    return exits.success({
      ok  : 'ok'
    });

  }


};
