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
    let W0 = {
      projectname : inputs.projectname,
      variantname : inputs.variantname,
      isBAPU      : inputs.isBAPU,
      kickoffdate : inputs.kickoffdate,
      changelist  : inputs.changelist,
      shelve      : inputs.shelve,
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
        let lists = [
          'testlist',
          'passlist',  
          'faillist',
          'unknownlist',
          'runninglist'
        ];
        //Get all groupname under this DVgroup
        let R = await Groups.find({
          projectname : inputs.projectname,
          variantname : inputs.variantname,
          isBAPU      : inputs.isBAPU,
          DVgroup     : alldvgroups[g]
        });
        sails.log('all groups');
        sails.log(R);
        for(let r=0;r<R.length;r++){
          //one groupname
          let R1 = await Regressiondvgroup0001.findOne({
            projectname : inputs.projectname,
            variantname : inputs.variantname,
            isBAPU      : inputs.isBAPU,
            kickoffdate : inputs.kickoffdate,
            changelist  : inputs.changelist,
            shelve      : inputs.shelve,
          });
          testlist    +=  Number(R1.testlist);
          passlist    +=  Number(R1.passlist);
          faillist    +=  Number(R1.faillist);
          unknownlist +=  Number(R1.unknownlist);
          runninglist +=  Number(R1.runninglist);
        }
      }
      let passrate = 0.00;
      passrate  = passlist/testlist*100;
      passrate  = passrate.toFixed(2);
      let checkedtime = moment().format('YYYY-MM-DD HH:mm:ss');
      sails.log('passrate');
      sails.log(passrate);
      return exits.success(JSON.stringify({
        ok  : 'ok',
        msg : 'updated all at '+ moment().format('YYYY-MM-DD HH:mm:ss')
      }));
    }
  }
};
