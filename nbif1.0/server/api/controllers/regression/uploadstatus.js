var moment        = require('moment');
module.exports = {


  friendlyName: 'Uploadstatus',


  description: 'Uploadstatus regression.',


  inputs: {
    kind  : {
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
    for(let v=0;v<variants.length;v++){//TODO suite?
      if(inputs.kind == variants[v].variantname){
        let DB = Teststatusvariant01;
        let results   = JSON.parse(inputs.results);
        let resultsInDBAllTest = await Regressionresults.find({
          id  : {'>=':0}
        });
        
        if(resultsInDBAllTest.length == 0){
          let R = {};
          R[inputs.kickoffdate]={};
          //store directly
          for(let testname in results){
            R[inputs.kickoffdate]['changelist']   = results[testname]['changelist'] ;
            R[inputs.kickoffdate]['result']       = results[testname]['result']     ;
            R[inputs.kickoffdate]['seed']         = results[testname]['seed']       ;
            R[inputs.kickoffdate]['signature']    = results[testname]['signature']  ;
            R[inputs.kickoffdate]['mode']         = results[testname]['mode']       ;
            R[inputs.kickoffdate]['suite']        = results[testname]['suite']      ;
            //TODO get testplan belonging
            await DB.create({
              testname  : testname,
              testplan  : 'NA',//TODO
              resultbyday : JSON.stringify(R)
            });
            return exists.success(JSON.stringify({
              ok  : 'ok'
            }));
          }
        }
        else{
          //clear too old
          //reserve previous
          let resultToStore = resultsInDBAllTest;
          for(let r=0;r<resultToStore.length;r++){
            //per test
            let onetestresult = JSON.parse(resultToStore[r]);
            for(let date in onetestresult){
              if(moment(date).add(15,'days').isBefore(inputs.kickoffdate)){
                delete onetestresult[date];
                resultToStore[r]  = onetestresult;
              }
            }
            //store new
            for(let onetest in results){//onetest means testname
              resultToStore[inputs.kickoffdate]={}
              resultToStore[inputs.kickoffdate]['changelist'] = results[testname]['changelist'] ;
              resultToStore[inputs.kickoffdate]['result']     = results[testname]['result']     ;
              resultToStore[inputs.kickoffdate]['seed']       = results[testname]['seed']       ;
              resultToStore[inputs.kickoffdate]['signature']  = results[testname]['signature']  ;
              resultToStore[inputs.kickoffdate]['mode']       = results[testname]['mode']       ;
              resultToStore[inputs.kickoffdate]['suite']      = results[testname]['suite']      ;
              let R = await DB.findOne({
                testname  : onetest
              });
              if(R){
                await DB.update({
                  testname  : onetest
                },{
                  resultbyday : JSON.stringify(resultToStore)
                });
              }
            }
          }
          

        }
      }
    }
    // All done.

  }


};
