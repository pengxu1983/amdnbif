module.exports = {


  friendlyName: 'Getshelve',


  description: 'Getshelve something.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/getshelve');
    sails.log(inputs);
    let SHDB  = await Sanityshelves.find({
      result  : 'NOTSTARTED'
    });
    // All done.
    return exits.success(JSON.stringify(SHDB));

  }


};
