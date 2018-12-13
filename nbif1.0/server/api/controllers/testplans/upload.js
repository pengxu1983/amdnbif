module.exports = {


  friendlyName: 'Upload',


  description: 'Upload testplans.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    testplanlist  : {
      type  : ['ref']
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    sails.log('/testplans/upload');
    sails.log(inputs.testplanlist);
    if(inputs.kind  ==  'testplansupload'){
      await Testplans.destroy({
        projectname : inputs.projectname
      });
      await Testplans.createEach(inputs.testplanlist);
    }
    return exits.success();

  }


};
