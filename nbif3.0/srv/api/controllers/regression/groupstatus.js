module.exports = {


  friendlyName: 'Groupstatus',


  description: 'Groupstatus regression.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    changelist  : {
      type  : 'string'
    },
    isBAPU      : {
      type  : 'string'
    },
    shelve      : {
      type  : 'string'
    },
    kickoffdate : {
      type  : 'string'
    },
    DVgroup     : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/groupstatus');
    sails.log(inputs);
    let W = {
      projectname : inputs.projectname,
      variantname : inputs.variantname,
      changelist  : inputs.changelist,
      isBAPU      : inputs.isBAPU,
      shelve      : inputs.shelve,
      kickoffdate : inputs.kickoffdate,
    };
    if(inputs.kind  ==  'all'){
    }
    if(inputs.kind  ==  'one'){
      let R = await Groups.find({
        projectname : inputs.projectname,
        variantname : inputs.variantname,
        isBAPU      : inputs.isBAPU,
        DVgroup     : inputs.DVgroup
      });
      let gs  = [];
      for(let i=0;i<R.length;i++){
        gs.push(R[i].groupname);
      }
      W.groupname = {'in':gs};
    }
    sails.log('pxpxpx');
    sails.log(W);
    let R;
    ///////////////////////////////////////
    //For 0001 start
    ///////////////////////////////////////
    if(inputs.projectname ==  'mi200'){
      R = await Regressionsummary0001.find({
        where : W,
      });
    }
    ///////////////////////////////////////
    //For 0001 end
    ///////////////////////////////////////
    ///////////////////////////////////////
    //For 0002 start
    ///////////////////////////////////////
    if(inputs.projectname ==  'mero'){
      R = await Regressionsummary0002.find({
        where : W,
      });
    }
    ///////////////////////////////////////
    //For 0002 end
    ///////////////////////////////////////
    ///////////////////////////////////////
    //For 0003 start
    ///////////////////////////////////////
    if(inputs.projectname ==  'rembrandt'){
      R = await Regressionsummary0003.find({
        where : W,
      });
    }
    ///////////////////////////////////////
    //For 0003 end
    ///////////////////////////////////////
    ///////////////////////////////////////
    //For 0004 start
    ///////////////////////////////////////
    if(inputs.projectname ==  'floyd'){
      R = await Regressionsummary0004.find({
        where : W,
      });
    }
    ///////////////////////////////////////
    //For 0004 end
    ///////////////////////////////////////
    let groupstatus = [];
    for(let r=0;r<R.length;r++){
      let onegroup = await Groups.findOne({
        groupname : R[r].groupname,
        projectname : inputs.projectname,
        variantname : inputs.variantname,
        isBAPU      : inputs.isBAPU
      });
      sails.log(onegroup.DVgroup);
      sails.log(onegroup.groupname);
      sails.log(onegroup.owner);
      groupstatus.push({
        projectname : inputs.projectname,
        variantname : inputs.variantname,
        changelist  : inputs.changelist,
        isBAPU      : inputs.isBAPU,
        shelve      : inputs.shelve,
        kickoffdate : inputs.kickoffdate,
        owner       : onegroup.owner,
        DVgroup     : onegroup.DVgroup,
        groupname   : R[r].groupname,
        passrate    : R[r].passrate,
        allnum      : R[r].testlist,
        passnum     : R[r].passlist,
        failnum     : R[r].faillist,
        unknownnum  : R[r].unknownlist,
        runningnum  : R[r].runninglist
      });
    }
    return exits.success(JSON.stringify({
      ok  : 'ok',
      groupstatus : groupstatus
    }));
    // All done.

  }


};
