module.exports = {


  friendlyName: 'Getcommonsanitystatus',


  description: 'Getcommonsanitystatus common sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/common-sanity/getcommonsanitystatus');
    sails.log(inputs);
    if(inputs.kind == 'sanityStatus'){
      sails.log('on');
      let results = await Buffer_changelists.find({
        ischecked : 'yes',
        results   : {'!=':'NA'}
      });
      let resultsToPop = results;
      if(results.length == 0){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'no result found'
        }));
      }
      else {
        //find latest
        let lastcheckedCL ;
        for(let r=0;r<results.length;r++){
          if(r==0){
            lastcheckedCL = results[r];
          }
          else if(parseInt(results[r].changelist)>parseInt(lastcheckedCL.changelist)){
            lastcheckedCL = results[r];
          }
        }
        if(lastcheckedCL.brokenCL != 'NA'){
          let brokenCL = await Buffer_changelists.findOne({
            changelist  : lastcheckedCL.brokenCL
          });
          return exits.success(JSON.stringify({
            ok  : 'ok',
            lastcheckedCL: lastcheckedCL.changelist,
            result    : lastcheckedCL.isBroken,
            brokenCL  : lastcheckedCL.brokenCL,
            brokenCLowner : brokenCL.owner,
            dcelab    : lastcheckedCL.dcelab
          }));
        }
        else if(lastcheckedCL.brokenCL == 'NA'){
          return exits.success(JSON.stringify({
            ok  : 'ok',
            lastcheckedCL: lastcheckedCL.changelist,
            result    : lastcheckedCL.isBroken,
            brokenCL  : lastcheckedCL.brokenCL,
            brokenCLowner : 'NA',
            dcelab    : lastcheckedCL.dcelab
          }));
        }

      }
    }
    // All done.

  }


};
