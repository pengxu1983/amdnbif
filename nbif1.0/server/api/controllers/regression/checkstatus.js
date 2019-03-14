var moment  = require('moment');
module.exports = {


  friendlyName: 'Checkstatus',


  description: 'Checkstatus regression.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    mode  : {
      type  : 'string'
    },
    datestart : {
      type  : 'string'
    },
    dateend : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    testplanname  : {
      type  : 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/checkstatus');
    sails.log(inputs);
    let datestart = inputs.datestart;
    let dateend   = inputs.dateend;
    let variantname = inputs.variantname;
    let projectname = inputs.projectname;
    let mode  = inputs.mode;
    let testplanname  = inputs.testplanname;
    let PassingRate = [];
    if(inputs.kind  ==  'rangepassingrate'){
      let date = datestart;
      while(moment(date).isSameOrBefore(dateend)){
        let R = await Teststatusvariant01_summary.findOne({
          kickoffdate : moment(date).format('YYYY-MM-DD'),
          variantname : variantname,
          mode  : mode,
          testplanname  : testplanname
        });
        if(R){
        }
        else{
          R = await Teststatusvariant01_summary.findOne({
            kickoffdate : moment(date).subtract(1,'days').format('YYYY-MM-DD'),
            variantname : variantname,
            mode  : mode,
            testplanname  : testplanname
          });
        }
        if(R){
          PassingRate.push(R.passingrate);
        }
        else{
          PassingRate.push(0.00);
        }
        date = moment(date).add(1,'days');
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        PassingRate : JSON.stringify(PassingRate)
      }));
    }
    // All done.
    //return;

  }


};