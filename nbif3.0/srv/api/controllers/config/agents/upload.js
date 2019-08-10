module.exports = {


  friendlyName: 'Upload',


  description: 'Upload agents.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    agents  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/agents/upload');
    sails.log(inputs);
    if(inputs.kind  = 'all'){
      let agents = JSON.parse(inputs.agents);
      for(let i=0;i<agents.length;i++){
        let R = await Agents.findOne({
          agentID : agents[i].agentID
        });
        if(R){
        }
        else{
          await Agents.create({
            agentID : agents[i].agentID,
            isbusy  : 'no'
          });
        }
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        msg : 'agents upload done'
      }));
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
