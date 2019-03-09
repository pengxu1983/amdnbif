module.exports = {


  friendlyName: 'Getcltorun',


  description: 'Getcltorun dcelab.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/dcelab/getcltorun');
    sails.log(inputs);
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
    if(inputs.kind == 'getcltorun'){
      let lastcheckedCL ;
      let R = await Buffer_changelists.find({
        ischecked : 'yes',
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
    // All done.

  }


};
