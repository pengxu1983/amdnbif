module.exports = {


  friendlyName: 'Updatechangelist',


  description: 'Updatechangelist sanity.',


  inputs: {
    result    : {
      type    : 'string'
    },
    resultlocation  : {
      type    : 'string'
    },
    codeline  : {
      type    : 'string'
    },
    branch_name : {
      type    : 'string'
    },
    changelist  : {
      type    : 'string'
    },
    details     : {
      type    : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanity/updatechangelist');
    sails.log(inputs);
    await Sanitychangelists.update({
      codeline    : inputs.codeline,
      branch_name : inputs.branch_name,
      changelist  : inputs.changelist
    },{
      resultlocation  : inputs.resultlocation,
      result          : inputs.result,
      details         : inputs.details
    });
    // All done.
    return  exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
