module.exports = {


  friendlyName: 'Clone',


  description: 'Clone config.',


  inputs: {
    kind : {
      type : 'string'
    },
    projectname : {
      type : 'string'
    },
    variantname : {
      type : 'string'
    },
    clonetarget : {
      type : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    sails.log('/config/clone');
    sails.log(inputs);
    if(inputs.kind == 'testplanclone'){
      //remove previous one
      var clonetarget = JSON.parse(inputs.clonetarget);
      sails.log('abc');
      sails.log(clonetarget.projectname);
      sails.log(clonetarget.variantname);
      await Testplans.destroy({
        projectname : inputs.projectname,
        variantname : inputs.variantname
      });
      var testplanstarget = await Testplans.find({
        projectname : clonetarget.projectname,
        variantname : clonetarget.variantname
      });
      for(var i=0;i<testplanstarget.length;i++){
        await Testplans.create({
          name            : testplanstarget[i].name,
          projectname     : inputs.projectname,
          variantname     : inputs.variantname,
          DEowner         : testplanstarget[i].DEowner,
          DVowner         : testplanstarget[i].DVowner,
          testnameprefix  : testplanstarget[i].testnameprefix
	});
      }
    }
    // All done.
    return exits.success({
      ok : 'ok'
    });

  }


};
