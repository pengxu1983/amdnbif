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
    },
    isBAPU     :  {
      type  : 'string'
    },
    projectname:  {
      type  : 'string'
    },
    variantname:  {
      type  : 'string'
    },
    changelist :  {
      type  : 'string'
    },
    kickoffdate:  {
      type  : 'string'
    },
    shelve     :  {
      type  : 'string'
    },
    grouplist   : {
      type  : 'string'
    }





  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/upload');
    //=============================================//
    //========For onecase info=====================//
    //=============================================//
    if(inputs.kind  == 'onecase'){
      let oneTestResult = JSON.parse(inputs.oneTestResult);
      sails.log('onecase upload ' + oneTestResult.testname);

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
      //For 0001
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
          //suite         : suite         ,
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
            //suite         : suite         ,
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
          sails.log('update '+ testname);
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
          sails.log('create '+ testname);
        }
      }
      ///////////////////////////////////////
      //For 0002 
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
          //suite         : suite         ,
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
            //suite         : suite         ,
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
          sails.log('update '+ testname);
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
          sails.log('create '+ testname);
        }
      }
      ///////////////////////////////////////
      //For 0003
      ///////////////////////////////////////
      if(oneTestResult['projectname']=='rembrandt'){
        oneTestResultDB = await Regressiondetails0003.findOne({////MODIFY
          kickoffdate   : kickoffdate   ,
          variantname   : variantname   ,
          changelist    : changelist    ,
          projectname   : projectname   ,
          testname      : testname      ,
          //result        : result        ,
          //seed          : seed          ,
          //signature     : signature     ,
          //suite         : suite         ,
          shelve        : shelve        ,
          isBAPU        : isBAPU        ,
          //groupname     : groupname
        });
        if(oneTestResultDB){
          await Regressiondetails0003.update({
            kickoffdate   : kickoffdate   ,
            variantname   : variantname   ,
            changelist    : changelist    ,
            projectname   : projectname   ,
            testname      : testname      ,
            //result        : result        ,
            //seed          : seed          ,
            //signature     : signature     ,
            //suite         : suite         ,
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
          sails.log('update '+ testname);
        }
        else{
          await Regressiondetails0003.create({
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
          sails.log('create '+ testname);
        }
      }
      ///////////////////////////////////////
      //For 0004
      ///////////////////////////////////////
      if(oneTestResult['projectname']=='floyd'){
        oneTestResultDB = await Regressiondetails0004.findOne({////MODIFY
          kickoffdate   : kickoffdate   ,
          variantname   : variantname   ,
          changelist    : changelist    ,
          projectname   : projectname   ,
          testname      : testname      ,
          //result        : result        ,
          //seed          : seed          ,
          //signature     : signature     ,
          //suite         : suite         ,
          shelve        : shelve        ,
          isBAPU        : isBAPU        ,
          //groupname     : groupname
        });
        if(oneTestResultDB){
          await Regressiondetails0004.update({
            kickoffdate   : kickoffdate   ,
            variantname   : variantname   ,
            changelist    : changelist    ,
            projectname   : projectname   ,
            testname      : testname      ,
            //result        : result        ,
            //seed          : seed          ,
            //signature     : signature     ,
            //suite         : suite         ,
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
          sails.log('update '+ testname);
        }
        else{
          await Regressiondetails0004.create({
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
          sails.log('create '+ testname);
        }
      }
      return exits.success(JSON.stringify({
        ok  : 'ok'
      }));
    }
    if(inputs.kind  ==  'oneregression'){
      sails.log('oneregression');
      let grouplist = JSON.parse(inputs.grouplist);
      sails.log(grouplist);
      if(grouplist.length ==  0){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'no groups found'
        }));
      }
      else{
        for(let i=0;i<grouplist.length;i++){
          //groups update to DB
          if(grouplist[i] ==  'all'){
            //ignore
          }
          else{
            let R = await Groups.findOne({
              groupname   : grouplist[i],
              isBAPU      : inputs.isBAPU,
              projectname : inputs.projectname,
              variantname : inputs.variantname
            });
            if(R){
            }
            else{
              await Groups.create({
                groupname   : grouplist[i],
                isBAPU      : inputs.isBAPU,
                projectname : inputs.projectname,
                variantname : inputs.variantname
              });
            }
          }
          //summary update to DB
          if(inputs.projectname ==  'mi200'){
            R = await Regressionsummary0001.findOne({
              groupname   : grouplist[i],
              isBAPU      : inputs.isBAPU,
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              changelist  : inputs.changelist,
              kickoffdate : inputs.kickoffdate,
              shelve      : inputs.shelve
            });
            if(R){
            }
            else{
              await Regressionsummary0001.create({
                groupname   : grouplist[i],
                isBAPU      : inputs.isBAPU,
                projectname : inputs.projectname,
                variantname : inputs.variantname,
                changelist  : inputs.changelist,
                kickoffdate : inputs.kickoffdate,
                shelve      : inputs.shelve,
                testlist    : JSON.stringify([]),
                passlist    : JSON.stringify([]),
                faillist    : JSON.stringify([]),
                runninglist : JSON.stringify([]),
                unknownlist : JSON.stringify([]),
                passrate    : 0
              });
            }
          }
          else if(inputs.projectname  ==  'mero'){
            R = await Regressionsummary0002.findOne({
              groupname   : grouplist[i],
              isBAPU      : inputs.isBAPU,
              projectname : inputs.projectname,
              variantname : inputs.variantname,
              changelist  : inputs.changelist,
              kickoffdate : inputs.kickoffdate,
              shelve      : inputs.shelve
            });
            if(R){
            }
            else{
              await Regressionsummary0002.create({
                groupname   : grouplist[i],
                isBAPU      : inputs.isBAPU,
                projectname : inputs.projectname,
                variantname : inputs.variantname,
                changelist  : inputs.changelist,
                kickoffdate : inputs.kickoffdate,
                shelve      : inputs.shelve,
                testlist    : JSON.stringify([]),
                passlist    : JSON.stringify([]),
                faillist    : JSON.stringify([]),
                runninglist : JSON.stringify([]),
                unknownlist : JSON.stringify([]),
                passrate    : 0
              });
            }
          }
        }
        return  exits.success(JSON.stringify({
          ok  : 'ok'
        }));
      }
    }
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
