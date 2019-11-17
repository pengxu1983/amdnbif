module.exports = {


  friendlyName: 'Start',


  description: 'Start mi 200.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    sails.helpers.gentree({
      projectname : 'mi200',
      variantname : 'nbif_nv10_gpu'
    });
    // All done.
    return;

  }


};
