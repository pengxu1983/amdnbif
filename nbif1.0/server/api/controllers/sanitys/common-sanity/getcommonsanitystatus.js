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
        let brokenCLowner = await Buffer_changelists.findOne({
          changelist  : lastcheckedCL.changelist
        });
        return exits.success(JSON.stringify({
          ok  : 'ok',
          lastCL  : lastcheckedCL.changelist,
          brokenCL  : lastcheckedCL.brokenCL,
          brokenCLowner : brokenCLowner
        }));

      }
    }
    // All done.

  }


};
