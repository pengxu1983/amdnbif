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
    //for Users
    ///////////////////
    if(inputs.kind  ==  'allusersget'){
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
