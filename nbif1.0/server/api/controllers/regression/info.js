module.exports = {


  friendlyName: 'Info',


  description: 'Info regression.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/info');
    sails.log(inputs);
    if(inputs.kind == 'regressioninfo'){
      let R ;
      R = await Buffer_changelists.find({
        ischecked : 'yes',
        isBroken  : 'no'
      });
      if(R.length == 0){
        let latestpasscl;
        for(let r=0;r<R.length;r++){
          if(r==0){
            latestpasscl  = R[r];
          }
          else if(parseInt(R[r].changelist) > parseInt(latestpasscl.changelist)){
            latestpasscl  = R[r];
          }
        }
      }
    }
    // All done.
    return;

  }


};
