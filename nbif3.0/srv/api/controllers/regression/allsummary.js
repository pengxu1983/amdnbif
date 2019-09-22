var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
//let cron_do_summary = new cronJob('0 */30 * * * *',function(){
//},null,false,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Summary',


  description: 'Summary regression.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    start : {
      type  : 'string'
    },
    stop  : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    isBAPU  : {
      type  : 'string'
    },
    changelist  : {
      type  : 'string'
    },
    kickoffdate : {
      type  : 'string'
    },
    shelve  : {
      type  : 'string'
    },
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/allsummary');
    sails.log(inputs);
    let R;
    let oneregressiongroups;
    //--------------------------------
    //clean up DB : start
    //--------------------------------
    for(let day = 0 ; day < 5 ; day ++){
      //sails.log('clean DB');
      let date = moment().subtract(day+15,'days').format('YYYY-MM-DD');
      //sails.log(date);
      let W;
      W = {
        kickoffdate : date
      };
      ////////////////////////////////
      //For 0001 start
      ////////////////////////////////
      if(inputs.projectname ==  'mi200'){
        await Regressionall0001.destroy(W);
      }
      ////////////////////////////////
      //For 0001 end
      ////////////////////////////////
      ////////////////////////////////
      //For 0002 start
      ////////////////////////////////
      if(inputs.projectname ==  'mero'){
        await Regressionall0002.destroy(W);
      }
      ////////////////////////////////
      //For 0002 end
      ////////////////////////////////
      ////////////////////////////////
      //For 0003 start
      ////////////////////////////////
      if(inputs.projectname ==  'rembrandt'){
        await Regressionall0003.destroy(W);
      }
      ////////////////////////////////
      //For 0003 end
      ////////////////////////////////
      ////////////////////////////////
      //For 0004 start
      ////////////////////////////////
      if(inputs.projectname ==  'floyd'){
        await Regressionall0004.destroy(W);
      }
      ////////////////////////////////
      //For 0004 end
      ////////////////////////////////
    }
    //--------------------------------
    //clean up DB : end
    //--------------------------------
    
    let testlist  = 0;
    let passlist  = 0;
    let faillist  = 0;
    let unknownlist = 0;
    let runninglist = 0;
    let passrate  = 0.00;
    let lists = [
      'testlist',
      'passlist',
      'faillist',
      'unknownlist',
      'runninglist'
    ];
    let W0  = {
      projectname : inputs.projectname,
      variantname : inputs.variantname,
      isBAPU      : inputs.isBAPU,
      kickoffdate : inputs.kickoffdate,
      changelist  : inputs.changelist,
      shelve      : inputs.shelve
    };

    for(let l = 0;l<lists.length;l++){
      let W1;
      if(lists[l] =='testlist'){
        sails.log('testlist cal');
        W1  = JSON.parse(JSON.stringify(W0));
      }
      if(lists[l] =='passlist'){
        sails.log('passlist cal');
        W1  = JSON.parse(JSON.stringify(W0));
        W1.result = 'PASS';
      }
      if(lists[l] =='faillist'){
        sails.log('faillist cal');
        W1  = JSON.parse(JSON.stringify(W0));
        W1.result = 'FAIL';
      }
      if(lists[l] =='unknownlist'){
        sails.log('unknownlist cal');
        W1  = JSON.parse(JSON.stringify(W0));
        W1.result = 'UNKNOWN';
      }
      if(lists[l] =='runninglist'){
        sails.log('runninglist cal');
        W1  = JSON.parse(JSON.stringify(W0));
        W1.result = 'RUNNING';
      }
      let R;
      ////////////////////////////////
      //For 0001 start
      ////////////////////////////////
      if(inputs.projectname ==  'mi200'){
        R = await Regressiondetails0001.find(W1);
      }
      ////////////////////////////////
      //For 0001 end
      ////////////////////////////////
      ////////////////////////////////
      //For 0002 start
      ////////////////////////////////
      if(inputs.projectname ==  'mero'){
        R = await Regressiondetails0002.find(W1);
      }
      ////////////////////////////////
      //For 0002 end
      ////////////////////////////////
      ////////////////////////////////
      //For 0003 start
      ////////////////////////////////
      if(inputs.projectname ==  'rembrandt'){
        R = await Regressiondetails0003.find(W1);
      }
      ////////////////////////////////
      //For 0003 end
      ////////////////////////////////
      ////////////////////////////////
      //For 0004 start
      ////////////////////////////////
      if(inputs.projectname ==  'floyd'){
        R = await Regressiondetails0004.find(W1);
      }
      ////////////////////////////////
      //For 0004 end
      ////////////////////////////////
      if(lists[l] =='testlist'){
        testlist  = R.length;
      }
      if(lists[l] =='passlist'){
        passlist  = R.length;
      }
      if(lists[l] =='faillist'){
        faillist  = R.length;
      }
      if(lists[l] =='unknownlist'){
        unknownlist = R.length;
      }
      if(lists[l] =='runninglist'){
        runninglist = R.length;
      }
    }

    if(testlist ==  0){
    }
    else{
      passrate  = passlist/testlist*100;
      passrate  = passrate.toFixed(2);
    }
    let checkedtime = moment().format('YYYY-MM-DD HH:mm:ss');
    let W2  = {
      projectname : inputs.projectname,
      variantname : inputs.variantname,
      isBAPU      : inputs.isBAPU,
      kickoffdate : inputs.kickoffdate,
      changelist  : inputs.changelist,
      shelve      : inputs.shelve
    };
    let W3  = JSON.parse(JSON.stringify(W2));
    W3.testlist     =   testlist;
    W3.passlist     =   passlist;
    W3.faillist     =   faillist   ;
    W3.unknownlist  =   unknownlist;
    W3.passrate     =   passrate   ;
    W3.checkedtime  =   checkedtime;
    sails.log(W2);
    sails.log(W3);
    ////////////////////////////////
    //For 0001 start
    ////////////////////////////////
    if(inputs.projectname ==  'mi200'){
      await Regressionall0001.destroy(W2);
      await Regressionall0001.create(W3);
    }
    ////////////////////////////////
    //For 0001 end
    ////////////////////////////////
    ////////////////////////////////
    //For 0002 start
    ////////////////////////////////
    if(inputs.projectname ==  'mero'){
      await Regressionall0002.destroy(W2);
      await Regressionall0002.create(W3);
    }
    ////////////////////////////////
    //For 0002 end
    ////////////////////////////////
    ////////////////////////////////
    //For 0003 start
    ////////////////////////////////
    if(inputs.projectname ==  'rembrandt'){
      await Regressionall0003.destroy(W2);
      await Regressionall0003.create(W3);
    }
    ////////////////////////////////
    //For 0003 end
    ////////////////////////////////
    ////////////////////////////////
    //For 0004 start
    ////////////////////////////////
    if(inputs.projectname ==  'floyd'){
      await Regressionall0004.destroy(W2);
      await Regressionall0004.create(W3);
    }
    ////////////////////////////////
    //For 0004 end
    ////////////////////////////////
    //--------------------------------
    //update summary : start
    //--------------------------------
    return exits.success(JSON.stringify({
      ok  : 'ok',
      msg : 'updated all at '+ moment().format('YYYY-MM-DD HH:mm:ss')
    }));
  }
};
