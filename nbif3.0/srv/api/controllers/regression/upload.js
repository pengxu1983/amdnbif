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
      }
    }
    else if(inputs.kind ==  'oneregression'){
      let oneRegression = JSON.parse(inputs.oneRegression);
      let mergedgrouplist = oneRegression.mergedgrouplist;
      sails.log(typeof(mergedgrouplist));
      for(let i = 0;i<mergedgrouplist.length;i++){
        let R = await Groups.findOne({
          groupname   : mergedgrouplist[i].groupname,
          isBAPU      : mergedgrouplist[i].isBAPU,
          projectname : mergedgrouplist[i].projectname,
          variantname : mergedgrouplist[i].variantname
        });
        if(R){
        }
        else{
          await Groups.create({
            groupname   : mergedgrouplist[i].groupname,
            isBAPU      : mergedgrouplist[i].isBAPU,
            projectname : mergedgrouplist[i].projectname,
            variantname : mergedgrouplist[i].variantname
          });
        }
        if(mergedgrouplist[i].projectname ==  'mi200'){
          let R = await Regressionsummary0001.findOne({
            groupname   : mergedgrouplist[i].groupname,
            isBAPU      : mergedgrouplist[i].isBAPU,
            projectname : mergedgrouplist[i].projectname,
            variantname : mergedgrouplist[i].variantname
            changelist  : mergedgrouplist[i].changelist,
            kickoffdate : mergedgrouplist[i].kickoffdate,
            shelve      : mergedgrouplist[i].shelve
          });
          if(R){
          }
          else{
            await Regressionsummary0001.findOne({
              groupname   : mergedgrouplist[i].groupname,
              isBAPU      : mergedgrouplist[i].isBAPU,
              projectname : mergedgrouplist[i].projectname,
              variantname : mergedgrouplist[i].variantname
              changelist  : mergedgrouplist[i].changelist,
              kickoffdate : mergedgrouplist[i].kickoffdate,
              shelve      : mergedgrouplist[i].shelve
            });
          }
          R = await Regressionsummary0001.findOne({
            groupname   : 'all',
            isBAPU      : mergedgrouplist[i].isBAPU,
            projectname : mergedgrouplist[i].projectname,
            variantname : mergedgrouplist[i].variantname
            changelist  : mergedgrouplist[i].changelist,
            kickoffdate : mergedgrouplist[i].kickoffdate,
            shelve      : mergedgrouplist[i].shelve
          });
          if(R){
          }
          else{
            await Regressionsummary0001.findOne({
              groupname   : 'all',
              isBAPU      : mergedgrouplist[i].isBAPU,
              projectname : mergedgrouplist[i].projectname,
              variantname : mergedgrouplist[i].variantname
              changelist  : mergedgrouplist[i].changelist,
              kickoffdate : mergedgrouplist[i].kickoffdate,
              shelve      : mergedgrouplist[i].shelve
            });
          }
        }
        if(mergedgrouplist[i].projectname ==  'mero'){
          let R = await Regressionsummary0002.findOne({
            groupname   : mergedgrouplist[i].groupname,
            isBAPU      : mergedgrouplist[i].isBAPU,
            projectname : mergedgrouplist[i].projectname,
            variantname : mergedgrouplist[i].variantname
            changelist  : mergedgrouplist[i].changelist,
            kickoffdate : mergedgrouplist[i].kickoffdate,
            shelve      : mergedgrouplist[i].shelve
          });
          if(R){
          }
          else{
            await Regressionsummary0002.findOne({
              groupname   : mergedgrouplist[i].groupname,
              isBAPU      : mergedgrouplist[i].isBAPU,
              projectname : mergedgrouplist[i].projectname,
              variantname : mergedgrouplist[i].variantname
              changelist  : mergedgrouplist[i].changelist,
              kickoffdate : mergedgrouplist[i].kickoffdate,
              shelve      : mergedgrouplist[i].shelve
            });
          }
          R = await Regressionsummary0002.findOne({
            groupname   : 'all',
            isBAPU      : mergedgrouplist[i].isBAPU,
            projectname : mergedgrouplist[i].projectname,
            variantname : mergedgrouplist[i].variantname
            changelist  : mergedgrouplist[i].changelist,
            kickoffdate : mergedgrouplist[i].kickoffdate,
            shelve      : mergedgrouplist[i].shelve
          });
          if(R){
          }
          else{
            await Regressionsummary0002.findOne({
              groupname   : 'all',
              isBAPU      : mergedgrouplist[i].isBAPU,
              projectname : mergedgrouplist[i].projectname,
              variantname : mergedgrouplist[i].variantname
              changelist  : mergedgrouplist[i].changelist,
              kickoffdate : mergedgrouplist[i].kickoffdate,
              shelve      : mergedgrouplist[i].shelve
            });
          }
        }
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        msg : 'group info done'
      }));
    }
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
