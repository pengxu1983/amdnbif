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
      type    : 'string',
      columnType  : 'longtext'
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
    let SHDB  = await Sanityshelves.find({
      codeline      : inputs.codeline   ,
      branch_name   : inputs.branch_name,
      shelve        : inputs.shelve     ,
    });
    if(SHDB.length>1){
      return exits.success(JSON.stringify({
        msg : 'Please contact Benny.Peng. DB seems crashed'
      }));
    }
    if(JSON.parse(inputs.testlist).length  ==  0){
    }
    else{
      testlist  = JSON.parse(inputs.testlist);
    }
    if(SHDB.length  ==  0){
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
      return exits.success(JSON.stringify({
        msg : 'task dispatched'
      }));
    }
    if(SHDB.length  ==  1){
      if(SHDB[0].result=='PASS'){
        return exits.success(JSON.stringify({
          msg : 'your shelve already done and result is '+SHDB[0].result+'. Please run nb_chk_sanity -k option to kill it first if you\'d like to run again'
        }));
      }
      if(SHDB[0].result=='FAIL'){
        return exits.success(JSON.stringify({
          msg : 'your shelve already done and result is '+SHDB[0].result+'. Please run nb_chk_sanity -k option to kill it first if you\'d like to run again'
        }));
      }
      if(SHDB[0].result=='NOTSTARTED'){
        return exits.success(JSON.stringify({
          msg : 'your shelve already dispatched and not started yet. Please wait or kill previous task'
        }));
      }
      if(SHDB[0].result=='RUNNING'){
        return exits.success(JSON.stringify({
          msg : 'your shelve already dispatched and running. Please wait or kill previous task'
        }));
      }
      if(SHDB[0].result=='TOKILL'){
        return exits.success(JSON.stringify({
          msg : 'your shelve already is about to kill. Please do not send the same command more than once'
        }));
      }
      if(SHDB[0].result=='KILLING'){
        return exits.success(JSON.stringify({
          msg : 'your shelve already is about to kill. Please do not send the same command more than once'
        }));
      }
      if(SHDB[0].result=='KILLED'){
        await Sanityshelves.destroy({
          codeline      : inputs.codeline   ,
          branch_name   : inputs.branch_name,
          shelve        : inputs.shelve     ,
        });
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
        return exits.success(JSON.stringify({
          msg : 'your previous try already killed. Dispatching for another run'
        }));
      }
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
