const index = 0;
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
    let agentslist  = await Agents.find({
      where :{
        id  : {'>=':0}
      },
      sort : 'agentID ASC'
    });
    sails.log(agentslist);
    sails.log(agentslist.length);
    for(let i=0;i<changelists.length;i++){
      let changelist = parseInt(changelists[i].changelist);
      let R = await Buffchangelists.findOne({
        branchname  : inputs.kind,
        changelist  : changelist
      });
      if(R){
      }
      else{
        await Buffchangelists.create({
          branchname  : inputs.kind,
          changelist  : changelist,
          owner       : changelists[i].username,
          details     : 'NA',
          result      : 'NA',
          ischecked   : 'no',
          agentID     : agentslist[index].agentID
        });
        sails.log('index');
        sails.log(index);
        index++;
        if(index >= agentslist.length){
          index = 0;
        }
      }
    }
    return exits.success(JSON.stringify({
      ok  : 'ok',
      msg : 'done'
    }));

  }


};
