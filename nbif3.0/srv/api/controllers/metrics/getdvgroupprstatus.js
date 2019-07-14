let moment =require('moment');
module.exports = {


  friendlyName: 'Getdvgroupprstatus',


  description: 'Getdvgroupprstatus metrics.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    DVgroup : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/metrics/getdvgroupprstatus');
    sails.log(inputs);
    // All done.
    if(inputs.kind  ==  'Bygrp'){
      //get all feature groups of this DVgroup
      let R;
      let featuregroups = [];
      let groupname;
      let ActPRm2   = 'NA';
      let TargetPRm2= 'NA';
      let ActPRm1   = 'NA';
      let TargetPRm1= 'NA';
      let ActPR0    = 'NA';
      let TargetPR0 = 'NA';
      let ActPR1    = 'NA';
      let TargetPR1 = 'NA';
      let comment   = 'NA';
      R = await Groups.find({
        projectname : inputs.projectname,
        variantname : inputs.variantname,
        DVgroup     : inputs.DVgroup
      });
      if(R.length ==0){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'no groups found'
        }));
      }
      else{
        for(let i=0;i<R.length;i++){
          //this is for one feature group
          //find 
          groupname = R[i].groupname;
          let date;
          date = moment().day(1-2*7);
          let Rm2 = await Regressiontarget.find({
            targetdate  : date,
            groupname   : groupname,
            projectname : inputs.projectname,
            variantname : inputs.variantname,
          });
          for(let i=0;i<RR.length;i++){
            ActPRm2 = RR[i].actpassrate
          }
        }
      }
    }
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'not valid kind'
    }));

  }


};
