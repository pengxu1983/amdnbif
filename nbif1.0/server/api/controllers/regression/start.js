module.exports = {


  friendlyName: 'Start',


  description: 'Start regression.',


  inputs: {
    mode              : {
      type            : 'string'
    },
    batchname         : {
      type            : 'string'
    },
    projectname       : {
      type            : 'string'
    },
    isofficial        : {
      type            : 'string'
    },
    testlist          : {
      type            : 'string',
      columnType      : 'longtext'
    },
    startdate         : {
      type            : 'string'
    },
    starttime         : {
      type            : 'string'
    },
    changelist        : {
      type            : 'string'
    },
    regressionlocation: {
      type            : 'string'
    },
    regressionsite    : {
      type            : 'string'
    },
    operator          : {
      type            : 'string'
    },

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    sails.log('/regression/start');
    sails.log(inputs);
    var one_regression_log;
    one_regression_log  = await Regression_log.findOne({
      mode      : inputs.mode,
      startdate : inputs.startdate
    });
    if(!one_regression_log){
      await Regression_log.create({
        batchname         : inputs.batchname          ,
        projectname       : inputs.projectname        ,
        mode              : inputs.mode               ,
        isofficial        : inputs.isofficial         ,
        testlist          : inputs.testlist           ,
        startdate         : inputs.startdate          ,
        starttime         : inputs.starttime          ,
        changelist        : inputs.changelist         ,
        regressionlocation: inputs.regressionlocation ,
        regressionsite    : 'cyb'    ,
        operator          : inputs.operator          
      });
      one_regression_log  = await Regression_log.findOne({
        mode      : inputs.mode,
        startdate : inputs.startdate
      });

      return exits.success({
        ok  : 'ok',
        msg : 'batchname: '+one_regression_log.batchname +' registered'
      });
    }
    else{
      await Regression_log.update({
        mode      : inputs.mode,
        startdate : inputs.startdate
      },{
        batchname         : inputs.batchname          ,
        projectname       : inputs.projectname        ,
        mode              : inputs.mode               ,
        isofficial        : inputs.isofficial         ,
        testlist          : inputs.testlist           ,
        startdate         : inputs.startdate          ,
        starttime         : inputs.starttime          ,
        changelist        : inputs.changelist         ,
        regressionlocation: inputs.regressionlocation ,
        regressionsite    : 'cyb'    ,
        operator          : inputs.operator
      });
      return exits.success({
        ok    :   'ok',
        msg   :   'dupulicate official regression kicked off updating'
      });
    }

  }


};
