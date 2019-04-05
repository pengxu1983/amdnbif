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
    if(inputs.tree == 'MAIN'){
      if(inputs.kind == 'getcltorun'){
        let all = await Buffer_changelists.find({
          id  : {'>=':0}
        });
        if(all.length == 0){
        }
        else if(all.length > 50){
          let changelist ;
          for(let a=0;a<all.length;a++){
            if(a==0){
              changelist = all[a].changelist;
            }
            else if(parseInt(changelist) > parseInt(all[a].changelist)){
              changelist = all[a].changelist;
            }
          }
          await Buffer_changelists.destroy({
            changelist  : changelist
          });
        }
        let lastcheckedCL ;
        let R = await Buffer_changelists.find({
          //ischecked : 'yes',
          dcelabischecked : 'no'
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
        let all = await Buffer_changelists_01.find({
          id  : {'>=':0}
        });
        if(all.length == 0){
        }
        else if(all.length > 50){
          let changelist ;
          for(let a=0;a<all.length;a++){
            if(a==0){
              changelist = all[a].changelist;
            }
            else if(parseInt(changelist) > parseInt(all[a].changelist)){
              changelist = all[a].changelist;
            }
          }
          await Buffer_changelists_01.destroy({
            changelist  : changelist
          });
        }
        let lastcheckedCL ;
        let R = await Buffer_changelists_01.find({
          //ischecked : 'yes',
          dcelabischecked : 'no'
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
