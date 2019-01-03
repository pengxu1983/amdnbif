module.exports = {


  friendlyName: 'Upload',


  description: 'Upload sanitys.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    sanitys : {
      type  : 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/upload');
    sails.log(inputs);
    var sanitys = JSON.parse(inputs.sanitys);
    if(inputs.kind == 'sanity_test_upload'){
      await Sanity_tests.destroy({
        projectname : inputs.projectname,
        variantname : inputs.variantname
      }); 
      for(var i=0;i<inputs.sanitys.length;i++){
        if(sanitys[i].testname== ''){
          //Do nothing
        }
        else {
          await Sanity_tests.create({
            projectname     : sanitys[i].projectname,
            variantname     : sanitys[i].variantname,
            testname        : sanitys[i].testname
          });
        }
      }
      return exits.success({ ok  : 'ok' });
    }
    // All done.

  }


};
