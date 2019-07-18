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
    sails.log(inputs.kind);
    //=============================================//
    //========For onecase info=====================//
    //========For onecase info=====================//
    //========For onecase info=====================//
    //========For onecase info=====================//
    //========For onecase info=====================//
    //========For onecase info=====================//
    //========For onecase info=====================//
    //=============================================//
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
      let groupname     = oneTestResult.groupname    ;
      let oneTestResultDB;
      ///////////////////////////////////////
      //For 0001 Now is mi200
      ///////////////////////////////////////
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
          //groupname     : groupname
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
            //groupname     : groupname   
          },{
            //kickoffdate   : kickoffdate   ,
            //variantname   : variantname   ,
            //changelist    : changelist    ,
            //projectname   : projectname   ,
            //testname      : testname      ,
            result        : result        ,
            seed          : seed          ,
            signature     : signature     ,
            suite         : suite         ,
            //shelve        : shelve        ,
            //isBAPU        : isBAPU        ,
            groupname     : groupname
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
            groupname     : groupname     ,
          });
        }
        let R = await Groups.findOne({
          projectname : projectname,
          variantname : variantname,
          isBAPU      : isBAPU,
          groupname   : groupname
        });
        if(R){
        }
        else{
          await Groups.create({
            projectname : projectname,
            variantname : variantname,
            isBAPU      : isBAPU,
            groupname   : groupname
          });
        }
        return exits.success(JSON.stringify({
          ok  : 'ok',
          msg : 'done'
        }));
      }
      ///////////////////////////////////////
      //For 0002 Now is mero
      ///////////////////////////////////////
      if(oneTestResult['projectname']=='mero'){
        oneTestResultDB = await Regressiondetails0002.findOne({////MODIFY
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
          //groupname     : groupname
        });
        if(oneTestResultDB){
          await Regressiondetails0002.update({
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
            //groupname     : groupname   
          },{
            //kickoffdate   : kickoffdate   ,
            //variantname   : variantname   ,
            //changelist    : changelist    ,
            //projectname   : projectname   ,
            //testname      : testname      ,
            result        : result        ,
            seed          : seed          ,
            signature     : signature     ,
            suite         : suite         ,
            //shelve        : shelve        ,
            //isBAPU        : isBAPU        ,
            groupname     : groupname
          });
        }
        else{
          await Regressiondetails0002.create({
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
            groupname     : groupname     ,
          });
        }
        let R = await Groups.findOne({
          projectname : projectname,
          variantname : variantname,
          isBAPU      : isBAPU,
          groupname   : groupname
        });
        if(R){
        }
        else{
          await Groups.create({
            projectname : projectname,
            variantname : variantname,
            isBAPU      : isBAPU,
            groupname   : groupname
          });
        }
        return exits.success(JSON.stringify({
          ok  : 'ok',
          msg : 'done'
        }));
      }
    }
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
