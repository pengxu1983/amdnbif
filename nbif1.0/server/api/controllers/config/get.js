module.exports = {


  friendlyName: 'Get',


  description: 'Get config.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/get');
    sails.log(inputs);
    ///////////////////
    //for Common sanitys
    ///////////////////
    if(inputs.kind =='allsanitycfg'){
      let common_sanitys  = await Common_sanitys.find({
        id  : {'>=':0}
      });
      let common_tasks    = await Common_tasks.find({
        id  : {'>=':0}
      });
      sails.log('DBG1');
      sails.log(common_sanitys);
      sails.log(common_tasks);
      return exits.success(JSON.stringify({
        ok  : 'ok',
        common_tasks  : JSON.stringify(common_tasks),
        common_sanitys  : JSON.stringify(common_sanitys)
      }));
    }
    ///////////////////
    //for Users
    ///////////////////
    else if(inputs.kind  ==  'allusersget'){
      var allusers = await Users.find({
        id  : {'>=':0}
      });
      return exits.success({
        ok  : 'ok',
        users : allusers
      })
    }
    ///////////////////
    //for Projects
    ///////////////////
    else if(inputs.kind  ==  'allprojectsget'){
      var allprojects = await Projects.find({
        id  : {'>=':0}
      });
      return exits.success({
        ok  : 'ok',
        projects  : JSON.stringify(allprojects)
      });
    }
    ///////////////////
    //for Variants
    ///////////////////
    else if(inputs.kind  ==  'allvariantsget'){
      var allvariants= await Variants.find({
        id  : {'>=':0}
      });
      return exits.success({
        ok        : 'ok',
        variants  : allvariants
      });
    }
    ///////////////////
    //for Testplans
    ///////////////////
    else if(inputs.kind  ==  'alltestplansget'){
      var alltestplans= await Testplans.find({
        id  : {'>=':0}
      });
      return exits.success({
        ok  : 'ok',
        testplans : alltestplans
      });
    }
    ///////////////////
    //for Machines
    ///////////////////
    else if(inputs.kind  ==  'allmachinesget'){
      var allmachines= await Machines.find({
        id  : {'>=':0}
      });
      return exits.success({
        ok  : 'ok',
        machines : allmachines
      });
    }
    ///////////////////
    //for Regressionsettings
    ///////////////////
    else if(inputs.kind  ==  'allregressionsettingsget'){
      var allregressionsettings= await Regressionsettings.find({
        id  : {'>=':0}
      });
      return exits.success({
        ok  : 'ok',
        regressionsettings : allregressionsettings
      });
    }

    else{
      return exits.success({
        ok  : 'notok'
      });
    }
    // All done.
    //return;

  }


};
