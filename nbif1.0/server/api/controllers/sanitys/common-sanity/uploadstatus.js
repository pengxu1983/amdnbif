module.exports = {


  friendlyName: 'Uploadstatus',


  description: 'Uploadstatus common sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    changelist : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    testname : {
      type  : 'string'
    },
    result  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/common-sanity/uploadstatus');
    sails.log(inputs);
    if(inputs.kind == 'singletest'){
      sails.log('DBG1');
      let singletest = await Common_sanitys.find({
        testname  : inputs.testname
      });
      sails.log(singletest.variantname);
      sails.log(typeOf(singletest.variantname));
      if(singletest.lastCL=='NA'){// db is empty
      sails.log('DBG2');
        if(inputs.result == 'PASS'){
          await Common_sanitys.update({
            testname  : inputs.testname
          },{
            lastCL    : inputs.changelist,
            lastpassCL: inputs.changelist,
            brokenCL  : 'NA',
            variantname : JSON.stringify([])
          });
        }
        else if (inputs.result=='FAIL'){
          await Common_sanitys.update({
            testname  : inputs.testname
          },{
            lastCL    : inputs.changelist,
            lastpassCL: 'NA',
            brokenCL  : inputs.changelist,
            variantname : JSON.stringify([inputs.variantname])
          });
        }
      }
      else if(parseInt(inputs.changelist)>parseInt(singletest.lastCL)){// incomming CL is newer
      sails.log('DBG3');
        if(inputs.result == 'PASS'){//incoming is pass
          // if newer is pass just override
          await Common_sanitys.update({
            testname    : inputs.testname,
          },{
            lastCL      : inputs.changelist,
            lastpassCL  : inputs.changelist,
            brokenCL    : 'NA',
            variantname : JSON.stringify([])
          });
        }
        else if(inputs.result == 'FAIL'){//incomming is fail
          if(singletest.brokenCL == 'NA'){//previous is pass
            await Common_sanitys.update({
              testname    : inputs.testname
            },{
              lastCL      : inputs.changelist,
              brokenCL    : inputs.changelist,
              variantname : JSON.stringify([inputs.variantname])
            });
          }
        }
        else{//previous is fail
          await Common_sanitys.update({
            testname    : inputs.testname
          },{
            lastCL      : inputs.changelist,
          });
        }
      }
      else if(parseInt(inputs.changelist)==parseInt(singletest.lastCL)){ //incomming CL is same
      sails.log('DBG4');
        if(inputs.result == 'PASS'){//incomming is pass
          //nothing to 
        }
        else if(inputs.result == 'FAIL'){//incomming is fail
          if(singletest.brokenCL == 'NA'){//previous is pass
            let tmp = JSON.parse(singletest.variantname);
            tmp.push(inputs.variantname);
            await Common_sanitys.update({
              testname  : inputs.testname
            },{
              variantname : JSON.stringify(tmp)
            });
          }
        }
      }
      else{
        //ignore
      }
    }
    // All done.
    return exits.success({
      ok  : 'ok'
    });

  }


};
