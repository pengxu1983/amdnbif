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
    },
    results : {
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
      let singletest = await Common_sanitys.findOne({
        testname  : inputs.testname
      });
      sails.log(singletest);
      sails.log(singletest.variantname);
      sails.log(typeof(singletest.variantname));
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
    else if(inputs.kind == 'singlechangelist'){
      let results = JSON.parse(inputs.results);
      sails.log('singlechangelist');
      sails.log(results);
      //all variants
      let variants  = await Variants.find({
        id  : {'>=':0}
      });
      //all tests
      let tests = await Common_sanitys.find({
        id  : {'>=':0}
      });
      //check if current CL is brocken
      let currentChangelistStatus = 'no';
      for(let v=0;v<variants.length;v++){
        for(let t=0;t<tests.length;t++){
          if(results[variants[v].variantname][tests[t].testname] == 'FAIL'){
            currentChangelistStatus = 'yes';
          }
        }
      }
      //check last CL if broken
      let brokenCls = await Buffer_changelists.find({
        isBroken  : {'!=':'NA'}
      });
      let storedCLs = await Buffer_changelists.find({
        id  : {'>=':0}
      });
      if(brokenCls.length == 0){// no changelist broken before
        if(currentChangelistStatus == 'FAIL'){
          //send email
        }
        else if(currentChangelistStatus == 'PASS'){
          //nothing
        }
      }
      else{
        if(currentChangelistStatus == 'FAIL'){
          //find stored latest CL
          let lastCL;
          for(let s=0;s<storedCLs.length;s++){
            if(s==0){
              lastCL = storedCLs[s];
            }
            else{
              if(parseInt(storedCLs[s].changelist)>parseInt(lastCL.changelist)){
                lastCL = storedCLs[s];
              }
            }
          }
          if(lastCL.isBroken == 'FAIL'){
            //nothing since previous CL is broken and already send mail
          }
          else if(lastCL.isBroken == 'PASS'){
            //send email
          }
        }
        else if(currentChangelistStatus == 'PASS'){
          //nothing
        }
      }
      await Buffer_changelists.update({
        changelist  : inputs.changelist
      },{
        results : inputs.results,
        isBroken  : currentChangelistStatus
      });
    }
    // All done.
    return exits.success({
      ok  : 'ok'
    });

  }


};
