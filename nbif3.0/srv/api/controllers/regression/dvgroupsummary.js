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
    sails.log('/regression/dvgroupsummary');
    sails.log(inputs);
    let R;
    let alldvgroups= [
      'HOST',
      'DMA',
      'MISC',
      'PERF',
      'OTHERS'
    ];//TODO
    //--------------------------------
    //clean up DB : start
    //--------------------------------
    for(let day = 0 ; day < 5 ; day ++){
      sails.log('clean DB');
      let date = moment().subtract(day+15,'days').format('YYYY-MM-DD');
      sails.log(date);
      let W;
      W = {
        kickoffdate : date
      };
      ////////////////////////////////
      //For 0001 start
      ////////////////////////////////
      if(inputs.projectname ==  'mi200'){
        await Regressiondvgroup0001.destroy(W);
      }
      ////////////////////////////////
      //For 0001 end
      ////////////////////////////////
      ////////////////////////////////
      //For 0002 start
      ////////////////////////////////
      if(inputs.projectname ==  'mero'){
        await Regressiondvgroup0002.destroy(W);
      }
      ////////////////////////////////
      //For 0002 end
      ////////////////////////////////
      ////////////////////////////////
      //For 0003 start
      ////////////////////////////////
      if(inputs.projectname ==  'rembrandt'){
        await Regressiondvgroup0003.destroy(W);
      }
      ////////////////////////////////
      //For 0003 end
      ////////////////////////////////
      ////////////////////////////////
      //For 0004 start
      ////////////////////////////////
      if(inputs.projectname ==  'floyd'){
        await Regressiondvgroup0004.destroy(W);
      }
      ////////////////////////////////
      //For 0004 end
      ////////////////////////////////
    }
    //--------------------------------
    //clean up DB : end
    //--------------------------------
    

    //--------------------------------
    //update summary : start
    //--------------------------------
    let W0  = {
      projectname : inputs.projectname,
      variantname : inputs.variantname,
      isBAPU      : inputs.isBAPU,
    };

    if(alldvgroups.length == 0){
      return exits.success(JSON.stringify({
        ok  : 'notok',
        msg : 'no such regression'
      }));
    }
    else{
      for(let g=0;g<alldvgroups.length;g++){
        sails.log('dvgroup');
        sails.log(alldvgroups[g]);
        //--------------------------------
        //One group in this regression : start
        //--------------------------------
        let testlist    = 0;
        let passlist    = 0;
        let faillist    = 0;
        let unknownlist = 0;
        let runninglist = 0;
        let passrate    = 0.00;
        let checkedtime = moment().format('YYYY-MM-DD HH:mm:ss');
        let lists = [
          'testlist',
          'passlist',  
          'faillist',
          'unknownlist',
          'runninglist'
        ];
        let W1 = JSON.parse(JSON.stringify(W0));
        W1.DVgroup  = alldvgroups[g];
        let R = await Groups.find(W1);
        let havegroups = [];
        for(let r=0;r<R.length;r++){
          havegroups.push(R[r].groupname);
        }
        for(let l=0;l<lists.length;l++){
          let R;
          let W2 = JSON.parse(JSON.stringify(W0));
          W2.kickoffdate  = inputs.kickoffdate;
          W2.changelist   = inputs.changelist;
          W2.shelve       = inputs.shelve;
          W2.groupname    = {'in':havegroups};
          if(lists[l]=='testlist'){
            sails.log('testlist cal');
          }
          if(lists[l]=='passlist'){
            sails.log('passlist cal');
            W2.result = 'PASS';
          }
          if(lists[l]=='faillist'){
            sails.log('faillist cal');
            W2.result = 'FAIL';
          }
          if(lists[l]=='unknownlist'){
            sails.log('unknownlist cal');
            W2.result = 'UNKNOWN';
          }
          if(lists[l]=='runninglist'){
            sails.log('runninglist  cal');
            W2.result = 'RUNNING';
          }
          ////////////////////////////////
          //For 0001 start
          ////////////////////////////////
          if(inputs.projectname ==  'mi200'){
            R = await Regressiondetails0001.find(W2);
          }
          ////////////////////////////////
          //For 0001 end
          ////////////////////////////////
          ////////////////////////////////
          //For 0002 start
          ////////////////////////////////
          if(inputs.projectname ==  'mero'){
            R = await Regressiondetails0002.find(W2);
          }
          ////////////////////////////////
          //For 0002 end
          ////////////////////////////////
          ////////////////////////////////
          //For 0003 start
          ////////////////////////////////
          if(inputs.projectname ==  'rembrandt'){
            R = await Regressiondetails0003.find(W2);
          }
          ////////////////////////////////
          //For 0003 end
          ////////////////////////////////
          ////////////////////////////////
          //For 0004 start
          ////////////////////////////////
          if(inputs.projectname ==  'floyd'){
            R = await Regressiondetails0004.find(W2);
          }
          ////////////////////////////////
          //For 0001 end
          ////////////////////////////////
          if(lists[l]=='testlist'){
            testlist  = R.length;
          }
          if(lists[l]=='passlist'){
            passlist  = R.length;
          }
          if(lists[l]=='faillist'){
            faillist  = R.length;
          }
          if(lists[l]=='unknownlist'){
            unknownlist = R.length;
          }
          if(lists[l]=='runninglist'){
            runninglist = R.length;
          }
        }
        if(testlist ==  0){
        }
        else{
          passrate  = passlist/testlist*100;
          passrate  = passrate.toFixed(2);
        }
        let W3 = JSON.parse(JSON.stringify(W0));
        W3.kickoffdate  = inputs.kickoffdate;
        W3.changelist   = inputs.changelist;
        W3.shelve       = inputs.shelve;
        W3.DVgroup      = alldvgroups[g];
        let W4 = JSON.parse(JSON.stringify(W3));
        W4.testlist = testlist;
        W4.passlist = passlist;
        W4.faillist = faillist;
        W4.unknownlist  = unknownlist;
        W4.runninglist  = runninglist;
        W4.passrate = passrate;
        W4.checkedtime  = checkedtime;
        ////////////////////////////////
        //For 0001 start
        ////////////////////////////////
        if(inputs.projectname ==  'mi200'){
          await Regressiondvgroup0001.destroy(W3);
          await Regressiondvgroup0001.create(W4);
        }
        ////////////////////////////////
        //For 0001 end
        ////////////////////////////////
        ////////////////////////////////
        //For 0002 start
        ////////////////////////////////
        if(inputs.projectname ==  'mero'){
          await Regressiondvgroup0002.destroy(W3);
          await Regressiondvgroup0002.create(W4);
        }
        ////////////////////////////////
        //For 0002 end
        ////////////////////////////////
        ////////////////////////////////
        //For 0003 start
        ////////////////////////////////
        if(inputs.projectname ==  'rembrandt'){
          await Regressiondvgroup0003.destroy(W3);
          await Regressiondvgroup0003.create(W4);
        }
        ////////////////////////////////
        //For 0003 end
        ////////////////////////////////
        ////////////////////////////////
        //For 0004 start
        ////////////////////////////////
        if(inputs.projectname ==  'floyd'){
          await Regressiondvgroup0004.destroy(W3);
          await Regressiondvgroup0004.create(W4);
        }
        ////////////////////////////////
        //For 0004 end
        ////////////////////////////////
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
      }));
    }
  }
};
