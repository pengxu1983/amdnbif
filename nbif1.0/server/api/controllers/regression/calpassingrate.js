var moment = require('moment');
module.exports = {


  friendlyName: 'Calpassingrate',


  description: 'Calpassingrate regression.',


  inputs: {
    batchname : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    sails.log('regression/calpassingrate');
    sails.log(inputs);
    var passednum;
    var failednum;
    var totalnum;
    var unknownnum;
    var one_reg = await Regression_log.findOne({
      batchname : inputs.batchname
    });
    if( (one_reg.updatetime !=  'NA') && (moment(one_reg.kickofftime).add(48,'hours').isBefore(moment().format())) ){
      //Do nothing
    }
    else{
      passednum = await Regression_his.count({
        batchname : inputs.batchname,
        stat      : 'PASS'
      });
      failednum = await Regression_his.count({
        batchname : inputs.batchname,
        stat      : 'FAILED'
      });
      totalnum  = await Regression_his.count({
        batchname : inputs.batchname
      });
      unknownnum= totalnum  - passednum - failednum;
      await Regression_log.update({
        batchname : inputs.batchname
      },{
        passednum : passednum,
        failednum : failednum,
        totalnum  : totalnum,
        unknownnum: unknownnum,
        updatetime: moment().format()
      });
    }
    // All done.
    return;

  }


};
