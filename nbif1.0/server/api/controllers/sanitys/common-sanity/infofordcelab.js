module.exports = {


  friendlyName: 'Infofordcelab',


  description: 'Infofordcelab common sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/common-sanity/infofordcelab');
    sails.log(inputs);
    if(inputs.kind == 'infofordcelab'){
      let variants = await Variants.find({
        id  : {'>=':0}//FIXME since variants will have sanity non-sanity tag
      });
      let projects = await Projects.find({
        id  : {'>=':0}
      });
      return exits.success(JSON.stringify({
        ok      : 'ok',
        projects: projects,
        variants: variants
      }));
    }
    // All done.
    return;

  }


};
