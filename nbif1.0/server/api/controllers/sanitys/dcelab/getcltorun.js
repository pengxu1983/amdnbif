module.exports = {


  friendlyName: 'Getcltorun',


  description: 'Getcltorun dcelab.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    tree  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/dcelab/getcltorun');
    sails.log(inputs);
    let all_MAIN = await Buffer_changelists.find({
      id  : {'>=':0}
    });
    if(all_MAIN.length == 0){
    }
    else if(all_MAIN.length > 50){
      let changelist ;
      for(let a=0;a<all_MAIN.length;a++){
        if(a==0){
          changelist = all_MAIN[a].changelist;
        }
        else if(parseInt(changelist) > parseInt(all_MAIN[a].changelist)){
          changelist = all_MAIN[a].changelist;
        }
      }
      await Buffer_changelists.destroy({
        changelist  : changelist
      });
    }
    let all_NV21 = await Buffer_changelists_01.find({
      id  : {'>=':0}
    });
    if(all_NV21.length == 0){
    }
    else if(all_NV21.length > 50){
      let changelist ;
      for(let a=0;a<all_NV21.length;a++){
        if(a==0){
          changelist = all_NV21[a].changelist;
        }
        else if(parseInt(changelist) > parseInt(all_NV21[a].changelist)){
          changelist = all_NV21[a].changelist;
        }
      }
      await Buffer_changelists_01.destroy({
        changelist  : changelist
      });
    }
    if(inputs.tree == 'MAIN'){
      if(inputs.kind == 'getcltorun'){
        let lastcheckedCL ;
        let R = await Buffer_changelists.find({
          //ischecked : 'yes',
          dcelab    : 'NA'
        });
        if(R.length == 0){
          return exits.success(JSON.stringify({
            ok  : 'notok',
            msg : 'no result found'
          }));
        }
        else{
          //find the latest
          for(let r=0;r<R.length;r++){
            if(r==0){
              lastcheckedCL = R[r].changelist;
            }
            else if(parseInt(R[r].changelist)>parseInt(lastcheckedCL)){
              lastcheckedCL = R[r].changelist;
            }
          }
        }
        return exits.success(JSON.stringify({
          ok  : 'ok',
          lastcheckedCL : lastcheckedCL
        }));
      }
    }
    if(inputs.tree == 'NV21'){
      if(inputs.kind == 'getcltorun'){
        let lastcheckedCL ;
        let R = await Buffer_changelists_01.find({
          //ischecked : 'yes',
          dcelab    : 'NA'
        });
        if(R.length == 0){
          return exits.success(JSON.stringify({
            ok  : 'notok',
            msg : 'no result found'
          }));
        }
        else{
          //find the latest
          for(let r=0;r<R.length;r++){
            if(r==0){
              lastcheckedCL = R[r].changelist;
            }
            else if(parseInt(R[r].changelist)>parseInt(lastcheckedCL)){
              lastcheckedCL = R[r].changelist;
            }
          }
        }
        return exits.success(JSON.stringify({
          ok  : 'ok',
          lastcheckedCL : lastcheckedCL
        }));
      }
    }
    // All done.

  }


};
