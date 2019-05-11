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
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    projects  : {
      type  : 'string'
    },
    availablevariants: {
      type  : 'ref'
    },
    variants  : {
      type  : 'ref'
    },
    machines  : {
      type  : 'string'
    },
    regressionsettings  :{
      type  : 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/upload');
    sails.log(inputs);
    ///////////////////
    //for Machines
    ///////////////////
    if(inputs.kind  ==  'machinesupload'){
      await Machines.destroy({
        id: {'>=':0}
      });
      var machines  = JSON.parse(inputs.machines);
      for(var i=0;i<machines.length;i++){
        if(machines[i].pcname== ''){
          //Do nothing
        }
        else {
          await Machines.create({
            pcname    : machines[i].pcname,
            roll      : machines[i].roll,
            site      : machines[i].site,
            control   : machines[i].control,
            allownum  : machines[i].allownum
          });
        }
      }
      return exits.success({ok:'ok'});
    }
    ///////////////////
    //for Users
    ///////////////////
    if(inputs.kind  ==  'usersupload'){
      await Users.destroy({
        id: {'>=':0}
      });
      for(var i=0;i<inputs.users.length;i++){
        if(inputs.users[i].unixusername== ''){
          //Do nothing
        }
        else {
          await Users.create({
            realname  : inputs.users[i].realname,
            email     : inputs.users[i].email,
            groupname : inputs.users[i].groupname,
            unixusername  : inputs.users[i].unixusername
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
        //id: {'>=':0},
        projectname : inputs.projectname,
        variantname : inputs.variantname
      });
      for(var i=0;i<inputs.testplans.length;i++){
        if(inputs.testplans[i].name== ''){
          //Do nothing
        }
        else {
          await Testplans.create({
            name            : inputs.testplans[i].name,
            projectname     : inputs.testplans[i].projectname,
            variantname     : inputs.testplans[i].variantname,
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
      //sails.log(inputs.projects);
      //sails.log(typeof(inputs.projects));
      //sails.log(JSON.parse(inputs.projects));
      //sails.log(typeof(JSON.parse(inputs.projects)));
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
            availablevariants : JSON.stringify(allprojects[i].availablevariants)
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
    ///////////////////
    //for Regression 
    ///////////////////
    else if(inputs.kind == 'regressionsettingsupload'){
      await Regressionsettings.destroy({
        //id: {'>=':0},
        projectname : inputs.projectname,
        variantname : inputs.variantname
      });
      var regressionsettings  = JSON.parse(inputs.regressionsettings);
      sails.log('abc');
      sails.log(regressionsettings);
      for(var i=0;i<regressionsettings.length;i++){
        if(regressionsettings[i].kind== ''){
          //Do nothing
        }
        else { 
          sails.log(regressionsettings[i].kind);
          sails.log(regressionsettings[i].projectname);
          sails.log(regressionsettings[i].variantname);
          sails.log(regressionsettings[i].daysperround);
          sails.log(regressionsettings[i].control);
          await Regressionsettings.create({
            kind : regressionsettings[i].kind,
            projectname : regressionsettings[i].projectname,
            variantname : regressionsettings[i].variantname,
            daysperround : regressionsettings[i].daysperround,
            control : regressionsettings[i].control
          });
        }
      }
      return exits.success({ok:'ok'});
    }
    // All done.
    //return exits.success({});

  }


};
