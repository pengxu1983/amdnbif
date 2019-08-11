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
      let treename;
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
            treename      = R[i].treename;
          }
          else{
            if(earliestuncheckedCL > R[i].changelist){
              earliestuncheckedCL = R[i].changelist;
              treename      = R[i].treename;
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
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        treename  : treename,
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
