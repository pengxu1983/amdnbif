module.exports = {


  friendlyName: 'Testdetails',


  description: 'Testdetails regression.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    mode  : {
      type  : 'string'
    },
    testplanname  : {
      type  : 'string'
    },
    kickoffdate : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/testdetails');
    sails.log(inputs);
    let testdetails = [];
    if(inputs.kind == 'testdetails'){
      let R = await Teststatusvariant01_summary.findOne({
        mode        : inputs.mode,
        kickoffdate : inputs.kickoffdate,
        variantname : inputs.variantname,
        testplanname: inputs.testplanname//TODO if need project name
      });
      let testlist = JSON.parse(R.testlist);
      for(let t=0;t<testlist.length;t++){
        if(inputs.variantname == 'nbif_al_gpu'){
          let onetest = await Teststatusvariant01.findOne({
            testname  : testlist[t]
          });
          let R = JSON.parse(onetest.resultbyday);
          let RR = R[inputs.kickoffdate];
          testdetails.push({
            testname    : testlist[t],
            seed        : RR.seed,
            changelist  : RR.changelist,
            result      : RR.result,
            signature   : RR.signature,
            suite       : RR.suite
          });
        }
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        testdetails : JSON.stringify(testdetails)
      }));
    }
    else {
      return exits.success(JSON.stringify({
        ok  : 'notok'
      }));
    }
    // All done.
    //return;

  }


};
