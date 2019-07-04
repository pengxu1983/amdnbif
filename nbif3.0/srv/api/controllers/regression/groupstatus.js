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
        let R = Regressionsummary0001.find({
          where : W,
          sort  : 'DVgroup ASC'
        });
        return exits.success(JSON.stringify({
          ok  : 'ok',
          groupstatus : R
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
