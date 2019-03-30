module.exports = {


  friendlyName: 'Test',


  description: 'Test something.',


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
    let R = await Common_sanitys.find({
      id  : {'>=':0}
    });
    for(let t = 0;t<R.length;t++){
      if(t == 0){
        R[t] = JSON.parse(R[t]);
        return exits.success(JSON.stringify({
          ok  : 'ok',
          a   : R[t]
        }));
      }
    }
    // All done.

  }


};
