var moment = require('moment');
module.exports = {


  friendlyName: 'Check',


  description: 'Check regression.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    datestart : {
      type  : 'string'
    },
    dateend : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    sails.log('/regression/check');
    sails.log(inputs);
    if(inputs.kind  ==  'rangepassingrate'){
      async sails.helpers.rangepassingrate.with({
        datestart : inputs.datestart,
        dateend   : inputs.dateend
      });
      //var i = 0;
      //var item  = "";
      //var passingrates_official_normal  = [];
      //var passingrates_official_long    = [];
      //var passingrates_official_pg      = [];
      //var passingrates_official_baco    = [];
      //var detailsinfonormal             = [];
      //var detailsinfolong               = [];
      //var detailsinfobaco               = [];
      //var detailsinfopg                 = [];
      //while(item  !=  moment(inputs.dateend).format('YYYY-MM-DD')){
      //  item  = moment(inputs.datestart).add(i,'days').format('YYYY-MM-DD');
      //  sails.log(item);
      //  ///////////////////
      //  //Normal
      //  ///////////////////
      //  //find batch name of which regression was kicked off that day
      //  var one_reg_official_normal = await Regression_log.findOne({
      //    mode        : 'normal',
      //    startdate   : item,
      //    isofficial  : 'yes'
      //  });
      //  sails.log(one_reg_official_normal);
	    //  if(!one_reg_official_normal){
      //    one_reg_official_normal = await Regression_log.findOne({
      //      mode        : 'normal',
      //      startdate   : moment(item).subtract(1,'days').format('YYYY-MM-DD'),
	    //      isofficial  : 'yes'
	    //    });
	    //  }
      //  if(one_reg_official_normal){
      //    //get passed ones of that batch name
      //    var tests_passed_official_normal = await Regression_his.find({
      //      batchname : one_reg_official_normal.batchname,
      //      stat      : 'PASS'
      //    });
      //    //get failed ones of that batch name
      //    var tests_failed_official_normal = await Regression_his.find({
      //      batchname : one_reg_official_normal.batchname,
      //      stat      : 'FAILED'
      //    });
      //    //get all ones of that batch name
      //    var tests_all_official_normal = await Regression_his.find({
      //      batchname : one_reg_official_normal.batchname
      //    });
      //    //cal passing rate
      //    if(tests_all_official_normal.length == 0){
      //      passingrate_official_normal = 0.00;
      //    }
      //    else {
      //      var passingrate_official_normal = 100 * tests_passed_official_normal.length / tests_all_official_normal.length;
      //      passingrate_official_normal = passingrate_official_normal.toFixed(2);
      //      sails.log(tests_passed_official_normal.length);
      //      sails.log(tests_failed_official_normal.length);
      //      sails.log(tests_all_official_normal.length);
      //      sails.log(passingrate_official_normal);
      //    }
      //    //store the passing rate
      //    passingrates_official_normal.push(passingrate_official_normal);
      //    //store the details info
      //    detailsinfonormal.unshift({
      //      date            : item,
      //      changelist      : one_reg_official_normal.changelist,
      //      totalnum        : tests_all_official_normal.length,
      //      totalnumdelta   : '',
      //      passednum       : tests_passed_official_normal.length,
      //      failednum       : tests_failed_official_normal.length,
      //      unknownnum      : (tests_all_official_normal.length - tests_passed_official_normal.length - tests_failed_official_normal.length),
      //    });
      //  }
      //  else {
      //    passingrates_official_normal.push(0.00);
      //    detailsinfonormal.unshift({
      //      date            : item,
      //      changelist      : '',
      //      totalnum        : '',
      //      totalnumdelta   : '',
      //      passednum       : '',
      //      failednum       : '',
      //      unknownnum      : '',
      //    });
      //  }
      //  //=================
      //  ///////////////////
      //  //Long
      //  ///////////////////
      //  //find batch name of which regression was kicked off that day
      //  var one_reg_official_long = await Regression_log.findOne({
      //    mode        : 'long',
      //    startdate   : item,
      //    isofficial  : 'yes'
      //  });
      //  sails.log(one_reg_official_long);
	    //  if(!one_reg_official_long){
      //    one_reg_official_long = await Regression_log.findOne({
      //      mode        : 'long',
      //      startdate   : moment(item).subtract(1,'days').format('YYYY-MM-DD'),
	    //      isofficial  : 'yes'
	    //    });
	    //  }
      //  if(one_reg_official_long){
      //    //get passed ones of that batch name
      //    var tests_passed_official_long = await Regression_his.find({
      //      batchname : one_reg_official_long.batchname,
      //      stat      : 'PASS'
      //    });
      //    //get failed ones of that batch name
      //    var tests_failed_official_long = await Regression_his.find({
      //      batchname : one_reg_official_long.batchname,
      //      stat      : 'FAILED'
      //    });
      //    //get all ones of that batch name
      //    var tests_all_official_long = await Regression_his.find({
      //      batchname : one_reg_official_long.batchname
      //    });
      //    //cal passing rate
      //    if(tests_all_official_long.length == 0){
      //      passingrate_official_long = 0.00;
      //    }
      //    else {
      //      var passingrate_official_long = 100 * tests_passed_official_long.length / tests_all_official_long.length;
      //      passingrate_official_long = passingrate_official_long.toFixed(2);
      //      sails.log(tests_passed_official_long.length);
      //      sails.log(tests_failed_official_long.length);
      //      sails.log(tests_all_official_long.length);
      //      sails.log(passingrate_official_long);
      //    }
      //    //store the passing rate
      //    passingrates_official_long.push(passingrate_official_long);
      //    //store the details info
      //    detailsinfolong.unshift({
      //      date            : item,
      //      changelist      : one_reg_official_long.changelist,
      //      totalnum        : tests_all_official_long.length,
      //      totalnumdelta   : '',
      //      passednum       : tests_passed_official_long.length,
      //      failednum       : tests_failed_official_long.length,
      //      unknownnum      : (tests_all_official_long.length - tests_passed_official_long.length - tests_failed_official_long.length),
      //    });
      //  }
      //  else {
      //    passingrates_official_long.push(0.00);
      //    detailsinfolong.unshift({
      //      date            : item,
      //      changelist      : '',
      //      totalnum        : '',
      //      totalnumdelta   : '',
      //      passednum       : '',
      //      failednum       : '',
      //      unknownnum      : '',
      //    });
      //  }
      //  //=================
      //  ///////////////////
      //  //PG
      //  ///////////////////
      //  //find batch name of which regression was kicked off that day
      //  var one_reg_official_pg = await Regression_log.findOne({
      //    mode        : 'pg',
      //    startdate   : item,
      //    isofficial  : 'yes'
      //  });
      //  sails.log(one_reg_official_pg);
	    //  if(!one_reg_official_pg){
      //    one_reg_official_pg = await Regression_log.findOne({
      //      mode        : 'pg',
      //      startdate   : moment(item).subtract(1,'days').format('YYYY-MM-DD'),
	    //      isofficial  : 'yes'
	    //    });
	    //  }
      //  if(one_reg_official_pg){
      //    //get passed ones of that batch name
      //    var tests_passed_official_pg = await Regression_his.find({
      //      batchname : one_reg_official_pg.batchname,
      //      stat      : 'PASS'
      //    });
      //    //get failed ones of that batch name
      //    var tests_failed_official_pg = await Regression_his.find({
      //      batchname : one_reg_official_pg.batchname,
      //      stat      : 'FAILED'
      //    });
      //    //get all ones of that batch name
      //    var tests_all_official_pg = await Regression_his.find({
      //      batchname : one_reg_official_pg.batchname
      //    });
      //    //cal passing rate
      //    if(tests_all_official_pg.length == 0){
      //      passingrate_official_pg = 0.00;
      //    }
      //    else {
      //      var passingrate_official_pg = 100 * tests_passed_official_pg.length / tests_all_official_pg.length;
      //      passingrate_official_pg = passingrate_official_pg.toFixed(2);
      //      sails.log(tests_passed_official_pg.length);
      //      sails.log(tests_failed_official_pg.length);
      //      sails.log(tests_all_official_pg.length);
      //      sails.log(passingrate_official_pg);
      //    }
      //    //store the passing rate
      //    passingrates_official_pg.push(passingrate_official_pg);
      //    //store the details info
      //    detailsinfopg.unshift({
      //      date            : item,
      //      changelist      : one_reg_official_pg.changelist,
      //      totalnum        : tests_all_official_pg.length,
      //      totalnumdelta   : '',
      //      passednum       : tests_passed_official_pg.length,
      //      failednum       : tests_failed_official_pg.length,
      //      unknownnum      : (tests_all_official_pg.length - tests_passed_official_pg.length - tests_failed_official_pg.length),
      //    });
      //  }
      //  else {
      //    passingrates_official_pg.push(0.00);
      //    detailsinfopg.unshift({
      //      date            : item,
      //      changelist      : '',
      //      totalnum        : '',
      //      totalnumdelta   : '',
      //      passednum       : '',
      //      failednum       : '',
      //      unknownnum      : '',
      //    });
      //  }
      //  //=================
      //  ///////////////////
      //  //Baco
      //  ///////////////////
      //  //find batch name of which regression was kicked off that day
      //  var one_reg_official_baco = await Regression_log.findOne({
      //    mode        : 'baco',
      //    startdate   : item,
      //    isofficial  : 'yes'
      //  });
      //  sails.log(one_reg_official_baco);
	    //  if(!one_reg_official_baco){
      //    one_reg_official_baco = await Regression_log.findOne({
      //      mode        : 'baco',
      //      startdate   : moment(item).subtract(1,'days').format('YYYY-MM-DD'),
	    //      isofficial  : 'yes'
	    //    });
	    //  }
      //  if(one_reg_official_baco){
      //    //get passed ones of that batch name
      //    var tests_passed_official_baco = await Regression_his.find({
      //      batchname : one_reg_official_baco.batchname,
      //      stat      : 'PASS'
      //    });
      //    //get failed ones of that batch name
      //    var tests_failed_official_baco = await Regression_his.find({
      //      batchname : one_reg_official_baco.batchname,
      //      stat      : 'FAILED'
      //    });
      //    //get all ones of that batch name
      //    var tests_all_official_baco = await Regression_his.find({
      //      batchname : one_reg_official_baco.batchname
      //    });
      //    //cal passing rate
      //    if(tests_all_official_baco.length == 0){
      //      passingrate_official_baco = 0.00;
      //    }
      //    else {
      //      var passingrate_official_baco = 100 * tests_passed_official_baco.length / tests_all_official_baco.length;
      //      passingrate_official_baco = passingrate_official_baco.toFixed(2);
      //      sails.log(tests_passed_official_baco.length);
      //      sails.log(tests_failed_official_baco.length);
      //      sails.log(tests_all_official_baco.length);
      //      sails.log(passingrate_official_baco);
      //    }
      //    //store the passing rate
      //    passingrates_official_baco.push(passingrate_official_baco);
      //    //store the details info
      //    detailsinfobaco.unshift({
      //      date            : item,
      //      changelist      : one_reg_official_baco.changelist,
      //      totalnum        : tests_all_official_baco.length,
      //      totalnumdelta   : '',
      //      passednum       : tests_passed_official_baco.length,
      //      failednum       : tests_failed_official_baco.length,
      //      unknownnum      : (tests_all_official_baco.length - tests_passed_official_baco.length - tests_failed_official_baco.length),
      //    });
      //  }
      //  else {
      //    passingrates_official_baco.push(0.00);
      //    detailsinfobaco.unshift({
      //      date            : item,
      //      changelist      : '',
      //      totalnum        : '',
      //      totalnumdelta   : '',
      //      passednum       : '',
      //      failednum       : '',
      //      unknownnum      : '',
      //    });
      //  }
      //  //=================
      //  i++;
      //}

      return exits.success({
        ok  : 'ok',
        PassingRate_his_normal  : passingrates_official_normal,
        PassingRate_his_long    : passingrates_official_long,
        PassingRate_his_pg      : passingrates_official_pg,
        PassingRate_his_baco    : passingrates_official_baco,
        detailsinfonormal       : detailsinfonormal,
        detailsinfolong         : detailsinfolong,
        detailsinfobaco         : detailsinfobaco,
        detailsinfopg           : detailsinfopg,
      });
    }

  }


};
