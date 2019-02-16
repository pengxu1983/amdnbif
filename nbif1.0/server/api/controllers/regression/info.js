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
      //find changelist to kickoff
      R = await Buffer_changelists.find({
        ischecked : 'yes',
        isBroken  : 'no',
        //regressionkickoff : 'no'
      });
      if(R.length == 0){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'no changelist to kickoff'
        }));
      }
      else{
        let latestpasscl;
        for(let r=0;r<R.length;r++){
          if(r==0){
            latestpasscl  = R[r];
          }
          else if(parseInt(R[r].changelist) > parseInt(latestpasscl.changelist)){
            latestpasscl  = R[r];
          }
        }
        //find project to kickoff//TODO
        return exits.success(JSON.stringify({
          ok  : 'ok',
          changelist : latestpasscl
        }));
      }
      
    }
    // All done.

  }


};
