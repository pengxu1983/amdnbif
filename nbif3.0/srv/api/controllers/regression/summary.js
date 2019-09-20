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
    sails.log('/regression/summary');
    sails.log(inputs);
    let R;
    let oneregressiongroups;
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
        await Regressiondetails0001.destroy(W);
        await Regressionsummary0001.destroy(W);
      }
      ////////////////////////////////
      //For 0001 end
      ////////////////////////////////
      ////////////////////////////////
      //For 0002 start
      ////////////////////////////////
      if(inputs.projectname ==  'mero'){
        await Regressiondetails0002.destroy(W);
        await Regressionsummary0002.destroy(W);
      }
      ////////////////////////////////
      //For 0002 end
      ////////////////////////////////
      ////////////////////////////////
      //For 0003 start
      ////////////////////////////////
      if(inputs.projectname ==  'rembrandt'){
        await Regressiondetails0003.destroy(W);
        await Regressionsummary0003.destroy(W);
      }
      ////////////////////////////////
      //For 0003 end
      ////////////////////////////////
      ////////////////////////////////
      //For 0004 start
      ////////////////////////////////
      if(inputs.projectname ==  'floyd'){
        await Regressiondetails0004.destroy(W);
        await Regressionsummary0004.destroy(W);
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
    let W0 = {
      projectname : inputs.projectname,
      variantname : inputs.variantname,
      isBAPU      : inputs.isBAPU,
      kickoffdate : inputs.kickoffdate,
      changelist  : inputs.changelist,
      shelve      : inputs.shelve,
    };
    ////////////////////////////////
    //For 0001 start
    ////////////////////////////////
    if(inputs.projectname ==  'mi200'){
      oneregressiongroups = await Regressionsummary0001.find(W0);
    }
    ////////////////////////////////
    //For 0001 end
    ////////////////////////////////
    ////////////////////////////////
    //For 0002 start
    ////////////////////////////////
    if(inputs.projectname ==  'mero'){
      oneregressiongroups = await Regressionsummary0002.find(W0);
    }
    ////////////////////////////////
    //For 0002 end
    ////////////////////////////////
    ////////////////////////////////
    //For 0003 start
    ////////////////////////////////
    if(inputs.projectname ==  'rembrandt'){
      oneregressiongroups = await Regressionsummary0003.find(W0);
    }
    ////////////////////////////////
    //For 0003 end
    ////////////////////////////////
    ////////////////////////////////
    //For 0004 start
    ////////////////////////////////
    if(inputs.projectname ==  'floyd'){
      oneregressiongroups = await Regressionsummary0004.find(W0);
    }
    ////////////////////////////////
    //For 0004 end
    ////////////////////////////////
    if(oneregressiongroups.length == 0){
      return exits.success(JSON.stringify({
        ok  : 'notok',
        msg : 'no such regression'
      }));
    }
    else{
      for(let g=0;g<oneregressiongroups.length;g++){
        //--------------------------------
        //One group in this regression : start
        //--------------------------------
        let testlist    = [];
        let passlist    = [];
        let faillist    = [];
        let unknownlist = [];
        let runninglist = [];
        let lists = [
          'testlist',
          'passlist',  
          'faillist',
          'unknownlist',
          'runninglist'
        ];
        let W=JSON.parse(JSON.stringify(W0));
        if(oneregressiongroups[g].groupname == 'all'){
        }
        else{
          W.groupname = oneregressiongroups[g].groupname
        }
        let WW = JSON.parse(JSON.stringify(W));
        for(let l=0;l<lists.length;l++){
          let A = [];
          if(lists[l] ==  'testlist'){
          }
          if(lists[l] ==  'passlist'){
            WW.result  = 'PASS';
          }
          if(lists[l] ==  'faillist'){
            WW.result  = 'FAIL';
          }
          if(lists[l] ==  'unknownlist'){
            WW.result  = 'UNKNOWN';
          }
          if(lists[l] ==  'runninglist'){
            WW.result  = 'RUNNING';
          }
          ////////////////////////////////
          //For 0001 start
          ////////////////////////////////
          if(inputs.projectname ==  'mi200'){
            R = await Regressiondetails0001.find({
              where : WW,
              sort  : 'testname ASC'
            });
          }
          ////////////////////////////////
          //For 0001 end
          ////////////////////////////////
          ////////////////////////////////
          //For 0002 start
          ////////////////////////////////
          if(inputs.projectname ==  'mero'){
            R = await Regressiondetails0002.find({
              where : WW,
              sort  : 'testname ASC'
            });
          }
          ////////////////////////////////
          //For 0002 end
          ////////////////////////////////
          ////////////////////////////////
          //For 0003 start
          ////////////////////////////////
          if(inputs.projectname ==  'rembrandt'){
            R = await Regressiondetails0003.find({
              where : WW,
              sort  : 'testname ASC'
            });
          }
          ////////////////////////////////
          //For 0003 end
          ////////////////////////////////
          ////////////////////////////////
          //For 0004 start
          ////////////////////////////////
          if(inputs.projectname ==  'floyd'){
            R = await Regressiondetails0004.find({
              where : WW,
              sort  : 'testname ASC'
            });
          }
          ////////////////////////////////
          //For 0004 end
          ////////////////////////////////
          for(let t=0;t<R.length;t++){
            A.push(R[t].testname); 
          }
          if(lists[l] ==  'testlist'){
            testlist    = A;
          }
          if(lists[l] ==  'passlist'){
            passlist    = A;
          }
          if(lists[l] ==  'faillist'){
            faillist    = A;
          }
          if(lists[l] ==  'unknownlist'){
            unknownlist = A;
          }
          if(lists[l] ==  'runninglist'){
            runninglist = A;
          }
        }
        let passrate = 0.00;
        let checkedtime = moment().format('YYYY-MM-DD HH:mm:ss');
        if(testlist.length == 0){
        }
        else{
          passrate  = passlist.length/testlist.length*100;
          passrate  = passrate.toFixed(2);
        }
        //--------------------------------
        //store into DB : start
        //--------------------------------
        let newdata = {
          testlist    : testlist.length,
          passlist    : passlist.length,
          faillist    : faillist.length,
          unknownlist : unknownlist.length,
          runninglist : runninglist.length,
          passrate    : passrate,
          checkedtime : checkedtime
        };
        ////////////////////////////////
        //For 0001 start
        ////////////////////////////////
        if(inputs.projectname ==  'mi200'){
          await Regressionsummary0001.update(W,newdata);
        }
        ////////////////////////////////
        //For 0001 end
        ////////////////////////////////
        ////////////////////////////////
        //For 0002 start
        ////////////////////////////////
        if(inputs.projectname ==  'mero'){
          await Regressionsummary0002.update(W,newdata);
        }
        ////////////////////////////////
        //For 0002 end
        ////////////////////////////////
        ////////////////////////////////
        //For 0003 start
        ////////////////////////////////
        if(inputs.projectname ==  'rembrandt'){
          await Regressionsummary0003.update(W,newdata);
        }
        ////////////////////////////////
        //For 0003 end
        ////////////////////////////////
        ////////////////////////////////
        //For 0004 start
        ////////////////////////////////
        if(inputs.projectname ==  'floyd'){
          await Regressionsummary0004.update(W,newdata);
        }
        ////////////////////////////////
        //For 0004 end
        ////////////////////////////////
        //--------------------------------
        //store into DB : end
        //--------------------------------

        //--------------------------------
        //One group in this regression : end
        //--------------------------------
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        msg : 'updated all at '+ moment().format('YYYY-MM-DD HH:mm:ss')
      }));
    }
  }
};
