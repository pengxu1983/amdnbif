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
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/get');
    sails.log(inputs);
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
          for(let r=0;r<R.length;R++){
            let passlist = JSON.parse(R[r].passlist);
            let faillist = JSON.parse(R[r].faillist);
            let unknownlist = JSON.parse(R[r].unknownlist);
            regressions.push({
              projectname : R[r].projectname,
              variantname : R[r].variantname,
              passnum     : passlist.length,
              failnum     : faillist.length,
              unknownnum  : unknownlist.length,
              passrate    : R[r].passrate,
              changelist  : R[r].changelist,
              kickoffdate : R[r].kickoffdate
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
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'not valid kind'
    }));

  }


};
