module.exports = {


  friendlyName: 'Clientrun',


  description: 'Clientrun something.',


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
    },
    describe  : {
      type    : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/clientrun');
    sails.log(inputs);
    let testlist  = ['demo_test_0','demo_test_1','demo_test_2'];
    let SHDB  = await Sanitysummary.find({
      codeline      : inputs.codeline   ,
      branch_name   : inputs.branch_name,
      shelve        : inputs.shelve     ,
      changelist    : inputs.changelist ,
      describe      : inputs.describe
    });
    
    if(JSON.parse(inputs.testlist).length  ==  0){
    }
    else{
      testlist  = JSON.parse(inputs.testlist);
    }
    if(SHDB.length>1){
      return exits.success(JSON.stringify({
        msg : 'Please contact Benny.Peng@amd.com. DB seems crashed'
      }));
    }
    else if(SHDB.length==1){
      return exits.success(JSON.stringify({
        msg : 'same sanity check task already exists, if you would like to kickoff a new sanity with same shelveID, Please use -d "Your description" as additional option'
      }));
    }
    else{
      await Sanitysummary.create({
        codeline      : inputs.codeline   ,
        branch_name   : inputs.branch_name,
        shelve        : inputs.shelve     ,
        username      : inputs.username   ,
        changelist    : inputs.changelist ,
        treeRoot      : inputs.treeRoot   ,
        result        : 'NOTSTARTED',
        resultlocation: 'NA',
        details       : 'NA',
        testlist      : JSON.stringify(testlist),
        describe      : inputs.describe,
        checktype     : 'shelvecheck'
      });
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok',
      msg : 'task dispatched'
    }));

  }


};
