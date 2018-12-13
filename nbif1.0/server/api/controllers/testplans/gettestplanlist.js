module.exports = {


  friendlyName: 'Gettestplanlist',


  description: 'Gettestplanlist testplans.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    sails.log('/testplans/gettestplanlist');
    if(inputs.kind  == 'gettestplanlist'){
      var testplanlist  = await Testplans.find({
        projectname : inputs.projectname
      });

      return exits.success({
        ok  : 'ok',
        testplanlist  : testplanlist
      });
    }

  }


};
