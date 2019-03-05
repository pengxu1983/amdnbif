var moment        = require('moment');
module.exports = {


  friendlyName: 'Uploadstatus',


  description: 'Uploadstatus regression.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    testname  : {
      type  : 'string'
    },
    onetestresult : {
      type  : 'string'
    },
    results : {
      type  : 'string'
    },
    kickoffdate : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/uploadstatus');
    sails.log(inputs);
    let variants = await Variants.find({
      id  : {'>=':0}
    });
    let DB;
    if(inputs.kind  ==  'singletest'){
      //clean up too early
      if(inputs.variantname ==  'nbif_all_rtl'){
        DB =  Teststatusvariant01;
      }
      let onetestresultfrominput  = JSON.parse(onetestresult);
      let R     = await DB.findOne({
        testname  : inputs.testname
      });
      let onetestresultToStore  = {};
      onetestresultToStore[inputs.kickoffdate]={};
      //test already exists
      if(R){
        let onetestresultfromDB = JSON.parse(R);
        let resultbyday = JSON.parse(onetestresultfromDB.resultbyday);
        //Clean up too old record
        for(let storeddate in resultbyday){
          if(moment(storeddate).add(15,'days').isBefore(inputs.kickoffdate)){
            delete resultbyday[storeddate];
          }
        }
        onetestresultToStore[inputs.kickoffdate]= resultbyday;
        //store new record
        onetestresultToStore[inputs.kickoffdate]['changelist']  = onetestresultfrominput[inputs.testname]['changelist'];
        onetestresultToStore[inputs.kickoffdate]['result']      = onetestresultfrominput[inputs.testname]['result']    ;
        onetestresultToStore[inputs.kickoffdate]['seed']        = onetestresultfrominput[inputs.testname]['seed']      ;
        onetestresultToStore[inputs.kickoffdate]['signature']   = onetestresultfrominput[inputs.testname]['signature'] ;
        onetestresultToStore[inputs.kickoffdate]['mode']        = onetestresultfrominput[inputs.testname]['mode']      ;
        onetestresultToStore[inputs.kickoffdate]['suite']       = onetestresultfrominput[inputs.testname]['suite']     ;
        await DB.update({
          testname  : inputs.testname
        },{
          testplan  : 'NA',//TODO
          resultbyday : JSON.stringify(onetestresultToStore)
        });
      }
      //test no previous record
      else{
        onetestresultToStore[inputs.kickoffdate]['changelist']  = onetestresultfrominput[inputs.testname]['changelist'];
        onetestresultToStore[inputs.kickoffdate]['result']      = onetestresultfrominput[inputs.testname]['result']    ;
        onetestresultToStore[inputs.kickoffdate]['seed']        = onetestresultfrominput[inputs.testname]['seed']      ;
        onetestresultToStore[inputs.kickoffdate]['signature']   = onetestresultfrominput[inputs.testname]['signature'] ;
        onetestresultToStore[inputs.kickoffdate]['mode']        = onetestresultfrominput[inputs.testname]['mode']      ;
        onetestresultToStore[inputs.kickoffdate]['suite']       = onetestresultfrominput[inputs.testname]['suite']     ;
        await DB.create({
          testname  : inputs.testname,
          testplan  : 'NA',//TODO
          resultbyday : JSON.stringify(onetestresultToStore)
        });
      }

    }
    //for(let v=0;v<variants.length;v++){//TODO suite?
    //  if(inputs.variantname == variants[v].variantname){
    //    let DB = Teststatusvariant01;
    //    let results   = JSON.parse(inputs.results);
    //    let resultsInDBAllTest = await Regressionresults.find({
    //      id  : {'>=':0}
    //    });
    //    
    //    if(resultsInDBAllTest.length == 0){
    //      let R = {};
    //      R[inputs.kickoffdate]={};
    //      //store directly
    //      for(let testname in results){
    //        R[inputs.kickoffdate]['changelist']   = results[testname]['changelist'] ;
    //        R[inputs.kickoffdate]['result']       = results[testname]['result']     ;
    //        R[inputs.kickoffdate]['seed']         = results[testname]['seed']       ;
    //        R[inputs.kickoffdate]['signature']    = results[testname]['signature']  ;
    //        R[inputs.kickoffdate]['mode']         = results[testname]['mode']       ;
    //        R[inputs.kickoffdate]['suite']        = results[testname]['suite']      ;
    //        //TODO get testplan belonging
    //        await DB.create({
    //          testname  : testname,
    //          testplan  : 'NA',//TODO
    //          resultbyday : JSON.stringify(R)
    //        });
    //        return exists.success(JSON.stringify({
    //          ok  : 'ok'
    //        }));
    //      }
    //    }
    //    else{
    //      //clear too old
    //      //reserve previous
    //      let resultToStore = resultsInDBAllTest;
    //      for(let r=0;r<resultToStore.length;r++){
    //        //per test
    //        let onetestresult = JSON.parse(resultToStore[r]);
    //        for(let date in onetestresult){
    //          if(moment(date).add(15,'days').isBefore(inputs.kickoffdate)){
    //            delete onetestresult[date];
    //            resultToStore[r]  = onetestresult;
    //          }
    //        }
    //        //store new
    //        for(let testname in results){
    //          onetestresult[inputs.kickoffdate]={}
    //          onetestresult[inputs.kickoffdate]['changelist'] = results[testname]['changelist'] ;
    //          onetestresult[inputs.kickoffdate]['result']     = results[testname]['result']     ;
    //          onetestresult[inputs.kickoffdate]['seed']       = results[testname]['seed']       ;
    //          onetestresult[inputs.kickoffdate]['signature']  = results[testname]['signature']  ;
    //          onetestresult[inputs.kickoffdate]['mode']       = results[testname]['mode']       ;
    //          onetestresult[inputs.kickoffdate]['suite']      = results[testname]['suite']      ;
    //          let R = await DB.findOne({
    //            testname  : testname
    //          });
    //          if(R){
    //            await DB.update({
    //              testname  : testname
    //            },{
    //              resultbyday : JSON.stringify(onetestresult)
    //            });
    //          }
    //          else{
    //            await DB.create({
    //              testname  : testname,
    //              testplan  : 'NA',
    //              resultbyday : JSON.stringify(onetestresult)
    //            });
    //          }
    //        }
    //      }
    //      return exists.success(JSON.stringify({
    //        ok  : 'ok'
    //      }));
    //    }
    //  }
    //}
    return exists.success(JSON.stringify({
      ok  : 'notok'
    }));
    // All done.

  }


};
