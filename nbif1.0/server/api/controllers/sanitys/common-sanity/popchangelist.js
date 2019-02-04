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
      //Find latest
      let latestchangelist ={};
      for(let i=0;i<changelists.length;i++){
        if(i==0){
          latestchangelist.changelist   = changelists[i].changelist;
          latestchangelist.owner        = changelists[i].owner;
        }
        else{
          if(parseInt(changelists[i].changelist) > parseInt(latestchangelist)){
            latestchangelist.changelist   = changelists[i].changelist;
            latestchangelist.owner        = changelists[i].owner;
          }
          else {
            //ignore
          }
        }
      }
    }
    if(changelists = []){
      return exits.success({
        ok          : 'ok',
        changelist  : 'NA',
        owner       : 'NA'
      });
    }
    else {
      return exits.success({
        ok          : 'ok',
        changelist  : latestchangelist.changelist,
        owner       : latestchangelist.owner
      });
    }
  }


};
