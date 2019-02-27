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
    if(inputs.kind  =='nbif.main.normal'){
      sails.log('nbif.main.normal');
      sails.log(JSON.parse(inputs.results));
      let results = JSON.parse(inputs.results);
      let resultsInDB = await Regressionresults.find({
        id  : {'>=':0}
      });
      // if DB is empty that date, Just create all
      if(resultsInDB.length == 0){
        for(let testname in results){
          let R =[];
          let RR = {};
          RR[inputs.kickoffdate]  = results[testname];
          await Regressionresults.create({
            testname  : testname,
            result    : JSON.stringify(RR)
          });
        }
        return exits.success(JSON.stringify({
          ok  : 'ok',
          msg : 'DB is empty and created all'
        }));
      }
      else{
        //////////////////////////////////////
        //add one day template to all tests
        //delete days too early out of all tests
        //////////////////////////////////////
        for(let r=0;r<resultsInDB.length;r++){
          //per test resultsInDB[r].testname is the test name

          let oneTestResultToStore = JSON.parse(resultsInDB[r].result);
          sails.log('aaa');
          sails.log(oneTestResultToStore);
          for(let recorddate in oneTestResultToStore){
            sails.log(moment(recorddate).add(15,'days'));
            if(moment(recorddate).add(15,'days').isBefore(moment(inputs.kickoffdate).format('YYYY-MM-DD'))){
              delete oneTestResultToStore[recorddate];
            }
          }
          oneTestResultToStore[inputs.kickoffdate]={};
          oneTestResultToStore[inputs.kickoffdate]['kickoffdate']  = inputs.kickoffdate;
          oneTestResultToStore[inputs.kickoffdate]['projectname']  = 'NA';
          oneTestResultToStore[inputs.kickoffdate]['variantname']  = 'NA';
          oneTestResultToStore[inputs.kickoffdate]['changelist']   = 'NA';
          oneTestResultToStore[inputs.kickoffdate]['result']       = 'UNKNOWN';
          oneTestResultToStore[inputs.kickoffdate]['seed']         = 'NA';
          oneTestResultToStore[inputs.kickoffdate]['signature']    = 'NA';
          oneTestResultToStore[inputs.kickoffdate]['mode']         = 'NA';
          await Regressionresults.update({
            testname  : resultsInDB[r].testname
          },{
            result    : JSON.stringify(oneTestResultToStore)
          });
        }
        //put kick off date record into DB
      }
    }
    // All done.
    return;

  }


};