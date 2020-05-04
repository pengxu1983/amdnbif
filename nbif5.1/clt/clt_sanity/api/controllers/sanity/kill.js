module.exports = {


  friendlyName: 'Kill',


  description: 'Kill sanity.',


  inputs: {
    username  : {
      type    : 'string' 
    },
    shelve    : {
      type    : 'string' 
    },
    codeline  : {
      type    : 'string'
    },
    branch_name : {
      type    : 'string'
    },
    changelist  : {
      type    : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanity/kill');
    sails.log(inputs);
    let S = await Sanityshelves.find({
      codeline    : inputs.codeline,
      branch_name : inputs.branch_name,
      shelve      : inputs.shelve
    });
    let C = await Sanitychangelists.find({
      codeline    : inputs.codeline,
      branch_name : inputs.branch_name,
      changelist  : inputs.changelist
    });//TODO
    if(S.length ==0){
      return exits.success(JSON.stringify({
        ok  : 'notok',
        msg : 'No shelve to kill'
      }));
    }
    else if(S.length>1){
      return exits.success(JSON.stringify({
        ok  : 'notok',
        msg : 'DB crashed, Please contact Benny.Peng'
      }));
    }
    else if(S[0].result ==  'KILLED'){
      return exits.success(JSON.stringify({
        ok  : 'notok',
        msg : 'already killed'
      }));
    }
    else if(S[0].result ==  'KILLING'){
      return exits.success(JSON.stringify({
        ok  : 'notok',
        msg : 'being killed. Please wait'
      }));
    }
    else if(S[0].result ==  'TOKILL'){
      return exits.success(JSON.stringify({
        ok  : 'notok',
        msg : 'being killed. Please wait'
      }));
    }
    else{
      await Sanityshelves.update({
        codeline    : inputs.codeline,
        branch_name : inputs.branch_name,
        shelve      : inputs.shelve
      },{
        result      : 'TOKILL'
      });
      return exits.success(JSON.stringify({
        ok  : 'ok',
        msg : S[0].codeline+' '+S[0].branch_name+' '+S[0].shelve+' is to be killed. Please wait for the notification mail'
      }));
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
