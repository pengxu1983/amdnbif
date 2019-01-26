module.exports = {


  friendlyName: 'Statusupload',


  description: 'Statusupload sanitys.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    passlist :{
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
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/statusupload');
    sails.log(inputs);
    var sanity_tests = await Sanity_tests.find({
      projectname : inputs.projectname,
      variantname : inputs.variantname
    });
    for(var i=0;i<sanity_tests.length;i++){
      if(inputs.passlist.indexOf(sanity_tests[i].testname) == -1){
        //not pass
        await Sanity_tests.update({
          testname    : sanity_tests[i].testname,
          projectname : inputs.projectname,
          variantname : inputs.variantname
        },{
          lastCL      : inputs.changelist
        });
      }
      else{
        //pass
        await Sanity_tests.update({
          testname    : sanity_tests[i].testname,
          projectname : inputs.projectname,
          variantname : inputs.variantname
        },{
          lastCL      : inputs.changelist,
          lastpassCL  : inputs.changelist
        });
      }
    }
    // All done.
    return exits.success({
      ok  : 'ok'
    });

  }


};
