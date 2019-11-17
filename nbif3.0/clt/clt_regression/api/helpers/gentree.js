module.exports = {


  friendlyName: 'Gentree',


  description: 'Gentree something.',


  inputs: {
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.log('AAA');
    sails.log(inputs.projectname);
    sails.log(inputs.variantname);
    // TODO
  }


};

