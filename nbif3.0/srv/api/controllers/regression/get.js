var moment        = require('moment');
module.exports = {


  friendlyName: 'Get',


  description: 'Get regression.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    groupname : {
      type  : 'string'
    },
    isBAPU    : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/get');
    sails.log(inputs);
    ///////////////////////////////////////
    //For 0001
    ///////////////////////////////////////
    if(inputs.projectname =='mi200'){
      if(inputs.kind  ==  'Overall'){
        let regressions = [];
        //per day
        for(let d=0;d<15;d++){
          let date = moment().subtract(d,'days').format('YYYY-MM-DD');
          let R = await Regressionsummary0001.find({
            projectname : inputs.projectname,
            groupname   : 'all',
            kickoffdate : date
          });
          if(R.length == 0){
            continue;
            //ignore
          }
          else{
            for(let r=0;r<R.length;r++){
              let passlist    = JSON.parse(R[r].passlist);
              let faillist    = JSON.parse(R[r].faillist);
              let testlist    = JSON.parse(R[r].testlist);
              let runninglist = JSON.parse(R[r].runninglist);
              let unknownlist = JSON.parse(R[r].unknownlist);
              regressions.unshift({
                projectname : R[r].projectname,
                variantname : R[r].variantname,
                alltestnum  : testlist.length,
                passnum     : passlist.length,
                failnum     : faillist.length,
                runningnum  : runninglist.length,
                unknownnum  : unknownlist.length,
                isBAPU      : R[r].isBAPU,
                passrate    : R[r].passrate,
                changelist  : R[r].changelist,
                kickoffdate : R[r].kickoffdate,
                shelve      : R[r].shelve
              });
            }
          }
        }
        return exits.success(JSON.stringify({
          ok          : 'ok',
          projectname : 'mi200',
          regressions : regressions
        }));
        //let R = await Regressionsummary0001.find({
        //  projectname : inputs.projectname,
        //  groupname   : 'all'
        //});
        //if(R.length == 0){
        //  return exits.success(JSON.stringify({
        //    ok  : 'notok',
        //    msg : 'no valid regression'
        //  }));
        //}
        //else{
        //  let regressions =[];
        //  for(let r=0;r<R.length;r++){
        //    let passlist = JSON.parse(R[r].passlist);
        //    let faillist = JSON.parse(R[r].faillist);
        //    let testlist = JSON.parse(R[r].testlist);
        //    let runninglist = JSON.parse(R[r].runninglist);
        //    let unknownlist = JSON.parse(R[r].unknownlist);
        //    regressions.unshift({
        //      projectname : R[r].projectname,
        //      variantname : R[r].variantname,
        //      alltestnum  : testlist.length,
        //      passnum     : passlist.length,
        //      failnum     : faillist.length,
        //      runningnum  : runninglist.length,
        //      unknownnum  : unknownlist.length,
        //      isBAPU      : R[r].isBAPU,
        //      passrate    : R[r].passrate,
        //      changelist  : R[r].changelist,
        //      kickoffdate : R[r].kickoffdate,
        //      shelve      : R[r].shelve
        //    });
        //  }
        //  sails.log(regressions);
        //  return exits.success(JSON.stringify({
        //    ok  : 'ok',
        //    projectname : 'mi200',
        //    regressions : regressions
        //  }));
        //}
      }
      else if(inputs.kind ==  'Bygrp'){
        let R = await Regressionsummary0001.find({
          projectname : inputs.projectname,
          groupname   : inputs.groupname,
          isBAPU      : inputs.isBAPU
        });
        if(R.length == 0){
          return exits.success(JSON.stringify({
            ok  : 'notok',
            msg : 'no valid regression'
          }));
        }
        else{
          let regressions =[];
          for(let r=0;r<R.length;r++){
            let passlist = JSON.parse(R[r].passlist);
            let faillist = JSON.parse(R[r].faillist);
            let testlist = JSON.parse(R[r].testlist);
            let runninglist = JSON.parse(R[r].runninglist);
            let unknownlist = JSON.parse(R[r].unknownlist);
            regressions.unshift({
              projectname : R[r].projectname,
              variantname : R[r].variantname,
              alltestnum  : testlist.length,
              passnum     : passlist.length,
              failnum     : faillist.length,
              runningnum  : runninglist.length,
              unknownnum  : unknownlist.length,
              isBAPU      : R[r].isBAPU,
              passrate    : R[r].passrate,
              changelist  : R[r].changelist,
              kickoffdate : R[r].kickoffdate,
              shelve      : R[r].shelve
            });
          }
          return exits.success(JSON.stringify({
            ok  : 'ok',
            projectname : 'mi200',
            regressions : regressions
          }));
        }
      }
    }
    ///////////////////////////////////////
    //For 0002
    ///////////////////////////////////////
    else if(inputs.projectname =='mero'){
      if(inputs.kind  ==  'Overall'){
        let R = await Regressionsummary0002.find({
          projectname : inputs.projectname,
          groupname   : 'all'
        });
        if(R.length == 0){
          return exits.success(JSON.stringify({
            ok  : 'notok',
            msg : 'no valid regression'
          }));
        }
        else{
          let regressions =[];
          for(let r=0;r<R.length;r++){
            let passlist = JSON.parse(R[r].passlist);
            let faillist = JSON.parse(R[r].faillist);
            let testlist = JSON.parse(R[r].testlist);
            let runninglist = JSON.parse(R[r].runninglist);
            let unknownlist = JSON.parse(R[r].unknownlist);
            regressions.unshift({
              projectname : R[r].projectname,
              variantname : R[r].variantname,
              alltestnum  : testlist.length,
              passnum     : passlist.length,
              failnum     : faillist.length,
              runningnum  : runninglist.length,
              unknownnum  : unknownlist.length,
              isBAPU      : R[r].isBAPU,
              passrate    : R[r].passrate,
              changelist  : R[r].changelist,
              kickoffdate : R[r].kickoffdate,
              shelve      : R[r].shelve
            });
          }
          sails.log(regressions);
          return exits.success(JSON.stringify({
            ok  : 'ok',
            projectname : 'mero',
            regressions : regressions
          }));
        }
      }
      else if(inputs.kind ==  'Bygrp'){
        let R = await Regressionsummary0002.find({
          projectname : inputs.projectname,
          groupname   : inputs.groupname,
          isBAPU      : inputs.isBAPU
        });
        if(R.length == 0){
          return exits.success(JSON.stringify({
            ok  : 'notok',
            msg : 'no valid regression'
          }));
        }
        else{
          let regressions =[];
          for(let r=0;r<R.length;r++){
            let passlist = JSON.parse(R[r].passlist);
            let faillist = JSON.parse(R[r].faillist);
            let testlist = JSON.parse(R[r].testlist);
            let runninglist = JSON.parse(R[r].runninglist);
            let unknownlist = JSON.parse(R[r].unknownlist);
            regressions.unshift({
              projectname : R[r].projectname,
              variantname : R[r].variantname,
              alltestnum  : testlist.length,
              passnum     : passlist.length,
              failnum     : faillist.length,
              runningnum  : runninglist.length,
              unknownnum  : unknownlist.length,
              isBAPU      : R[r].isBAPU,
              passrate    : R[r].passrate,
              changelist  : R[r].changelist,
              kickoffdate : R[r].kickoffdate,
              shelve      : R[r].shelve
            });
          }
          return exits.success(JSON.stringify({
            ok  : 'ok',
            projectname : 'mero',
            regressions : regressions
          }));
        }
      }
    }
    ///////////////////////////////////////
    //For 0003
    ///////////////////////////////////////
    else if(inputs.projectname =='rembrandt'){
      if(inputs.kind  ==  'Overall'){
        let R = await Regressionsummary0003.find({
          projectname : inputs.projectname,
          groupname   : 'all'
        });
        if(R.length == 0){
          return exits.success(JSON.stringify({
            ok  : 'notok',
            msg : 'no valid regression'
          }));
        }
        else{
          let regressions =[];
          for(let r=0;r<R.length;r++){
            let passlist = JSON.parse(R[r].passlist);
            let faillist = JSON.parse(R[r].faillist);
            let testlist = JSON.parse(R[r].testlist);
            let runninglist = JSON.parse(R[r].runninglist);
            let unknownlist = JSON.parse(R[r].unknownlist);
            regressions.unshift({
              projectname : R[r].projectname,
              variantname : R[r].variantname,
              alltestnum  : testlist.length,
              passnum     : passlist.length,
              failnum     : faillist.length,
              runningnum  : runninglist.length,
              unknownnum  : unknownlist.length,
              isBAPU      : R[r].isBAPU,
              passrate    : R[r].passrate,
              changelist  : R[r].changelist,
              kickoffdate : R[r].kickoffdate,
              shelve      : R[r].shelve
            });
          }
          sails.log(regressions);
          return exits.success(JSON.stringify({
            ok  : 'ok',
            projectname : 'rembrandt',
            regressions : regressions
          }));
        }
      }
      else if(inputs.kind ==  'Bygrp'){
        let R = await Regressionsummary0003.find({
          projectname : inputs.projectname,
          groupname   : inputs.groupname,
          isBAPU      : inputs.isBAPU
        });
        if(R.length == 0){
          return exits.success(JSON.stringify({
            ok  : 'notok',
            msg : 'no valid regression'
          }));
        }
        else{
          let regressions =[];
          for(let r=0;r<R.length;r++){
            let passlist = JSON.parse(R[r].passlist);
            let faillist = JSON.parse(R[r].faillist);
            let testlist = JSON.parse(R[r].testlist);
            let runninglist = JSON.parse(R[r].runninglist);
            let unknownlist = JSON.parse(R[r].unknownlist);
            regressions.unshift({
              projectname : R[r].projectname,
              variantname : R[r].variantname,
              alltestnum  : testlist.length,
              passnum     : passlist.length,
              failnum     : faillist.length,
              runningnum  : runninglist.length,
              unknownnum  : unknownlist.length,
              isBAPU      : R[r].isBAPU,
              passrate    : R[r].passrate,
              changelist  : R[r].changelist,
              kickoffdate : R[r].kickoffdate,
              shelve      : R[r].shelve
            });
          }
          return exits.success(JSON.stringify({
            ok  : 'ok',
            projectname : 'rembrandt',
            regressions : regressions
          }));
        }
      }
    }
    ///////////////////////////////////////
    //For 0004
    ///////////////////////////////////////
    else if(inputs.projectname =='floyd'){
      if(inputs.kind  ==  'Overall'){
        let R = await Regressionsummary0004.find({
          projectname : inputs.projectname,
          groupname   : 'all'
        });
        if(R.length == 0){
          return exits.success(JSON.stringify({
            ok  : 'notok',
            msg : 'no valid regression'
          }));
        }
        else{
          let regressions =[];
          for(let r=0;r<R.length;r++){
            let passlist = JSON.parse(R[r].passlist);
            let faillist = JSON.parse(R[r].faillist);
            let testlist = JSON.parse(R[r].testlist);
            let runninglist = JSON.parse(R[r].runninglist);
            let unknownlist = JSON.parse(R[r].unknownlist);
            regressions.unshift({
              projectname : R[r].projectname,
              variantname : R[r].variantname,
              alltestnum  : testlist.length,
              passnum     : passlist.length,
              failnum     : faillist.length,
              runningnum  : runninglist.length,
              unknownnum  : unknownlist.length,
              isBAPU      : R[r].isBAPU,
              passrate    : R[r].passrate,
              changelist  : R[r].changelist,
              kickoffdate : R[r].kickoffdate,
              shelve      : R[r].shelve
            });
          }
          sails.log(regressions);
          return exits.success(JSON.stringify({
            ok  : 'ok',
            projectname : 'floyd',
            regressions : regressions
          }));
        }
      }
      else if(inputs.kind ==  'Bygrp'){
        let R = await Regressionsummary0004.find({
          projectname : inputs.projectname,
          groupname   : inputs.groupname,
          isBAPU      : inputs.isBAPU
        });
        if(R.length == 0){
          return exits.success(JSON.stringify({
            ok  : 'notok',
            msg : 'no valid regression'
          }));
        }
        else{
          let regressions =[];
          for(let r=0;r<R.length;r++){
            let passlist = JSON.parse(R[r].passlist);
            let faillist = JSON.parse(R[r].faillist);
            let testlist = JSON.parse(R[r].testlist);
            let runninglist = JSON.parse(R[r].runninglist);
            let unknownlist = JSON.parse(R[r].unknownlist);
            regressions.unshift({
              projectname : R[r].projectname,
              variantname : R[r].variantname,
              alltestnum  : testlist.length,
              passnum     : passlist.length,
              failnum     : faillist.length,
              runningnum  : runninglist.length,
              unknownnum  : unknownlist.length,
              isBAPU      : R[r].isBAPU,
              passrate    : R[r].passrate,
              changelist  : R[r].changelist,
              kickoffdate : R[r].kickoffdate,
              shelve      : R[r].shelve
            });
          }
          return exits.success(JSON.stringify({
            ok  : 'ok',
            projectname : 'floyd',
            regressions : regressions
          }));
        }
      }
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'not valid kind'
    }));

  }


};
