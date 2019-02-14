module.exports = {


  friendlyName: 'Get',


  description: 'Get sanitys.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/get');
    sails.log(inputs);
    if(inputs.kind=='allsanitysget'){
      var result = await Common_sanitys.find({
        id  : {'>=':0}
      });
      sails.log(result);
      return exits.success({
        ok  : 'ok',
        sanitys : result
      });
    }

    // All done.

  }


};
