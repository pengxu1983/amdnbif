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
            lastcheckedCL = R[r].changelist
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
