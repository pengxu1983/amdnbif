module.exports = {


  friendlyName: 'Check',


  description: 'Check sanity.',


  inputs: {
    username  : {
      type    : 'string' 
    },
    shelve    : {
      type    : 'string' 
    },
    hostname  : {
      type    : 'string'
    },
    password  : {
      type    : 'string'
    },
    testlist  : {
      type    : 'string'
    },
    treeRoot  : {
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
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanity/check');
    sails.log(inputs);
    let testlist  = ['demo_test_0','demo_test_1','demo_test_2'];
    await Sanityshelves.destroy({
      codeline      : inputs.codeline   ,
      branch_name   : inputs.branch_name,
      shelve        : inputs.shelve     ,
      username      : inputs.username   ,
      hostname      : inputs.hostname   ,
      treeRoot      : inputs.treeRoot   ,
    });
    if(JSON.parse(inputs.testlist).length  ==  0){
    }
    else{
      testlist  = JSON.parse(inputs.testlist);
    }
    await Sanityshelves.create({
      codeline      : inputs.codeline   ,
      branch_name   : inputs.branch_name,
      shelve        : inputs.shelve     ,
      username      : inputs.username   ,
      hostname      : inputs.hostname   ,
      changelist    : inputs.changelist ,
      treeRoot      : inputs.treeRoot   ,
      result        : 'NOTSTARTED',
      resultlocation: 'NA',
      details       : 'NA',
      testlist      : JSON.stringify(testlist)
    });
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
