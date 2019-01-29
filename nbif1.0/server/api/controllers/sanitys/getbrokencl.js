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
      sails.log('DBG');
      var lastCLs_max ;
      var lastpassCLs_min ;
      for(var i=0;i<sanity_tests.length;i++){
        if(i==0){
          lastpassCLs_min = parseInt(sanity_tests[i].lastpassCL);
        }
        else {
          if(parseInt(sanity_tests[i].lastpassCL) < lastpassCLs_min){
            lastpassCLs_min = parseInt(sanity_tests[i].lastpassCL);
          }
        }
        sails.log(parseInt(sanity_tests[i].lastpassCL));
      }
      for(var i=0;i<sanity_tests.length;i++){
        if(i==0){
          lastCLs_max = parseInt(sanity_tests[i].lastCL);
        }
        else {
          if(parseInt(sanity_tests[i].lastCL) > lastCLs_max){
            lastCLs_max = parseInt(sanity_tests[i].lastCL);
          }
        }
        sails.log(parseInt(sanity_tests[i].lastCL));
      }
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
