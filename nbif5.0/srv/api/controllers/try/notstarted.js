module.exports = {


  friendlyName: 'Notstarted',


  description: 'Notstarted try.',


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
    groupname : {
      type  : 'string'
    },
    suite : {
      type  : 'string'
    },
    config  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.lift('/try/notstarted');
    sails.lift(inputs);
    let onecase = Regressiondetails.find({
      codeline  : inputs.codeline,
      branch_name : inputs.branch_name,
      changelist  : inputs.changelist,
      projectname : inputs.projectname,
      variantname : inputs.variantname,
      testname  : inputs.testname,
      isBAPU  : inputs.isBAPU,
      shelve  : inputs.shelve,
      //groupname : inputs.groupname,
      //suite : inputs.suite,
      //config  : inputs.config,
      //result  : 'NOTSTARTED',
      //signature : 'NA',
      //starttime :'NA',
      //endtime : 'NA',
    });
    if(onecase.length >= 1){
      await Regressiondetails.destroy({
        codeline  : inputs.codeline,
        branch_name : inputs.branch_name,
        changelist  : inputs.changelist,
        projectname : inputs.projectname,
        variantname : inputs.variantname,
        testname  : inputs.testname,
        isBAPU  : inputs.isBAPU,
        shelve  : inputs.shelve,
        groupname : inputs.groupname,
        //suite : inputs.suite,
        //config  : inputs.config,
        //result  : 'NOTSTARTED',
        //signature : 'NA',
        //starttime :'NA',
        //endtime : 'NA',
      });
      await Regressiondetails.create({
        codeline  : inputs.codeline,
        branch_name : inputs.branch_name,
        changelist  : inputs.changelist,
        projectname : inputs.projectname,
        variantname : inputs.variantname,
        testname  : inputs.testname,
        isBAPU  : inputs.isBAPU,
        shelve  : inputs.shelve,
        groupname : inputs.groupname,
        suite : inputs.suite,
        config  : inputs.config,
        result  : 'NOTSTARTED',
        signature : 'NA',
        starttime :'NA',
        endtime : 'NA',
      });
      return exits.success(JSON.stringify({
        ok  : 'notok',
        msg : 'duplicate case'
      }));
    }
    else{
      await Regressiondetails.create({
        codeline  : inputs.codeline,
        branch_name : inputs.branch_name,
        changelist  : inputs.changelist,
        projectname : inputs.projectname,
        variantname : inputs.variantname,
        testname  : inputs.testname,
        isBAPU  : inputs.isBAPU,
        shelve  : inputs.shelve,
        groupname : inputs.groupname,
        suite : inputs.suite,
        config  : inputs.config,
        result  : 'NOTSTARTED',
        signature : 'NA',
        starttime :'NA',
        endtime : 'NA',
      });
      return exits.success(JSON.stringify({
        ok  : 'ok',
      }));
    }

    // All done.
    return;

  }


};
