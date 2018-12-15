module.exports = {


  friendlyName: 'Ongoing',


  description: 'Ongoing regression.',


  inputs: {
    batchname : {
      type    : 'string',
    },
    testname  : {
      type    : 'string',
    },
    seed      : {
      type    : 'string',
    },
    getinfodate : {
      type    : 'string',
    },
    getinfotime : {
      type    : 'string',
    },
    stat  : {
      type    : 'string',
    },
    signature : {
      type    : 'string',
    }

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    //sails.log('/regression/ongoing');
    var one_regression_his;
    one_regression_his  = await Regression_his.findOne({
      batchname : inputs.batchname,
      testname  : inputs.testname,
    });
    if(one_regression_his){
      await Regression_his.update({
        batchname : inputs.batchname,
        testname  : inputs.testname,
      },{
        batchname   : inputs.batchname   ,
        testname    : inputs.testname    ,
        seed        : inputs.seed        ,
        getinfodate : inputs.getinfodate ,
        getinfotime : inputs.getinfotime ,
        stat        : inputs.stat        ,
        signature   : inputs.signature
      });
      return exits.success({
        ok  : 'ok',
        msg : 'update testcase'
      });
    }
    else  {
      await Regression_his.create({
        batchname   : inputs.batchname   ,
        testname    : inputs.testname    ,
        seed        : inputs.seed        ,
        getinfodate : inputs.getinfodate ,
        getinfotime : inputs.getinfotime ,
        stat        : inputs.stat        ,
        signature   : inputs.signature   
      });
      return exits.success({
        ok  : 'ok',
        msg : 'regression history recorded'
      });
    }

  }


};
