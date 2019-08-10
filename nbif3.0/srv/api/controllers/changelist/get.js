let agentnumber = 1;
let agentID =0;
module.exports = {


  friendlyName: 'Get',


  description: 'Get changelist.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    treename  : {
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
      let agentID;
      let R = await Buffchangelists.find({
        treename  : inputs.treename,
        ischecked : 'no'
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
          }
          else{
            if(earliestuncheckedCL > R[i].changelist){
              earliestuncheckedCL = R[i].changelist;
            }
          }
        }
        await Buffchangelists.update({
          changelist  : earliestuncheckedCL,
          ischecked   : 'no'
        },{
          ischecked   : 'yes',
          agent       : agentID,
          result      : 'NA',
          details     : 'NA'
        });
      }
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
