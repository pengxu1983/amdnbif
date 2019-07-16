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
    isBACO      : {
      type  : 'string'
    },
    shelve      : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/groupstatus');
    sails.log(inputs);
    if(inputs.kind  ==  'all'){
      if(inputs.projectname ==  'mi200'){
        let W = {
          projectname : inputs.projectname,
          variantname : inputs.variantname,
          changelist  : inputs.changelist,
          isBAPU      : inputs.isBAPU,
          isBACO      : inputs.isBACO,
          shelve      : inputs.shelve,
          groupname   : {'!=':'all'}
        };
        let R = await Regressionsummary0001.find({
          where : W,
        });
        let groupstatus = [];
        for(let r=0;r<R.length;r++){
          let onegroup = await Groups.findOne({
            groupname : R[r].groupname,
            projectname : inputs.projectname,
            variantname : inputs.variantname,
            isBACO      : inputs.isBACO,
            isBAPU      : inputs.isBAPU
          });
          sails.log(onegroup.DVgroup);
          groupstatus.push({
            DVgroup : onegroup.DVgroup,
            groupname : R[r].groupname,
            passrate  : R[r].passrate
          });
        }
        return exits.success(JSON.stringify({
          ok  : 'ok',
          groupstatus : groupstatus
        }));
      }
      ///////////////////////////////////////
      //For 0002 mero
      ///////////////////////////////////////
      else if(inputs.projectname  =='mero'){
        let W = {
          projectname : inputs.projectname,
          variantname : inputs.variantname,
          changelist  : inputs.changelist,
          isBAPU      : inputs.isBAPU,
          isBACO      : inputs.isBACO,
          shelve      : inputs.shelve,
          groupname   : {'!=':'all'}
        };
        let R = await Regressionsummary0002.find({
          where : W,
        });
        let groupstatus = [];
        for(let r=0;r<R.length;r++){
          let onegroup = await Groups.findOne({
            groupname : R[r].groupname,
            projectname : inputs.projectname,
            variantname : inputs.variantname,
            isBACO      : inputs.isBACO,
            isBAPU      : inputs.isBAPU
          });
          sails.log(onegroup.DVgroup);
          groupstatus.push({
            DVgroup : onegroup.DVgroup,
            groupname : R[r].groupname,
            passrate  : R[r].passrate
          });
        }
        return exits.success(JSON.stringify({
          ok  : 'ok',
          groupstatus : groupstatus
        }));
      }
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'not valid kind'
    }));

  }


};
