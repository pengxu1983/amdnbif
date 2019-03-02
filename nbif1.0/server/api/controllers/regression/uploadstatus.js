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
    for(let v=0;v<variants.length;v++){
      if(inputs.kind == variants[v].variantname){
        let DB = Teststatusvariant01;
        let results   : JSON.parse(inputs.results);
        let resultsInDB = await Regressionresults.find({
          id  : {'>=':0}
        });
        let R = {};
        R[inputs.kickoffdate]={};//TODO suite?
        R[inputs.kickoffdate]['changelist']   = results['changelist']  ;
        R[inputs.kickoffdate]['result']       = results['result']      ;
        R[inputs.kickoffdate]['seed']         = results['seed']        ;
        R[inputs.kickoffdate]['signature']    = results['signature']   ;
        R[inputs.kickoffdate]['mode']         = results['mode']        ;
        if(resultsInDB.length == 0){
          //store directly
          for(let testname in results){
            await DB.create({
              testname  : testname,
              testplan  : 'NA',//TODO
              resultbyday : JSON.stringify(R)
            });
          }
        }
        else{
          //clear too old
          //reserve previous
          //store new
        }
      }
    }
    if(inputs.kind  =='nbif_al_gpu'){
      sails.log('nbif.main.normal');
      sails.log(JSON.parse(inputs.results));
      let results     = JSON.parse(inputs.results);
      let resultsInDB = await Regressionresults.find({
        id  : {'>=':0}
      });
      // if DB is empty that date, Just create all
      if(resultsInDB.length == 0)
      else
      return exists.success(JSON.stringify({
        ok  : 'ok'
      }));
    }
    // All done.

  }


};
