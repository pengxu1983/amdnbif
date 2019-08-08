module.exports = {


  friendlyName: 'Upload',


  description: 'Upload changelist.',


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
    sails.log('/changelist/upload');
    sails.log(inputs);
    let changelists = JSON.parse(inputs.changelists);
    for(let i=0;i<changelists.length;i++){
      let R = await Buffchangelists.findOne({
        treename  : kind,
        changelist  : changelists[i].changelist
      });
      if(R){
      }
      else{
        await Buffchangelists.create({
          treename  : kind,
          changelist  : changelists[i].changelist,
          owner       : changelists[i].username,
          details     : 'NA',
          result      : 'NA'，
          ischecked   : 'no'
        });
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        msg : 'done'
      }));
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
