module.exports = {


  friendlyName: 'Popchangelist',


  description: 'Popchangelist common sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/common-sanity/popchangelist');
    sails.log(inputs);
    if(inputs.kind == 'poplatest'){
      let changelists = await Buffer_changelists.find({
        id : {'>=': 0}
      });
        sails.log('DBG0');
        sails.log(changelists);
      if(changelists.length ==0){
        sails.log('DBG1');
        sails.log(changelists);
        return exits.success({
          ok          : 'ok',
          changelist  : 'NA',
          owner       : 'NA'
        });
      }
      else {
        sails.log('DBG2');
        sails.log(changelists);
        //Find latest
        let latestchangelist ;
        let owner;
        for(let i=0;i<changelists.length;i++){
          if(i==0){
            latestchangelist  = changelists[i].changelist;
            owner             = changelists[i].owner;
          }
          else{
            sails.log('DBG3');
            sails.log(parseInt(changelists[i].changelist));
            sails.log(parseInt(latestchangelist));
            if(parseInt(changelists[i].changelist) > parseInt(latestchangelist)){
              latestchangelist  = changelists[i].changelist;
              owner             = changelists[i].owner;
            }
            else {
              //ignore
            }
          }
        }
        sails.log(latestchangelist);
        return exits.success({
          ok          : 'ok',
          changelist  : latestchangelist,
          owner       : owner
        });
      }
    }
    else if(inputs.kind == 'popearliest'){
      let earliestchangelist;
      let owner;
      let changelists = await Buffer_changelists.find({
        ischecked : 'no'
        //id : {'>=': 0}
      });
      sails.log('DBG4');
      if(changelists.length == 0){
        sails.log('DBG5');
        return exits.success({
          ok          : 'ok',
          changelist  : 'NA',
          owner       : 'NA'
        });
      }
      else{
        sails.log('DBG6');
        sails.log(changelists);
        for(let i=0;i<changelists.length;i++){
          if(i==0){
            earliestchangelist  = changelists[i].changelist;
            owner               = changelists[i].owner;
          }
          else{
            if(parseInt(changelists[i].changelist) < parseInt(earliestchangelist)){
              earliestchangelist  = changelists[i].changelist;
              owner               = changelists[i].owner;
            }
          }
        }
        sails.log('DBG7');
        sails.log(earliestchangelist);
        await Buffer_changelists.update({
          changelist  : earliestchangelist
        },{
          ischecked   : 'yes'
        });
        return exits.success({
          ok          : 'ok',
          changelist  : earliestchangelist,
          owner       : owner
        });
      }
    }
  }


};
