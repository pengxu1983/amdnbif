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
    isBACO  : {
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
    if(inputs.projectname  ==  'mi200'){
      let oneregressiongroups = await Regressionsummary0001.find({
        projectname : inputs.projectname,
        variantname : inputs.variantname,
        isBAPU      : inputs.isBAPU,
        isBACO      : inputs.isBACO,
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
            let testlist  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              isBACO      : inputs.isBACO,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              //groupname   : 'all'
            });
            let passlist  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              isBACO      : inputs.isBACO,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'PASS',
              //groupname   : 'all'
            });
            let faillist  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              isBACO      : inputs.isBACO,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'FAIL',
              //groupname   : 'all'
            });
            let unknownlist  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              isBACO      : inputs.isBACO,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'UNKNOWN',
              //groupname   : 'all'
            });
            let passrate = 0.00;
            let checkedtime = moment().format('YYYY-MM-DD HH:mm:ss');
            if(testlist.length == 0){
            }
            else{
              passrate  = passlist.length/testlist.length;
              passrate  = passrate.toFixed(2);
            }

            await Regressionsummary0001.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              isBACO      : inputs.isBACO,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : 'all'
            },{
              testlist  : JSON.stringify(testlist),
              passlist  : JSON.stringify(passlist),
              faillist  : JSON.stringify(faillist),
              unknownlist : JSON.stringify(unknownlist),
              passrate  : passrate,
              checkedtime : checkedtime
            });
          }
          else{
            let testlist  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              isBACO      : inputs.isBACO,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : oneregressiongroups[g].groupname
            });
            let passlist  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              isBACO      : inputs.isBACO,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'PASS',
              groupname   : oneregressiongroups[g].groupname
            });
            let faillist  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              isBACO      : inputs.isBACO,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'FAIL',
              groupname   : oneregressiongroups[g].groupname
            });
            let unknownlist  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              isBACO      : inputs.isBACO,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              result      : 'UNKNOWN',
              groupname   : oneregressiongroups[g].groupname
            });
            let passrate = 0.00;
            let checkedtime = moment().format('YYYY-MM-DD HH:mm:ss');
            if(testlist.length == 0){
            }
            else{
              passrate  = passlist.length/testlist.length;
              passrate  = passrate.toFixed(2);
            }

            await Regressionsummary0001.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              isBACO      : inputs.isBACO,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              groupname   : oneregressiongroups[g].groupname
            },{
              testlist  : JSON.stringify(testlist),
              passlist  : JSON.stringify(passlist),
              faillist  : JSON.stringify(faillist),
              unknownlist : JSON.stringify(unknownlist),
              passrate  : passrate,
              checkedtime : checkedtime
            });
          }
        }
        return exits.success(JSON.stringify({
          ok  : 'ok',
          msg : 'updated ' + oneregressiongroups[g].groupname + ' at '+ moment().format('YYYY-MM-DD HH:mm:ss')
        }));
      }
      //testlist
      //passlist
      //faillist
      //unknownlist
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
