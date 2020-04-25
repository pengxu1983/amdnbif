module.exports = {


  friendlyName: 'Getchangelist',


  description: 'Getchangelist sanity.',


  inputs: {
    result    : {
      type    : 'string'
    },
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanity/getchangelist');
    //sails.log(inputs);
    let CLDB =  await Sanitychangelists.find({
      result      : inputs.result
    });
    sails.log(CLDB);
    // All done.
    return exits.success(JSON.stringify(CLDB));

  }


};
