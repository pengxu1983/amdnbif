var moment = require('moment');
module.exports = {


  friendlyName: 'Onecasestart',


  description: 'Onecasestart try.',


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
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/try/onecasestart');
    sails.log(inputs);
    let starttime = moment().format('YYYYMMDDHHmmss');
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
        result: 'RUNNING',
        seed  : inputs.seed,
        starttime : starttime
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
        result: 'RUNNING',
        seed  : inputs.seed,
        starttime : starttime
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
        result: 'RUNNING',
        seed  : inputs.seed,
        starttime : starttime
      });
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
