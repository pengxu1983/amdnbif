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
        let a = JSON.parse(R[t].valid);
        return exits.success(JSON.stringify({
          ok  : 'ok',
          a   : a
        }));
      }
    }
    // All done.

  }


};
