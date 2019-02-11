module.exports = {


  friendlyName: 'Getcommonsanitystatus',


  description: 'Getcommonsanitystatus common sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/common-sanity/getcommonsanitystatus');
    sails.log(inputs);
    if(inputs.kind == 'sanityStatus'){
      sails.log('on');
      let results = await Buffer_changelists.find({
        ischecked : 'yes'
      });
      let resultsToPop = results;
      if(results.length == 0){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'no result found'
        }));
      }
      else {
        //find latest
        let lastcheckedCL ;

      }
    }
    // All done.

  }


};
