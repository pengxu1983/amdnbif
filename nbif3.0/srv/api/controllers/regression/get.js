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
    variantname : {
      type  : 'string'
    },
    DVgroup     : {
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
    let regressions = [];
    //per day
    for(let d=0;d<15;d++){
      let date = moment().subtract(d,'days').format('YYYY-MM-DD');
      let groupnm;
      let variantnm;
      if(inputs.kind == 'Overall'){
        groupnm = 'all';
      }
      if(inputs.kind == 'Byfeature'){
        groupnm = inputs.groupname;
      }
      let R;
      let W = {
        projectname : inputs.projectname,
        groupname   : groupnm,
        kickoffdate : date
      };
      ///////////////////////////////////////
      //For 0001 start
      ///////////////////////////////////////
      if(inputs.projectname =='mi200'){
        R = await Regressionsummary0001.find(W);
      }
      ///////////////////////////////////////
      //For 0001 end
      ///////////////////////////////////////
      ///////////////////////////////////////
      //For 0002 start
      ///////////////////////////////////////
      if(inputs.projectname =='mero'){
        R = await Regressionsummary0002.find(W);
      }
      ///////////////////////////////////////
      //For 0002 end
      ///////////////////////////////////////
      ///////////////////////////////////////
      //For 0003 start
      ///////////////////////////////////////
      if(inputs.projectname =='rembrandt'){
        R = await Regressionsummary0003.find(W);
      }
      ///////////////////////////////////////
      //For 0003 end
      ///////////////////////////////////////
      ///////////////////////////////////////
      //For 0004 start
      ///////////////////////////////////////
      if(inputs.projectname =='floyd'){
        R = await Regressionsummary0004.find(W);
      }
      ///////////////////////////////////////
      //For 0004 end
      ///////////////////////////////////////
      if(R.length == 0){
        continue;
        //ignore
      }
      else{
        for(let r=0;r<R.length;r++){
          regressions.push({
            projectname : R[r].projectname,
            variantname : R[r].variantname,
            alltestnum  : R[r].testlist,
            passnum     : R[r].passlist,
            failnum     : R[r].faillist,
            runningnum  : R[r].runninglist,
            unknownnum  : R[r].unknownlist,
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
      projectname : inputs.projectname,
      regressions : regressions
    }));
  }
};
