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
        let a = R[t];
        let b = typeof(R[t]);
        return exits.success(JSON.stringify({
          ok  : 'ok',
          a   : a,
          b   : b
        }));
      }
    }
    // All done.

  }


};
