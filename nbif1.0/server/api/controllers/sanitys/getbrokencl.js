module.exports = {


  friendlyName: 'Getbrokencl',


  description: 'Getbrokencl sanitys.',


  inputs: {
    kind  : {
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
    sails.log('sanitys/getbrokencl');
    if(inputs.kind == 'getbrokencl'){
      var sanity_tests = await Sanity_tests.find({
        projectname : inputs.projectname,
        variantname : inputs.variantname
      });
      var lastpassCLs = [];
      for(var i=0;i<sanity_tests.length;i++){
        lastpassCLs.push(parseInt(sanity_tests[i].lastpassCL));
      }
      var lastCLs = [];
      for(var i=0;i<sanity_tests.length;i++){
        lastCLs.push(parseInt(sanity_tests[i].lastCL));
      }
      var lastCLs_max = Math.max(lastCLs);
      var lastpassCLs_min = Math.min(lastpassCLs);
      sails.log('Max lastCL');
      sails.log(lastCLs_max);
      sails.log('Min lastpassCL');
      sails.log(lastpassCLs_min);
      if(lastCLs_max > lastpassCLs_min){
        return exits.success({
          ok  : 'ok',
          lastpassCL : lastpassCLs_min
        });
      }
      else {
        return exits.success({
          ok  : 'ok',
          lastpassCL  : 'NA'
        });
      }
    }
    // All done.
    //return exits.success({
    //  ok  : 'ok'
    //});

  }


};
