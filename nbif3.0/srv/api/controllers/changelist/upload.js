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
      let changelist = parseInt(changelists[i].changelist);
      let R = await Buffchangelists.findOne({
        treename  : inputs.kind,
        changelist  : changelist
      });
      if(R){
      }
      else{
        await Buffchangelists.create({
          treename  : inputs.kind,
          changelist  : changelist,
          owner       : changelists[i].username,
          details     : 'NA',
          result      : 'NA',
          ischecked   : 'no',
          agentID     : 'NA'
        });
      }
    }
    return exits.success(JSON.stringify({
      ok  : 'ok',
      msg : 'done'
    }));

  }


};
