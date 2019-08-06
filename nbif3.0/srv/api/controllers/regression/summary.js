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
    ///////////////////////////////////////
    //For 0001 mi200
    ///////////////////////////////////////
    if(inputs.projectname  ==  'mi200'){
      let oneregressiongroups = await Regressionsummary0001.find({
        projectname : inputs.projectname,
        variantname : inputs.variantname,
        isBAPU      : inputs.isBAPU,
        kickoffdate : inputs.kickoffdate,
        changelist  : inputs.changelist,
        shelve      : inputs.shelve,
      });
      if(oneregressiongroups.length == 0){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'no such regression'
        }));
      }
      else{
        for(let g=0;g<oneregressiongroups.length;g++){
          if(oneregressiongroups[g].groupname == 'all'){
            let R  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              //groupname   : 'all'
            });
            let testlist  = [];
            for(let i=0;i<R.length;i++){
              testlist.push(R[i].testname);
              testlist.sort();
            }
            R  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'PASS',
              //groupname   : 'all'
            });
            let passlist = [];
            for(let i=0;i<R.length;i++){
              passlist.push(R[i].testname);
              passlist.sort();
            }
            R  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'FAIL',
              //groupname   : 'all'
            });
            let faillist = [];
            for(let i=0;i<R.length;i++){
              faillist.push(R[i].testname);
              faillist.sort();
            }
            R  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'UNKNOWN',
              //groupname   : 'all'
            });
            let unknownlist = [];
            for(let i=0;i<R.length;i++){
              unknownlist.push(R[i].testname);
              unknownlist.sort();
            }
            R  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'RUNNING',
              //groupname   : 'all'
            });
            let runninglist = [];
            for(let i=0;i<R.length;i++){
              runninglist.push(R[i].testname);
              runninglist.sort();
            }
            let passrate = 0.00;
            let checkedtime = moment().format('YYYY-MM-DD HH:mm:ss');
            if(testlist.length == 0){
            }
            else{
              passrate  = passlist.length/testlist.length*100;
              passrate  = passrate.toFixed(2);
            }

            await Regressionsummary0001.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : 'all'
            },{
              testlist  : JSON.stringify(testlist),
              //passlist  : JSON.stringify(passlist),
              //faillist  : JSON.stringify(faillist),
              //unknownlist : JSON.stringify(unknownlist),
              //runninglist : JSON.stringify(runninglist),
              //passrate  : passrate,
              //checkedtime : checkedtime
            });
            await Regressionsummary0001.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : 'all'
            },{
              //testlist  : JSON.stringify(testlist),
              passlist  : JSON.stringify(passlist),
              //faillist  : JSON.stringify(faillist),
              //unknownlist : JSON.stringify(unknownlist),
              //runninglist : JSON.stringify(runninglist),
              //passrate  : passrate,
              //checkedtime : checkedtime
            });
            await Regressionsummary0001.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : 'all'
            },{
              //testlist  : JSON.stringify(testlist),
              //passlist  : JSON.stringify(passlist),
              faillist  : JSON.stringify(faillist),
              //unknownlist : JSON.stringify(unknownlist),
              //runninglist : JSON.stringify(runninglist),
              //passrate  : passrate,
              //checkedtime : checkedtime
            });
            await Regressionsummary0001.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : 'all'
            },{
              //testlist  : JSON.stringify(testlist),
              //passlist  : JSON.stringify(passlist),
              //faillist  : JSON.stringify(faillist),
              unknownlist : JSON.stringify(unknownlist),
              //runninglist : JSON.stringify(runninglist),
              //passrate  : passrate,
              //checkedtime : checkedtime
            });
            await Regressionsummary0001.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : 'all'
            },{
              //testlist  : JSON.stringify(testlist),
              //passlist  : JSON.stringify(passlist),
              //faillist  : JSON.stringify(faillist),
              //unknownlist : JSON.stringify(unknownlist),
              runninglist : JSON.stringify(runninglist),
              passrate  : passrate,
              checkedtime : checkedtime
            });
          }
          else{
            let R  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : oneregressiongroups[g].groupname
            });
            let testlist = [];
            for(let i=0;i<R.length;i++){
              testlist.push(R[i].testname);
              testlist.sort();
            }
            R  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'PASS',
              groupname   : oneregressiongroups[g].groupname
            });
            let passlist  = [];
            for(let i=0;i<R.length;i++){
              passlist.push(R[i].testname);
              passlist.sort();
            }
            R  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'FAIL',
              groupname   : oneregressiongroups[g].groupname
            });
            let faillist  = [];
            for(let i=0;i<R.length;i++){
              faillist.push(R[i].testname);
              faillist.sort();
            }
            R  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'UNKNOWN',
              groupname   : oneregressiongroups[g].groupname
            });
            let unknownlist= [];
            for(let i=0;i<R.length;i++){
              unknownlist.push(R[i].testname);
              unknownlist.sort();
            }
            R  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'RUNNING',
              groupname   : oneregressiongroups[g].groupname
            });
            let runninglist= [];
            for(let i=0;i<R.length;i++){
              runninglist.push(R[i].testname);
              runninglist.sort();
            }
            let passrate = 0.00;
            let checkedtime = moment().format('YYYY-MM-DD HH:mm:ss');
            if(testlist.length == 0){
            }
            else{
              passrate  = passlist.length/testlist.length*100;
              passrate  = passrate.toFixed(2);
            }

            await Regressionsummary0001.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : oneregressiongroups[g].groupname
            },{
              testlist  : JSON.stringify(testlist),
              //passlist  : JSON.stringify(passlist),
              //faillist  : JSON.stringify(faillist),
              //runninglist : JSON.stringify(runninglist),
              //unknownlist : JSON.stringify(unknownlist),
              //passrate  : passrate,
              //checkedtime : checkedtime
            });
            await Regressionsummary0001.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : oneregressiongroups[g].groupname
            },{
              //testlist  : JSON.stringify(testlist),
              passlist  : JSON.stringify(passlist),
              //faillist  : JSON.stringify(faillist),
              //runninglist : JSON.stringify(runninglist),
              //unknownlist : JSON.stringify(unknownlist),
              //passrate  : passrate,
              //checkedtime : checkedtime
            });
            await Regressionsummary0001.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : oneregressiongroups[g].groupname
            },{
              //testlist  : JSON.stringify(testlist),
              //passlist  : JSON.stringify(passlist),
              faillist  : JSON.stringify(faillist),
              //runninglist : JSON.stringify(runninglist),
              //unknownlist : JSON.stringify(unknownlist),
              //passrate  : passrate,
              //checkedtime : checkedtime
            });
            await Regressionsummary0001.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : oneregressiongroups[g].groupname
            },{
              //testlist  : JSON.stringify(testlist),
              //passlist  : JSON.stringify(passlist),
              //faillist  : JSON.stringify(faillist),
              runninglist : JSON.stringify(runninglist),
              //unknownlist : JSON.stringify(unknownlist),
              //passrate  : passrate,
              //checkedtime : checkedtime
            });
            await Regressionsummary0001.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : oneregressiongroups[g].groupname
            },{
              //testlist  : JSON.stringify(testlist),
              //passlist  : JSON.stringify(passlist),
              //faillist  : JSON.stringify(faillist),
              //runninglist : JSON.stringify(runninglist),
              unknownlist : JSON.stringify(unknownlist),
              passrate  : passrate,
              checkedtime : checkedtime
            });
            /////////////////////////////////////
            //Groups target update
            /////////////////////////////////////
            R = await Groups.findOne({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              groupname   : oneregressiongroups[g].groupname
            });
            let DVgroup = R.DVgroup;
            R = await Regressiontarget.findOne({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              groupname   : oneregressiongroups[g].groupname,
              targetdate  : moment().day(1+7).format('YYYY-MM-DD'),
            });
            if(R){
              if(R.target){
                await Regressiontarget.update({
                  projectname : inputs.projectname,
                  variantname : inputs.variantname,
                  isBAPU      : inputs.isBAPU,
                  groupname   : oneregressiongroups[g].groupname,
                  targetdate  : moment().day(1+7).format('YYYY-MM-DD'),
                },{
                  DVgroup     : DVgroup,
                  actpassrate : passrate,
                });
              }
              else{
                //TODO
                await Regressiontarget.update({
                  projectname : inputs.projectname,
                  variantname : inputs.variantname,
                  isBAPU      : inputs.isBAPU,
                  groupname   : oneregressiongroups[g].groupname,
                  targetdate  : moment().day(1+7).format('YYYY-MM-DD'),
                },{
                  DVgroup     : DVgroup,
                  actpassrate : passrate,
                  target      : 95.00
                });
              }
            }
            else{
              await Regressiontarget.create({
                projectname : inputs.projectname,
                variantname : inputs.variantname,
                isBAPU      : inputs.isBAPU,
                groupname   : oneregressiongroups[g].groupname,
                targetdate  : moment().day(1+7).format('YYYY-MM-DD'),
                DVgroup     : DVgroup,
                actpassrate : passrate,
                target      : 95.00
              });
            }
            ////////////////////////////////
            ////////////////////////////////
            ////////////////////////////////
            ////////////////////////////////
            ////////////////////////////////
          }
        }
        return exits.success(JSON.stringify({
          ok  : 'ok',
          msg : 'updated all at '+ moment().format('YYYY-MM-DD HH:mm:ss')
        }));
      }
    }
    ///////////////////////////////////////
    //For 0002 mero
    ///////////////////////////////////////
    if(inputs.projectname  ==  'mero'){
      let oneregressiongroups = await Regressionsummary0002.find({
        projectname : inputs.projectname,
        variantname : inputs.variantname,
        isBAPU      : inputs.isBAPU,
        kickoffdate : inputs.kickoffdate,
        changelist  : inputs.changelist,
        shelve      : inputs.shelve,
      });
      if(oneregressiongroups.length == 0){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'no such regression'
        }));
      }
      else{
        for(let g=0;g<oneregressiongroups.length;g++){
          if(oneregressiongroups[g].groupname == 'all'){
            let R  = await Regressiondetails0002.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              //groupname   : 'all'
            });
            let testlist  = [];
            for(let i=0;i<R.length;i++){
              testlist.push(R[i].testname);
              testlist.sort();
            }
            R  = await Regressiondetails0002.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'PASS',
              //groupname   : 'all'
            });
            let passlist = [];
            for(let i=0;i<R.length;i++){
              passlist.push(R[i].testname);
              passlist.sort();
            }
            R  = await Regressiondetails0002.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'FAIL',
              //groupname   : 'all'
            });
            let faillist = [];
            for(let i=0;i<R.length;i++){
              faillist.push(R[i].testname);
              faillist.sort();
            }
            R  = await Regressiondetails0002.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'UNKNOWN',
              //groupname   : 'all'
            });
            let unknownlist = [];
            for(let i=0;i<R.length;i++){
              unknownlist.push(R[i].testname);
              unknownlist.sort();
            }
            R  = await Regressiondetails0002.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'RUNNING',
              //groupname   : 'all'
            });
            let runninglist = [];
            for(let i=0;i<R.length;i++){
              runninglist.push(R[i].testname);
              runninglist.sort();
            }
            let passrate = 0.00;
            let checkedtime = moment().format('YYYY-MM-DD HH:mm:ss');
            if(testlist.length == 0){
            }
            else{
              passrate  = passlist.length/testlist.length*100;
              passrate  = passrate.toFixed(2);
            }

            await Regressionsummary0002.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : 'all'
            },{
              testlist  : JSON.stringify(testlist),
              //passlist  : JSON.stringify(passlist),
              //faillist  : JSON.stringify(faillist),
              //unknownlist : JSON.stringify(unknownlist),
              //runninglist : JSON.stringify(runninglist),
              //passrate  : passrate,
              //checkedtime : checkedtime
            });
            await Regressionsummary0002.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : 'all'
            },{
              //testlist  : JSON.stringify(testlist),
              passlist  : JSON.stringify(passlist),
              //faillist  : JSON.stringify(faillist),
              //unknownlist : JSON.stringify(unknownlist),
              //runninglist : JSON.stringify(runninglist),
              //passrate  : passrate,
              //checkedtime : checkedtime
            });
            await Regressionsummary0002.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : 'all'
            },{
              //testlist  : JSON.stringify(testlist),
              //passlist  : JSON.stringify(passlist),
              faillist  : JSON.stringify(faillist),
              //unknownlist : JSON.stringify(unknownlist),
              //runninglist : JSON.stringify(runninglist),
              //passrate  : passrate,
              //checkedtime : checkedtime
            });
            await Regressionsummary0002.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : 'all'
            },{
              //testlist  : JSON.stringify(testlist),
              //passlist  : JSON.stringify(passlist),
              //faillist  : JSON.stringify(faillist),
              unknownlist : JSON.stringify(unknownlist),
              //runninglist : JSON.stringify(runninglist),
              //passrate  : passrate,
              //checkedtime : checkedtime
            });
            await Regressionsummary0002.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : 'all'
            },{
              //testlist  : JSON.stringify(testlist),
              //passlist  : JSON.stringify(passlist),
              //faillist  : JSON.stringify(faillist),
              //unknownlist : JSON.stringify(unknownlist),
              runninglist : JSON.stringify(runninglist),
              passrate  : passrate,
              checkedtime : checkedtime
            });
          }
          else{
            let R  = await Regressiondetails0002.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : oneregressiongroups[g].groupname
            });
            let testlist = [];
            for(let i=0;i<R.length;i++){
              testlist.push(R[i].testname);
              testlist.sort();
            }
            R  = await Regressiondetails0002.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'PASS',
              groupname   : oneregressiongroups[g].groupname
            });
            let passlist  = [];
            for(let i=0;i<R.length;i++){
              passlist.push(R[i].testname);
              passlist.sort();
            }
            R  = await Regressiondetails0002.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'FAIL',
              groupname   : oneregressiongroups[g].groupname
            });
            let faillist  = [];
            for(let i=0;i<R.length;i++){
              faillist.push(R[i].testname);
              faillist.sort();
            }
            R  = await Regressiondetails0002.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'UNKNOWN',
              groupname   : oneregressiongroups[g].groupname
            });
            let unknownlist= [];
            for(let i=0;i<R.length;i++){
              unknownlist.push(R[i].testname);
              unknownlist.sort();
            }
            R  = await Regressiondetails0002.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'RUNNING',
              groupname   : oneregressiongroups[g].groupname
            });
            let runninglist= [];
            for(let i=0;i<R.length;i++){
              runninglist.push(R[i].testname);
              runninglist.sort();
            }
            let passrate = 0.00;
            let checkedtime = moment().format('YYYY-MM-DD HH:mm:ss');
            if(testlist.length == 0){
            }
            else{
              passrate  = passlist.length/testlist.length*100;
              passrate  = passrate.toFixed(2);
            }

            await Regressionsummary0002.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : oneregressiongroups[g].groupname
            },{
              testlist  : JSON.stringify(testlist),
              //passlist  : JSON.stringify(passlist),
              //faillist  : JSON.stringify(faillist),
              //runninglist : JSON.stringify(runninglist),
              //unknownlist : JSON.stringify(unknownlist),
              //passrate  : passrate,
              //checkedtime : checkedtime
            });
            await Regressionsummary0002.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : oneregressiongroups[g].groupname
            },{
              //testlist  : JSON.stringify(testlist),
              passlist  : JSON.stringify(passlist),
              //faillist  : JSON.stringify(faillist),
              //runninglist : JSON.stringify(runninglist),
              //unknownlist : JSON.stringify(unknownlist),
              //passrate  : passrate,
              //checkedtime : checkedtime
            });
            await Regressionsummary0002.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : oneregressiongroups[g].groupname
            },{
              //testlist  : JSON.stringify(testlist),
              //passlist  : JSON.stringify(passlist),
              faillist  : JSON.stringify(faillist),
              //runninglist : JSON.stringify(runninglist),
              //unknownlist : JSON.stringify(unknownlist),
              //passrate  : passrate,
              //checkedtime : checkedtime
            });
            await Regressionsummary0002.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : oneregressiongroups[g].groupname
            },{
              //testlist  : JSON.stringify(testlist),
              //passlist  : JSON.stringify(passlist),
              //faillist  : JSON.stringify(faillist),
              runninglist : JSON.stringify(runninglist),
              //unknownlist : JSON.stringify(unknownlist),
              //passrate  : passrate,
              //checkedtime : checkedtime
            });
            await Regressionsummary0002.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : oneregressiongroups[g].groupname
            },{
              //testlist  : JSON.stringify(testlist),
              //passlist  : JSON.stringify(passlist),
              //faillist  : JSON.stringify(faillist),
              //runninglist : JSON.stringify(runninglist),
              unknownlist : JSON.stringify(unknownlist),
              passrate  : passrate,
              checkedtime : checkedtime
            });
            /////////////////////////////////////
            //Groups target update
            /////////////////////////////////////
            R = await Groups.findOne({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              groupname   : oneregressiongroups[g].groupname
            });
            let DVgroup = R.DVgroup;
            R = await Regressiontarget.findOne({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              groupname   : oneregressiongroups[g].groupname,
              targetdate  : moment().day(1+7).format('YYYY-MM-DD'),
            });
            if(R){
              if(R.target){
                await Regressiontarget.update({
                  projectname : inputs.projectname,
                  variantname : inputs.variantname,
                  isBAPU      : inputs.isBAPU,
                  groupname   : oneregressiongroups[g].groupname,
                  targetdate  : moment().day(1+7).format('YYYY-MM-DD'),
                },{
                  DVgroup     : DVgroup,
                  actpassrate : passrate,
                });
              }
              else{
                //TODO
                await Regressiontarget.update({
                  projectname : inputs.projectname,
                  variantname : inputs.variantname,
                  isBAPU      : inputs.isBAPU,
                  groupname   : oneregressiongroups[g].groupname,
                  targetdate  : moment().day(1+7).format('YYYY-MM-DD'),
                },{
                  DVgroup     : DVgroup,
                  actpassrate : passrate,
                  target      : 95.00
                });
              }
            }
            else{
              await Regressiontarget.create({
                projectname : inputs.projectname,
                variantname : inputs.variantname,
                isBAPU      : inputs.isBAPU,
                groupname   : oneregressiongroups[g].groupname,
                targetdate  : moment().day(1+7).format('YYYY-MM-DD'),
                DVgroup     : DVgroup,
                actpassrate : passrate,
                target      : 95.00
              });
            }
            ////////////////////////////////
            ////////////////////////////////
            ////////////////////////////////
            ////////////////////////////////
            ////////////////////////////////
          }
        }
        return exits.success(JSON.stringify({
          ok  : 'ok',
          msg : 'updated all at '+ moment().format('YYYY-MM-DD HH:mm:ss')
        }));
      }
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
