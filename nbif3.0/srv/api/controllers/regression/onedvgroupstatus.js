module.exports = {


  friendlyName: 'Onedvgroupstatus',


  description: 'Onedvgroupstatus regression.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    DVgroup : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    kickoffdate : {
      type  : 'string'
    },
    isBAPU  : {
      type  : 'string'
    },
    changelist  : {
      type  : 'string'
    },
    shelve      : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/onedvgroupstatus');
    sails.log(inputs);
    if(inputs.kind  ==  'one'){
      let W0 = {
        projectname   :inputs.projectname,
        variantname   :inputs.variantname,
        kickoffdate   :inputs.kickoffdate,
        isBAPU        :inputs.isBAPU     ,
        changelist    :inputs.changelist ,
        shelve        :inputs.shelve     ,
        DVgroup       :inputs.DVgroup    ,
      };
      let R;
      ///////////////////////////////////////
      //For 0001 start
      ///////////////////////////////////////
      if(inputs.projectname ==  'mi200'){
        R = await Regressiondvgroup0001.findOne(W0);
      }
      ///////////////////////////////////////
      //For 0001 end
      ///////////////////////////////////////
      ///////////////////////////////////////
      //For 0002 start
      ///////////////////////////////////////
      if(inputs.projectname ==  'mero'){
        R = await Regressiondvgroup0002.findOne(W0);
      }
      ///////////////////////////////////////
      //For 0002 end
      ///////////////////////////////////////
      ///////////////////////////////////////
      //For 0003 start
      ///////////////////////////////////////
      if(inputs.projectname ==  'rembrandt'){
        R = await Regressiondvgroup0003.findOne(W0);
      }
      ///////////////////////////////////////
      //For 0003 end
      ///////////////////////////////////////
      ///////////////////////////////////////
      //For 0004 start
      ///////////////////////////////////////
      if(inputs.projectname ==  'floyd'){
        R = await Regressiondvgroup0004.findOne(W0);
      }
      ///////////////////////////////////////
      //For 0004 end
      ///////////////////////////////////////
      return exits.success(JSON.stringify({
        ok  : 'ok',
        DVgroupstatus : R
      }));
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'not valid kind'
    }));

  }


};
