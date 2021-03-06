module.exports = {


  friendlyName: 'Get',


  description: 'Get changelist.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    agentID : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/changelist/get');
    sails.log(inputs);
    if(inputs.kind  ==  'earliestunchecked'){
      let earliestuncheckedCL;
      let branchname;
      let R = await Buffchangelists.find({
        ischecked : 'no',
        agentID   : inputs.agentID
      });
      if(R.length == 0){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'no valid changelist'
        }));
      }
      else{
        for(let i=0;i<R.length;i++){
          if(i==0){
            earliestuncheckedCL = R[i].changelist;
            branchname      = R[i].branchname;
          }
          else{
            if(earliestuncheckedCL > R[i].changelist){
              earliestuncheckedCL = R[i].changelist;
              branchname      = R[i].branchname;
            }
          }
        }
        await Buffchangelists.update({
          changelist  : earliestuncheckedCL,
          agentID     : inputs.agentID
        },{
          ischecked   : 'yes',
          result      : 'NA',
          details     : 'NA'
        });
        await Agents.update({
          agentID : inputs.agentID
        },{
          isbusy  : 'yes'
        });
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        branchname  : branchname,
        changelist  : earliestuncheckedCL
      }));
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
