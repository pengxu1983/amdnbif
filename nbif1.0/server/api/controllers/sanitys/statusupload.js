module.exports = {


  friendlyName: 'Statusupload',


  description: 'Statusupload sanitys.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    passlist :{
      type  : 'ref'
    },
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    changelist  : {
      type  : 'string'
    },
    testname  : {
      type  : 'string'
    },
    result  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/statusupload');
    sails.log(inputs);
    if(inputs.kind  =='singletest'){
      if(inputs.testname == ''){
        return exits.success({
          ok  : 'notok',
          msg : 'no testname inputs'
        });
      }
      else{
        var oneTest = await Sanity_tests.findOne({
          variantname : inputs.variantname,
          testname    : inputs.testname
        });
        if(oneTest){
          //older cl not broken
          if(oneTest.brokenCL == 'NA'){
            if(parseInt(inputs.changelist) > parseInt(oneTest.lastpassCL)){//inputs result is newer than db
              sails.log('processing '+inputs.changelist);
              if(inputs.result == 'PASS'){//inputs result is pass
                await Sanity_tests.update({
                  variantname : inputs.variantname,
                  testname    : inputs.testname
                },{
                  lastpassCL  : inputs.changelist,
                  brokenCL    : 'NA',
                  lastCL      : inputs.changelist
                });
              }
              else if(inputs.result == 'FAIL'){//inputs result is fail
                await Sanity_tests.update({
                  variantname : inputs.variantname,
                  testname    : inputs.testname
                },{
                  brokenCL    : inputs.changelist,
                  lastCL      : inputs.changelist
                });
              }
            }
            else{//inputs result is older then db
              //ingore
            }
          }
          //older cl broken
          else{
            if(parseInt(inputs.changelist) > parseInt(oneTest.lastpassCL)){//inputs result is newer than db
              if(inputs.result  ==  'PASS'){//inputs result is pass
                await Sanity_tests.update({
                  variantname : inputs.variantname,
                  testname    : inputs.testname
                },{
                  brokenCL    : 'NA',
                  lastpassCL  : inputs.changelist,
                  lastCL      : inputs.changelist
                });
              }
              else if(inputs.result == 'FAIL'){//inputs result is fail
                await Sanity_tests.update({
                  variantname : inputs.variantname,
                  testname    : inputs.testname
                },{
                  lastCL      : inputs.changelist
                });
              }
            }
            else{//inputs result is older then db
            }
          }
        }
        else{
          //No test found return error
          return exits.success({
            ok  : 'notok',
            msg : 'no such test found as '+inputs.testname
          });
        }
      }
    }
    //var sanity_tests = await Sanity_tests.find({
    //  projectname : inputs.projectname,
    //  variantname : inputs.variantname
    //});
    //for(var i=0;i<sanity_tests.length;i++){
    //  if(inputs.passlist.indexOf(sanity_tests[i].testname) == -1){
    //    //not pass
    //    await Sanity_tests.update({
    //      testname    : sanity_tests[i].testname,
    //      projectname : inputs.projectname,
    //      variantname : inputs.variantname
    //    },{
    //      lastCL      : inputs.changelist
    //    });
    //  }
    //  else{
    //    //pass
    //    await Sanity_tests.update({
    //      testname    : sanity_tests[i].testname,
    //      projectname : inputs.projectname,
    //      variantname : inputs.variantname
    //    },{
    //      lastCL      : inputs.changelist,
    //      lastpassCL  : inputs.changelist
    //    });
    //  }
    //}
    // All done.
    return exits.success({
      ok  : 'ok'
    });

  }


};
