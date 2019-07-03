module.exports = {


  friendlyName: 'Testdetails',


  description: 'Testdetails regression.',


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
    changelist  : {
      type  : 'string'
    },
    isBACO  : {
      type  : 'string'
    },
    isBAPU  : {
      type  : 'string'
    },
    groupname : {
      type  : 'string'
    },
    result    : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/testdetails');
    sails.log(inputs);
    if(inputs.kind  ==  'testdetails'){
      if(inputs.projectname =='mi200'){
        if(inputs.groupname == 'all'){
          let W = {
            projectname : inputs.projectname,
            variantname : inputs.variantname,
            isBAPU      : inputs.isBAPU,
            isBACO      : inputs.isBACO,
            changelist  : inputs.changelist,
            kickoffdate : inputs.kickoffdate,
            shelve      : inputs.shelve,
            //result      : inputs.result,
            //groupname   : groupname 
          };
          if(inputs.result == 'ALL'){
          }
          else{
            W.result  = inputs.result;
          }
          let R = await Regressiondetails0001.find({
            where : W,
            sort  : 'testname ASC'
          });
          let testdetails = [];
          for(let r=0;r<R.length;r++){
            testdetails.push({
              testname  : R[r].testname,
              seed      : R[r].seed,
              signature : R[r].signature
            })
          }
          return exits.success(JSON.stringify({
            ok  : 'ok',
            testdetails : testdetails
          }));
        }
        else{
          let W = {
            projectname : inputs.projectname,
            variantname : inputs.variantname,
            isBAPU      : inputs.isBAPU,
            isBACO      : inputs.isBACO,
            changelist  : inputs.changelist,
            kickoffdate : inputs.kickoffdate,
            shelve      : inputs.shelve,
            //result      : inputs.result,
            groupname   : inputs.groupname 
          };
          if(inputs.result == 'ALL'){
          }
          else{
            W.result  = inputs.result;
          }
          let R = await Regressiondetails0001.find({
            where : W,
            sort  : 'testname ASC'
          });
          let testdetails = [];
          for(let r=0;r<R.length;r++){
            testdetails.push({
              testname  : R[r].testname,
              seed      : R[r].seed,
              signature : R[r].signature
            })
          }
          return exits.success(JSON.stringify({
            ok  : 'ok',
            testdetails : testdetails
          }));
        }
      }
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
