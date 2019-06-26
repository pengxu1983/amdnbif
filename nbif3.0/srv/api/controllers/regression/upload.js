module.exports = {


  friendlyName: 'Upload',


  description: 'Upload regression.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    testResult  : {
      type  : 'string'
    },
    testlist  : {
      type  : 'string'
    },
    oneTestResult : {
      type  : 'string'
    },
    testname  : {
      type  : 'string'
    },
    oneRegression : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/upload');
    sails.log(inputs);
    //for one case
    if(inputs.kind  == 'onecase'){
      let oneTestResult = JSON.parse(inputs.oneTestResult);

      let kickoffdate   = oneTestResult.kickoffdate  ;
      let variantname   = oneTestResult.variantname  ;
      let changelist    = oneTestResult.changelist   ;
      let projectname   = oneTestResult.projectname  ;
      let testname      = oneTestResult.testname     ;
      let result        = oneTestResult.result       ;
      let seed          = oneTestResult.seed         ;
      let signature     = oneTestResult.signature    ;
      let suite         = oneTestResult.suite        ;
      let shelve        = oneTestResult.shelve       ;
      let isBAPU        = oneTestResult.isBAPU       ;
      let isBACO        = oneTestResult.isBACO       ;

      let oneTestResultDB;
      if(oneTestResult['projectname']=='mi200'){
        oneTestResultDB = await Regressiondetails0001.findOne({////MODIFY
          kickoffdate   : kickoffdate   ,
          variantname   : variantname   ,
          changelist    : changelist    ,
          projectname   : projectname   ,
          testname      : testname      ,
          //result        : result        ,
          //seed          : seed          ,
          //signature     : signature     ,
          suite         : suite         ,
          shelve        : shelve        ,
          isBAPU        : isBAPU        ,
          isBACO        : isBACO        
        });
        if(oneTestResultDB){
          await Regressiondetails0001.update({
            kickoffdate   : kickoffdate   ,
            variantname   : variantname   ,
            changelist    : changelist    ,
            projectname   : projectname   ,
            testname      : testname      ,
            //result        : result        ,
            //seed          : seed          ,
            //signature     : signature     ,
            suite         : suite         ,
            shelve        : shelve        ,
            isBAPU        : isBAPU        ,
            isBACO        : isBACO
          },{
            //kickoffdate   : kickoffdate   ,
            //variantname   : variantname   ,
            //changelist    : changelist    ,
            //projectname   : projectname   ,
            //testname      : testname      ,
            result        : result        ,
            seed          : seed          ,
            signature     : signature     ,
            //suite         : suite         ,
            //shelve        : shelve        ,
            //isBAPU        : isBAPU        ,
            //isBACO        : isBACO
          });
        }
        else{
          await Regressiondetails0001.create({
            kickoffdate   : kickoffdate   ,
            variantname   : variantname   ,
            changelist    : changelist    ,
            projectname   : projectname   ,
            testname      : testname      ,
            result        : result        ,
            seed          : seed          ,
            signature     : signature     ,
            suite         : suite         ,
            shelve        : shelve        ,
            isBAPU        : isBAPU        ,
            isBACO        : isBACO
          });
        }
        return exits.success(JSON.stringify({
          ok  : 'ok',
          msg : 'done'
        }));
      }
    }
    else if(inputs.kind == 'oneregression'){
      let oneRegression = JSON.parse(inputs.oneRegression);
      let kickoffdate   = oneRegression.kickoffdate;
      let variantname   = oneRegression.variantname;
      let changelist    = oneRegression.changelist ;
      let projectname   = oneRegression.projectname;
      let shelve        = oneRegression.shelve     ;
      let isBAPU        = oneRegression.isBAPU     ;
      let isBACO        = oneRegression.isBACO     ;
      let testlist      = oneRegression.testlist   ;
      let oneRegressionDB;
      if(projectname  ==  'mi200'){
        oneRegressionDB = await Regressionsummary0001.findOne({
          kickoffdate : kickoffdate,
          variantname : variantname,
          changelist  : changelist ,
          projectname : projectname,
          shelve      : shelve     ,
          isBAPU      : isBAPU     ,
          isBACO      : isBACO     ,
          groupname   : 'all'
        });
        console.log(oneRegressionDB);
        if(oneRegressionDB){
          return exits.success(JSON.stringify({
            ok  : 'notok',
            msg : 'not new regression'
          }));
        }
        else{
          oneRegression.groupname = 'all';
          await Regressionsummary0001.create(oneRegression);
          return exits.success(JSON.stringify({
            ok  : 'ok',
            msg : 'created one new regression'
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
