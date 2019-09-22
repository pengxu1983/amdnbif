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
      let W1  = JSON.parse(JSON.stringify(W0));//dvgroupsummary
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
        let lists = [
          'testlist',
          'passlist',  
          'faillist',
          'unknownlist',
          'runninglist'
        ];
        W1.DVgroup      = alldvgroups[g];
        //Get all groupname under this DVgroup
        let R = await Groups.find(W1);
        sails.log('all groups');
        sails.log(R);
        let W2  = JSON.parse(JSON.stringify(W0));//summary
        W2.kickoffdate  = inputs.kickoffdate;
        W2.changelist   = inputs.changelist;
        W2.shelve       = inputs.shelve;
        for(let r=0;r<R.length;r++){
          W2.groupname    = R[r].groupname;
          sails.log('W2');
          sails.log(W2);


          let R1;
          ////////////////////////////////
          //For 0001 start
          ////////////////////////////////
          if(inputs.projectname ==  'mi200'){
            R1 = await Regressionsummary0001.findOne(W2);
          }
          ////////////////////////////////
          //For 0001 end
          ////////////////////////////////
          ////////////////////////////////
          //For 0002 start
          ////////////////////////////////
          if(inputs.projectname ==  'mero'){
            R1 = await Regressionsummary0002.findOne(W2);
          }
          ////////////////////////////////
          //For 0002 end
          ////////////////////////////////
          ////////////////////////////////
          //For 0003 start
          ////////////////////////////////
          if(inputs.projectname ==  'rembrandt'){
            R1 = await Regressionsummary0003.findOne(W2);
          }
          ////////////////////////////////
          //For 0003 end
          ////////////////////////////////
          ////////////////////////////////
          //For 0004 start
          ////////////////////////////////
          if(inputs.projectname ==  'floyd'){
            R1 = await Regressionsummary0004.findOne(W2);
          }
          ////////////////////////////////
          //For 0004 end
          ////////////////////////////////
          sails.log('R1');
          sails.log(R1);
          testlist    +=  Number(R1.testlist);
          passlist    +=  Number(R1.passlist);
          faillist    +=  Number(R1.faillist);
          unknownlist +=  Number(R1.unknownlist);
          runninglist +=  Number(R1.runninglist);
        }
        let passrate = 0.00;
        passrate  = passlist/testlist*100;
        passrate  = passrate.toFixed(2);
        let checkedtime = moment().format('YYYY-MM-DD HH:mm:ss');
        sails.log('passrate');
        sails.log(passrate);
        let W3 = JSON.parse(JSON.stringify(W0));
        W3.DVgroup  = alldvgroups[g];
        W3.kickoffdate  = inputs.kickoffdate;
        W3.changelist   = inputs.changelist;
        W3.shelve       = inputs.shelve;
        sails.log('W3');
        sails.log(W3);
        await Regressiondvgroup0001.destroy(W3);
        W3.testlist    = testlist   ;
        W3.passlist    = passlist   ;
        W3.faillist    = faillist   ;
        W3.unknownlist = unknownlist;
        W3.runninglist = runninglist;
        W3.passrate    = passrate   ;
        W3.checkedtime = checkedtime;
        await Regressiondvgroup0001.create(W3);
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
      }));
    }
  }
};
