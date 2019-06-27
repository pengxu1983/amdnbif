var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
let cron_do_summary = new cronJob('0 */30 * * * *',function(){
},null,false,'Asia/Chongqing');
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
    seed    : {
      type  : 'string'
    }
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
        seed        : inputs.seed
      });
      if(oneregressiongroups.length == 0){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'no such regression'
        }));
      }
      else{
        for(let g=0;g<oneregressiongroups.length;g++){//FIXME currently only one
          if(oneregressiongroups[g].groupname == 'all'){
            let testlist  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              isBACO      : inputs.isBACO,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              seed        : inputs.seed
            });
            let passlist  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              isBACO      : inputs.isBACO,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              seed        : inputs.seed,
              result      : 'PASS'
            });
            let faillist  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              isBACO      : inputs.isBACO,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              seed        : inputs.seed,
              result      : 'FAIL'
            });
            let unknownlist  = await Regressiondetails0001.find({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              isBACO      : inputs.isBACO,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              seed        : inputs.seed,
              result      : 'UNKNOWN'
            });
            let passrate = 0.00;
            let checkedtime = moment().format('YYYY-MM-DD HH:mm:ss');
            if(testlist.length == 0){
            }
            else{
              passrate  = passlist.length/testlist.length;
              passlist  = passlist.toFixed(2);
            }
            await Regressionsummary0001.update({
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              isBAPU      : inputs.isBAPU,
              isBACO      : inputs.isBACO,
              kickoffdate : inputs.kickoffdate,
              changelist  : inputs.changelist,
              shelve      : inputs.shelve,
              seed        : inputs.seed
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
          msg : 'updated all at '+ moment().format('YYYY-MM-DD HH:mm:ss')
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