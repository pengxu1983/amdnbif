module.exports = {


  friendlyName: 'Uploadchangelist',


  description: 'Uploadchangelist sanity.',


  inputs: {
    codeline    : {
      type      : 'string'
    },
    branch_name : {
      type      : 'string'
    },
    changelist  : {
      type      : 'string'
    },
    username    : {
      type      : 'string'
    },
    submitdate  : {
      type      : 'string'
    },
    mask        : {
      type      : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('sanity/uploadchangelist');
    sails.log(inputs);
    let CLDB  = await Sanitychangelists.find({
      codeline    : inputs.codeline,
      branch_name : inputs.branch_name,
      changelist  : inputs.changelist
    });
    if(CLDB.length  ==  0){
      await Sanitychangelists.create({
        codeline    : inputs.codeline,
        branch_name : inputs.branch_name,
        changelist  : inputs.changelist,
        submitdate  : inputs.submitdate,
        result      : 'NOTSTARTED',
        mask        : 'NA',//TODO
        username    : inputs.username,
        details     : 'NA',
        testlist    : 'NA',
        resultlocation:'NA',
      });
      return  exits.success(JSON.stringify({
        ok  : 'ok',
        msg : 'new changelist'
      }));
    }
    // All done.
    return  exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
