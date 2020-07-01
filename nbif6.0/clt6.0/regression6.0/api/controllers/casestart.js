module.exports = {


  friendlyName: 'Casestart',


  description: 'Casestart something.',


  inputs: {
    codeline    : {
      type      : 'string'
    },
    branch_name   : {
      type      : 'string'
    },
    changelist    : {
      type      : 'string'
    },
    shelve    : {
      type      : 'string'
    },
    kickoffdate   : {
      type      : 'string'
    },
    variantname   : {
      type      : 'string'
    },
    describe    : {
      type      : 'string'
    },
    username    : {
      type      : 'string'
    },
    projectname   : {
      type      : 'string'
    },
    isOfficial    : {
      type      : 'string'
    },
    isBAPU    : {
      type      : 'string'
    },
    casename    : {
      type      : 'string'
    },
    seed        : {
      type      : 'string'
    },
    config      : {
      type      : 'string'
    },
    suite       : {
      type      : 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/casestart');
    sails.log(inputs);
    await Regressiondetails.update({
      codeline    : inputs.codeline,
      branch_name : inputs.branch_name,
      changelist  : inputs.changelist,
      shelve      : inputs.shelve,
      variantname : inputs.variantname,
      casename    : inputs.casename,
      isBAPU      : inputs.isBAPU,
      isOfficial  : inputs.isOfficial,
      seed        : inputs.seed,
      config      : inputs.config,
      suite       : inputs.suite,
      kickoffdate : inputs.kickoffdate,
      describe    : inputs.describe,
      username    : inputs.username,
      projectname : inputs.projectname
    },{
      result      : 'RUNNING'
    });
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
