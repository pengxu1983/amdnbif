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
        let R = await Regressionsummary0001.find({
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
            let unknownlist = JSON.parse(R[r].unknownlist);
            regressions.push({
              projectname : R[r].projectname,
              variantname : R[r].variantname,
              alltestnum  : testlist.length,
              passnum     : passlist.length,
              failnum     : faillist.length,
              unknownnum  : unknownlist.length,
              isBAPU      : R[r].isBAPU,
              isBACO      : R[r].isBACO,
              passrate    : R[r].passrate,
              changelist  : R[r].changelist,
              kickoffdate : R[r].kickoffdate,
              shelve      : R[r].shelve
            });
          }
          sails.log(regressions);
          return exits.success(JSON.stringify({
            ok  : 'ok',
            projectname : 'mi200',
            regressions : regressions
          }));
        }
      }
      else if(inputs.kind ==  'Bygrp'){
        let R = await Regressionsummary0001.find({
          projectname : inputs.projectname,
          groupname   : inputs.groupname
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
            let unknownlist = JSON.parse(R[r].unknownlist);
            regressions.push({
              projectname : R[r].projectname,
              variantname : R[r].variantname,
              alltestnum  : testlist.length,
              passnum     : passlist.length,
              failnum     : faillist.length,
              unknownnum  : unknownlist.length,
              isBAPU      : R[r].isBAPU,
              isBACO      : R[r].isBACO,
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
    //For 0002 for mero
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
            let unknownlist = JSON.parse(R[r].unknownlist);
            regressions.push({
              projectname : R[r].projectname,
              variantname : R[r].variantname,
              alltestnum  : testlist.length,
              passnum     : passlist.length,
              failnum     : faillist.length,
              unknownnum  : unknownlist.length,
              isBAPU      : R[r].isBAPU,
              isBACO      : R[r].isBACO,
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
          groupname   : inputs.groupname
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
            let unknownlist = JSON.parse(R[r].unknownlist);
            regressions.push({
              projectname : R[r].projectname,
              variantname : R[r].variantname,
              alltestnum  : testlist.length,
              passnum     : passlist.length,
              failnum     : faillist.length,
              unknownnum  : unknownlist.length,
              isBAPU      : R[r].isBAPU,
              isBACO      : R[r].isBACO,
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
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'not valid kind'
    }));

  }


};
