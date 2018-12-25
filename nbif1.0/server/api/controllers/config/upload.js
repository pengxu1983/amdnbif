module.exports = {


  friendlyName: 'Upload',


  description: 'Upload config.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    users : {
      type  : 'ref'
    },
    testplans : {
      type  : 'ref'
    },
    projects  : {
      type  : 'string'
    },
    availablevariants: {
      type  : 'ref'
    },
    variants  : {
      type  : 'ref'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/upload');
    sails.log(inputs);
    ///////////////////
    //for Users
    ///////////////////
    if(inputs.kind  ==  'usersupload'){
      await Users.destroy({
        id: {'>=':0}
      });
      for(var i=0;i<inputs.users.length;i++){
        if(inputs.users[i].realname == ''){
          //Do nothing
        }
        else {
          await Users.create({
            realname  : inputs.users[i].realname,
            email     : inputs.users[i].email,
            groupname : inputs.users[i].groupname
          });
        }
      }
      return exits.success({ok:'ok'});
    }
    ///////////////////
    //for Testplans 
    ///////////////////
    else if(inputs.kind == 'testplansupload'){
      await Testplans.destroy({
        id: {'>=':0}
      });
      for(var i=0;i<inputs.testplans.length;i++){
        if(inputs.testplans[i].name== ''){
          //Do nothing
        }
        else {
          await Testplans.create({
            name            : inputs.testplans[i].name,
            projectname     : inputs.testplans[i].projectname,
            DEowner         : inputs.testplans[i].DEowner,
            DVowner         : inputs.testplans[i].DVowner,
            testnameprefix  : inputs.testplans[i].testnameprefix
          });
        }
      }
      return exits.success({ok:'ok'});
    }
    ///////////////////
    //for Projects
    ///////////////////
    else if(inputs.kind == 'projectsupload'){
      await Projects.destroy({
        id: {'>=':0}
      });
      sails.log('aaaa');
      sails.log(inputs.projects);
      sails.log(typeof(inputs.projects));
      sails.log(JSON.parse(inputs.projects));
      sails.log(typeof(JSON.parse(inputs.projects)));
      var allprojects = JSON.parse(inputs.projects);
      for(var i=0;i<allprojects.length;i++){
        if(allprojects.name== ''){
          //Do nothing
        }
        else {
          await Projects.create({
            name      : allprojects[i].name,
            LSA       : allprojects[i].LSA ,
            LSB       : allprojects[i].LSB ,
            LSC       : allprojects[i].LSC ,
            LSD       : allprojects[i].LSD ,
            DElead    : allprojects[i].DElead,
            DVlead    : allprojects[i].DVlead,
            Projlead  : allprojects[i].Projlead,
            availablevariants : allprojects[i].availablevariants
          });
        }
      }
      return exits.success({ok:'ok'});
    }
    ///////////////////
    //for Variants 
    ///////////////////
    else if(inputs.kind == 'variantsupload'){
      await Variants.destroy({
        id: {'>=':0}
      });
      for(var i=0;i<inputs.variants.length;i++){
        if(inputs.variants[i].variantname== ''){
          //Do nothing
        }
        else {
          await Variants.create({
            variantname : inputs.variants[i].variantname,
          });
        }
      }
      return exits.success({ok:'ok'});
    }

    // All done.
    //return exits.success({});

  }


};
