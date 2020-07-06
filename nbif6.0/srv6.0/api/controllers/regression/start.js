module.exports = {


  friendlyName: 'Start',


  description: 'Start regression.',


  inputs: {
    codeline    : {
      type          : 'string'
    },
    branch_name : {
      type          : 'string'
    },
    changelist  : {
      type          : 'string'
    },
    shelve      : {
      type          : 'string'
    },
    projectname : {
      type          : 'string'
    },
    variantname : {
      type          : 'string'
    },
    describe    : {
      type          : 'string'
    },
    isOfficial  : {
      type          : 'string'
    },
    isBAPU      : {
      type          : 'string'
    },
    treeRoot    : {
      type          : 'string'
    },
    out_home    : {
      type          : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/start');
    sails.log(inputs.casename);
    await  Regressiondetails.create({
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
      group       : inputs.group,
      suite       : inputs.suite,
      kickoffdate : inputs.kickoffdate,
      describe    : inputs.describe,
      username    : inputs.benpeng,
      result      : 'NOTSTARTED',
      projectname : inputs.projectname
    });
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
