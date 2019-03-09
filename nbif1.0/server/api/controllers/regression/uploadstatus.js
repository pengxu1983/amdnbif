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
    if(inputs.kind  ==  'singletest'){
      //clean up too early
      let onetestresultfrominput  = JSON.parse(inputs.onetestresult);
      let R     = await Teststatusvariant01.findOne({
        testname  : inputs.testname
      });
      sails.log(R);
      let onetestresultToStore  = {};
      onetestresultToStore[inputs.kickoffdate]={};
      //test already exists
      if(R){
        let onetestresultfromDB = R;
        let resultbyday = JSON.parse(onetestresultfromDB.resultbyday);
        //Clean up too old record
        for(let storeddate in resultbyday){
          if(moment(storeddate).add(15,'days').isBefore(inputs.kickoffdate)){
            delete resultbyday[storeddate];
          }
        }
        onetestresultToStore  = resultbyday;
        onetestresultToStore[inputs.kickoffdate]= {};
        //store new record
        onetestresultToStore[inputs.kickoffdate]['changelist']  = onetestresultfrominput['changelist'];
        onetestresultToStore[inputs.kickoffdate]['result']      = onetestresultfrominput['result']    ;
        onetestresultToStore[inputs.kickoffdate]['seed']        = onetestresultfrominput['seed']      ;
        onetestresultToStore[inputs.kickoffdate]['signature']   = onetestresultfrominput['signature'] ;
        onetestresultToStore[inputs.kickoffdate]['mode']        = onetestresultfrominput['mode']      ;
        onetestresultToStore[inputs.kickoffdate]['suite']       = onetestresultfrominput['suite']     ;
        await Teststatusvariant01.update({
          testname  : inputs.testname
        },{
          testplan  : 'NA',//TODO
          resultbyday : JSON.stringify(onetestresultToStore)
        });
      }
      //test no previous record
      else{
        onetestresultToStore[inputs.kickoffdate]['changelist']  = onetestresultfrominput['changelist'];
        onetestresultToStore[inputs.kickoffdate]['result']      = onetestresultfrominput['result']    ;
        onetestresultToStore[inputs.kickoffdate]['seed']        = onetestresultfrominput['seed']      ;
        onetestresultToStore[inputs.kickoffdate]['signature']   = onetestresultfrominput['signature'] ;
        onetestresultToStore[inputs.kickoffdate]['mode']        = onetestresultfrominput['mode']      ;
        onetestresultToStore[inputs.kickoffdate]['suite']       = onetestresultfrominput['suite']     ;
        await Teststatusvariant01.create({
          testname  : inputs.testname,
          testplan  : 'NA',//TODO
          resultbyday : JSON.stringify(onetestresultToStore)
        });
      }
      return exits.success(JSON.stringify({
        ok  : 'ok'
      }));
    }
    return exits.success(JSON.stringify({
      ok  : 'notok'
    }));
  }


};
