var moment = require('moment');
module.exports = {


  friendlyName: 'Calpassingrate',


  description: 'Calpassingrate regression.',


  inputs: {
    batchname : {
      type  : 'string'
    },
    testnameprefix  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('regression/calpassingrate');
    sails.log(inputs);
    var one_reg = await Regression_log.findOne({
      batchname : inputs.batchname
    });
    if(inputs.testnameprefix == 'NA'){
      
      var passednum   = 0;
      var failednum   = 0;
      var totalnum    = 0;
      var unknownnum  = 0;

      //var one_reg = await Regression_log.findOne({
      //  batchname : inputs.batchname
      //});
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
          passingrate : (passednum/totalnum*100).toFixed(2),
          passednum : passednum,
          failednum : failednum,
          totalnum  : totalnum,
          unknownnum: unknownnum,
          updatetime: moment().format()
        });
      }
    }
    else {
      var passednum   = 0;
      var failednum   = 0;
      var totalnum    = 0;
      var unknownnum  = 0;
      
      //var one_reg = await Regression_log.findOne({
      //  batchname : inputs.batchname
      //});
      if( (one_reg.updatetime !=  'NA') && (moment(one_reg.kickofftime).add(48,'hours').isBefore(moment().format())) ){
        //Do nothing
      }
      else{
        var prefixs = JSON.parse(inputs.testnameprefix);
        for(var i=0;i<prefixs.length;i++){
          passednum += await Regression_his.count({
            batchname : inputs.batchname,
            stat      : 'PASS',
            testname  : {startsWith : prefixs[i]}
          });
          failednum += await Regression_his.count({
            batchname : inputs.batchname,
            stat      : 'FAILED',
            testname  : {startsWith : prefixs[i]}
          });
          totalnum  += await Regression_his.count({
            batchname : inputs.batchname,
            testname  : {startsWith : prefixs[i]}
          });
        }
        unknownnum = totalnum  - passednum - failednum;
        await Testplan_log.destroy({
          batchname : inputs.batchname
        });
        await Testplan_log.create({
          batchname : inputs.batchname,
          passingrate : (passednum/totalnum*100).toFixed(2),
          passednum : passednum,
          failednum : failednum,
          totalnum  : totalnum,
          unknownnum: unknownnum,
          updatetime: moment().format()
        });
      }
    }
    // All done.
    return exits.success({ok:'ok'});

  }


};
