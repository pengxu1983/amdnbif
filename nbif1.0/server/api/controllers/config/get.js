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
    if(inputs.kind  ==  'allusersget'){
      var allusers = await Users.find({
        id  : {'>=':0}
      });
      return exits.success({
        ok  : 'ok',
        users : allusers
      })
    }
    else if(inputs.kind  ==  'allprojectsget'){
      var allprojects = await Projects.find({
        id  : {'>=':0}
      });
      return exits.success({
        ok  : 'ok',
        projects  : JSON.stringify(allprojects)
      });
    }
    else if(inputs.kind  ==  'allvariantsget'){
      var allvariants= await Variants.find({
        id  : {'>=':0}
      });
      return exits.success({
        ok        : 'ok',
        variants  : allvariants
      });
    }
    else if(inputs.kind  ==  'alltestplansget'){
      var alltestplans= await Testplans.find({
        id  : {'>=':0}
      });
      return exits.success({
        ok  : 'ok',
        testplans : alltestplans
      });
    }
    else if(inputs.kind  ==  'allmachinesget'){
      var allmachines= await Machines.find({
        id  : {'>=':0}
      });
      return exits.success({
        ok  : 'ok',
        machines : allmachines
      });
    }
    else if(inputs.kind  ==  'allregressionsettingsget'){
      var allregressionsettings= await Regressionsettings.find({
        id  : {'>=':0}
      });
      return exits.success({
        ok  : 'ok',
        machines : allregressionsettings
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
