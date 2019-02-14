module.exports = {


  friendlyName: 'Pushchangelist',


  description: 'Pushchangelist regression.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    changelist  : {
      type    : 'string'
    },
    mode  : {
      type  : 'string'
    },
    date : {
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
    sails.log('/regression/pushchangelist');
    sails.log(inputs);
    let oneregression;
    if(inputs.kind == 'newkickoff'){
      sails.log('newkickoff');
      oneregression = await Regressionbychangelist.findOne({
        changelist  : inputs.changelist
      });
      if(oneregression){
        //already Exists means no new kickoff
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'no new kick off of regression'
        }));
      }
      else{
        await Regressionbychangelist.create({
          changelist  : inputs.changelist,
          date        : inputs.date,
          passingrates : 'NA',
          mode        : inputs.mode,
          projectname : inputs.projectname,
          variantname : inputs.variantname
        });
        return exits.success(JSON.stringify({
          ok  : 'ok'
        }));
      }
    }
    // All done.

  }


};
