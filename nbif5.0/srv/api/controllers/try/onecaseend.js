module.exports = {


  friendlyName: 'Onecaseend',


  description: 'Onecaseend try.',


  inputs: {
    testname  : {
      type  : 'string'
    },
    codeline  : {
      type  : 'string'
    },
    branch_name : {
      type  : 'string'
    },
    changelist  : {
      type  : 'string'
    },
    projectname   : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    shelve  : {
      type  : 'string'
    },
    isBAPU  : {
      type  : 'string'
    },
    seed  :{
      type  : 'string'
    },
    kickoffdate : {
      type  : 'string'
    },
    result  : {
      type  : 'string'
    },
    signature : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/try/onecaseend');
    sails.log(inputs);
    let onecaseDB = await Regressiondetails.find({
      testname    : inputs.testname,
      projectname:  inputs.projectname,
      variantname:  inputs.variantname,
      kickoffdate:  inputs.kickoffdate,
      codeline: inputs.codeline,
      branch_name:  inputs.branch_name,
      changelist: inputs.changelist,
      isBAPU: inputs.isBAPU,
      shelve: inputs.shelve
    });
    if(onecaseDB.length >1){
      await Regressiondetails.destroy({
        testname    : inputs.testname,
        projectname:  inputs.projectname,
        variantname:  inputs.variantname,
        kickoffdate:  inputs.kickoffdate,
        codeline: inputs.codeline,
        branch_name:  inputs.branch_name,
        changelist: inputs.changelist,
        isBAPU: inputs.isBAPU,
        shelve: inputs.shelve,
      });
      await Regressiondetails.create({
        testname    : inputs.testname,
        projectname:  inputs.projectname,
        variantname:  inputs.variantname,
        kickoffdate:  inputs.kickoffdate,
        codeline: inputs.codeline,
        branch_name:  inputs.branch_name,
        changelist: inputs.changelist,
        isBAPU: inputs.isBAPU,
        shelve: inputs.shelve,
        result: inputs.result,
        seed  : inputs.seed,
        signature : inputs.signature
      });
      return exits.success(JSON.stringify({
        ok  : 'notok',
        msg : 'duplicate case status found'
      }));
    }
    if(onecaseDB.length ==  0){
      await Regressiondetails.create({
        testname    : inputs.testname,
        projectname:  inputs.projectname,
        variantname:  inputs.variantname,
        kickoffdate:  inputs.kickoffdate,
        codeline: inputs.codeline,
        branch_name:  inputs.branch_name,
        changelist: inputs.changelist,
        isBAPU: inputs.isBAPU,
        shelve: inputs.shelve,
        result: inputs.result,
        seed  : inputs.seed,
        signature : inputs.signature
      });
      return exits.success(JSON.stringify({
        ok  : 'notok',
        msg : 'no case created'
      }));
    }
    if(onecaseDB.length ==  1){
      await Regressiondetails.update({
        testname    : inputs.testname,
        projectname:  inputs.projectname,
        variantname:  inputs.variantname,
        kickoffdate:  inputs.kickoffdate,
        codeline: inputs.codeline,
        branch_name:  inputs.branch_name,
        changelist: inputs.changelist,
        isBAPU: inputs.isBAPU,
        shelve: inputs.shelve,
      },{
        result: inputs.result,
        signature : inputs.signature
      });
    }
    // All done.
    return;

  }


};
