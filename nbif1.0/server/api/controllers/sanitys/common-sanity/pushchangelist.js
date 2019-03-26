module.exports = {


  friendlyName: 'Pushchangelist',


  description: 'Pushchangelist common sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    changelists : {
      type  : 'string'
    },
    tree  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/common-sanity/pushchangelist');
    sails.log(inputs);
    if(inputs.tree  ==  'MAIN'){
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
            dcelab      : 'NA',
            dcelabischecked : 'no',
            dcelabisBroken  : 'NA',
            dcelabbrokenCL  : 'NA',
            dcelabowner     : 'NA'
          });
        }
        return exits.success({
          ok  : 'ok'
        });
      }
    }
    if(inputs.tree  ==  'NV21'){
      if(inputs.kind  ==  'newchangelists'){
        let changelists = JSON.parse(inputs.changelists);
        for(let i=0;i<changelists.length;i++){
          await Buffer_changelists_01.create({
            changelist  : changelists[i].changelist,
            owner       : changelists[i].owner,
            ischecked   : 'no',
            results     : 'NA',
            isBroken    : 'NA',
            brokenCL    : 'NA',
            dcelab      : 'NA',
            dcelabischecked : 'no',
            dcelabisBroken  : 'NA',
            dcelabbrokenCL  : 'NA',
            dcelabowner     : 'NA'
          });
        }
        return exits.success({
          ok  : 'ok'
        });
      }
    }
    // All done.

  }


};
