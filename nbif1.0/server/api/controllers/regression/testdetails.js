var moment  = require('moment');
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
    let checkingdate = inputs.kickoffdate;
    if(inputs.kind == 'testdetails'){
      let R = await Teststatusvariant01_summary.findOne({
        mode        : inputs.mode,
        kickoffdate : checkingdate,
        variantname : inputs.variantname,
        projectname : inputs.projectname,
        testplanname: inputs.testplanname//TODO if need project name
      });
      if(R){
      }
      else{
        checkingdate  = moment(inputs.kickoffdate).subtract(1,'days').format('YYYY-MM-DD')
        R = await Teststatusvariant01_summary.findOne({
          mode        : inputs.mode,
          kickoffdate : checkingdate,
          variantname : inputs.variantname,
          projectname : inputs.projectname,
          testplanname: inputs.testplanname
        });
      }
      if(R){
        let testlist = JSON.parse(R.testlist);
        for(let t=0;t<testlist.length;t++){
          if(inputs.variantname == 'nbif_al_gpu'){
            let onetest = await Teststatusvariant01.findOne({
              testname  : testlist[t],
              kickoffdate : checkingdate,
              projectname : inputs.projectname,
              variantname : inputs.variantname
            });
            //let R = JSON.parse(onetest.resultbyday);
            //let RR = R[inputs.kickoffdate];
            sails.log('test name is ');
            sails.log(testlist[t]);
            if(onetest){
              testdetails.push({
                testname    : testlist[t],
                seed        : onetest.seed,
                changelist  : onetest.changelist,
                result      : onetest.result,
                signature   : onetest.signature,
                suite       : onetest.suite
              });
            }
            else{
              testdetails.push({
                testname    : testlist[t],
                seed        : 'NA',
                changelist  : 'NA',
                result      : 'UNKNOWN',
                signature   : 'NA',
                suite       : 'NA'
              });
            }
          }
        }
        return exits.success(JSON.stringify({
          ok  : 'ok',
          testdetails : JSON.stringify(testdetails)
        }));
      }
      else{
        return exits.success(JSON.stringify({
          ok  : 'notok'
        }));
      }
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
