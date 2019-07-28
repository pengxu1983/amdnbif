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
      let isBAPU;
      R = await Projects.findOne({
        projectname : inputs.projectname
      });
      let BAPUoptions = ['no'];
      if(R.hasBAPU  ==  'yes'){
        BAPUoptions.push('yes');
      }
      for(let i=0;i<BAPUoptions.length;i++){
        isBAPU  = BAPUoptions[i];
        let groups = await Groups.find({
          isBAPU  : isBAPU,
          projectname : inputs.projectname,
          variantname : inputs.variantname,
          DVgroup     : inputs.DVgroup
        });
        for(let g=0;g<groups.length;g++){
          groupname = groups[g].groupname;
          let R = await Regressiontarget.findOne({
            targetdate  : moment().day(1-2*7),
            groupname   : groupname,
            projectname : inputs.projectname,
            variantname : inputs.variantname,
            isBAPU      : isBAPU
          });
          if(R){
            ActPRm2 = R.actpassrate;
            TargetPRm2  = R.TargetPRm2;
          }
          R = await Regressiontarget.findOne({
            targetdate  : moment().day(1-1*7),
            groupname   : groupname,
            projectname : inputs.projectname,
            variantname : inputs.variantname,
            isBAPU      : isBAPU
          });
          if(R){
            ActPRm1 = R.actpassrate;
            TargetPRm1  = R.TargetPRm1;
          }
          R = await Regressiontarget.findOne({
            targetdate  : moment().day(1),
            groupname   : groupname,
            projectname : inputs.projectname,
            variantname : inputs.variantname,
            isBAPU      : isBAPU
          });
          if(R){
            ActPR0  = R.actpassrate;
            TargetPR0 = R.TargetPR0;
          }
          R = await Regressiontarget.findOne({
            targetdate  : moment().day(1+7),
            groupname   : groupname,
            projectname : inputs.projectname,
            variantname : inputs.variantname,
            isBAPU      : isBAPU
          });
          if(R){
            ActPR1  = R.actpassrate;
            TargetPR1 = R.TargetPR1;
            comment = R.comment;
          }
          featuregroups.push({
            groupname : groupname,
            isBAPU    : isBAPU,
            ActPRm2   : ActPRm2,
            TargetPRm2  : TargetPRm2,
            ActPRm1   : ActPRm1,
            TargetPRm1  : TargetPRm1,
            ActPR0    : ActPR0,
            TargetPR0 : TargetPR0,
            ActPR1    : ActPR1,
            TargetPR1 : TargetPR1,
            comment   : comment
          });
        }
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        featuregroups : featuregroups
      }));
    }
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'not valid kind'
    }));

  }


};
