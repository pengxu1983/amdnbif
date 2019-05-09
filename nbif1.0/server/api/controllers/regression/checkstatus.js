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
    let datestart   = inputs.datestart;
    let dateend     = inputs.dateend;
    let variantname = inputs.variantname;
    let projectname = inputs.projectname;
    let mode        = inputs.mode;
    let testplanname  = inputs.testplanname;
    let PassingRate = [];
    let detailsinfo = [];
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
          let testlist;
          let passlist;
          let faillist;
          let unknownlist;
          if(R.testlist ==  ''){
            testlist  = [];
          }
          else{
            testlist  = JSON.parse(R.testlist);
          }
          if(R.passlist ==  ''){
            passlist  = [];
          }
          else{
            passlist  = JSON.parse(R.passlist);
          }
          if(R.faillist ==  ''){
            faillist  = [];
          }
          else{
            faillist  = JSON.parse(R.faillist);
          }
          if(R.unknownlist  ==  ''){
            unknownlist = [];
          }
          else{
            unknownlist = JSON.parse(R.unknownlist);
          }
          detailsinfo.unshift({
            date  : moment(date).format('YYYY-MM-DD'),
            changelist  : R.changelist,
            totalnum  : testlist.length,
            passednum : passlist.length,
            failednum : faillist.length,
            unknownnum: unknownlist.length
          });
        }
        else{
          PassingRate.push(0.00);
          detailsinfo.unshift({
            date      : moment(date).format('YYYY-MM-DD'),
            changelist: 'NA',
            totalnum  : 'NA',
            passednum : 'NA',
            failednum : 'NA',
            unknownnum: 'NA'
          });
        }
        date = moment(date).add(1,'days');
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        PassingRate : JSON.stringify(PassingRate),
        detailsinfo : JSON.stringify(detailsinfo)
      }));
    }
    // All done.
    //return;

  }


};
