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
    // All done.
    //return;

  }


};
