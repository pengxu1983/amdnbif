module.exports = {


  friendlyName: 'Pushchangelist',


  description: 'Pushchangelist common sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    changelists : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/common-sanity/pushchangelist');
    sails.log(inputs);
    if(inputs.kind  ==  'newchangelists'){
      let changelists = JSON.parse(inputs.changelists);
      for(let i=0;i<changelists.length;i++){
        await Buffer_changelists.create({
          changelist  : changelists[i].changelist,
          owner       : changelists[i].owner,
          ischecked   : 'no',
          results     : 'NA',
          isBroken    : 'NA',
          brokenCL    : 'NA',
          dcelab      : 'NA'
        });
      }
    }
    // All done.
    return exits.success({
      ok  : 'ok'
    });

  }


};
