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
    isBAPU  : {
      type  : 'string'
    },
    groupname : {
      type  : 'string'
    },
    result    : {
      type  : 'string'
    },
    kickoffdate : {
      type  : 'string'
    },
    testnamesrch  : {
      type  : 'string'
    },
    sigsrch     : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/testdetails');
    sails.log(inputs);
    if(inputs.kind  ==  'testdetails'){
      ///////////////////////////////////////
      //For 0001
      ///////////////////////////////////////
      if(inputs.projectname =='mi200'){
        if(inputs.groupname == 'all'){
          let W = {
            projectname : inputs.projectname,
            variantname : inputs.variantname,
            isBAPU      : inputs.isBAPU,
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
          // search param
          if(inputs.testnamesrch  == ''){
          }
          else{
            W.testname  = {
              contains  : inputs.testnamesrch
            };
          }
          if(inputs.sigsrch ==  ''){
          }
          else{
            W.signature = {
              contains  : inputs.sigsrch
            };
          }
          // search param
          let R = await Regressiondetails0001.find({
            where : W,
            sort  : 'signature ASC'
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
          // search param
          if(inputs.testnamesrch  == ''){
          }
          else{
            W.testname  = {
              contains  : inputs.testnamesrch
            };
          }
          if(inputs.sigsrch ==  ''){
          }
          else{
            W.signature = {
              contains  : inputs.sigsrch
            };
          }
          // search param
          let R = await Regressiondetails0001.find({
            where : W,
            sort  : 'signature  ASC'
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
      ///////////////////////////////////////
      //For 0002 
      ///////////////////////////////////////
      else if(inputs.projectname =='mero'){
        if(inputs.groupname == 'all'){
          let W = {
            projectname : inputs.projectname,
            variantname : inputs.variantname,
            isBAPU      : inputs.isBAPU,
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
          // search param
          if(inputs.testnamesrch  == ''){
          }
          else{
            W.testname  = {
              contains  : inputs.testnamesrch
            };
          }
          if(inputs.sigsrch ==  ''){
          }
          else{
            W.signature = {
              contains  : inputs.sigsrch
            };
          }
          // search param
          let R = await Regressiondetails0002.find({
            where : W,
            sort  : 'signature ASC'
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
          // search param
          if(inputs.testnamesrch  == ''){
          }
          else{
            W.testname  = {
              contains  : inputs.testnamesrch
            };
          }
          if(inputs.sigsrch ==  ''){
          }
          else{
            W.signature = {
              contains  : inputs.sigsrch
            };
          }
          // search param
          let R = await Regressiondetails0002.find({
            where : W,
            sort  : 'signature  ASC'
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
      ///////////////////////////////////////
      //For 0003 
      ///////////////////////////////////////
      else if(inputs.projectname =='rembrandt'){
        if(inputs.groupname == 'all'){
          let W = {
            projectname : inputs.projectname,
            variantname : inputs.variantname,
            isBAPU      : inputs.isBAPU,
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
          // search param
          if(inputs.testnamesrch  == ''){
          }
          else{
            W.testname  = {
              contains  : inputs.testnamesrch
            };
          }
          if(inputs.sigsrch ==  ''){
          }
          else{
            W.signature = {
              contains  : inputs.sigsrch
            };
          }
          // search param
          let R = await Regressiondetails0003.find({
            where : W,
            sort  : 'signature ASC'
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
          // search param
          if(inputs.testnamesrch  == ''){
          }
          else{
            W.testname  = {
              contains  : inputs.testnamesrch
            };
          }
          if(inputs.sigsrch ==  ''){
          }
          else{
            W.signature = {
              contains  : inputs.sigsrch
            };
          }
          // search param
          let R = await Regressiondetails0003.find({
            where : W,
            sort  : 'signature  ASC'
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
      ///////////////////////////////////////
      //For 0004 
      ///////////////////////////////////////
      else if(inputs.projectname =='floyd'){
        if(inputs.groupname == 'all'){
          let W = {
            projectname : inputs.projectname,
            variantname : inputs.variantname,
            isBAPU      : inputs.isBAPU,
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
          // search param
          if(inputs.testnamesrch  == ''){
          }
          else{
            W.testname  = {
              contains  : inputs.testnamesrch
            };
          }
          if(inputs.sigsrch ==  ''){
          }
          else{
            W.signature = {
              contains  : inputs.sigsrch
            };
          }
          // search param
          let R = await Regressiondetails0004.find({
            where : W,
            sort  : 'signature ASC'
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
          // search param
          if(inputs.testnamesrch  == ''){
          }
          else{
            W.testname  = {
              contains  : inputs.testnamesrch
            };
          }
          if(inputs.sigsrch ==  ''){
          }
          else{
            W.signature = {
              contains  : inputs.sigsrch
            };
          }
          // search param
          let R = await Regressiondetails0004.find({
            where : W,
            sort  : 'signature  ASC'
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
