module.exports = {


  friendlyName: 'Upload',


  description: 'Upload trees.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    trees : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/trees/upload');
    sails.log(inputs);
    if(inputs.kind  ==  'all'){
      await Trees.destroy({
        id  : {'>=':0}
      });
      let trees = JSON.parse(inputs.trees);
      for(let t=0;t<trees.length;t++){
        trees[t].checkmask  = JSON.stringify(trees[t].checkmask);
        let R = await Trees.findOne(trees[t]);
        if(R){
        }
        else{
          await Trees.create(trees[t]);
        }
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        msg : 'uploaded'
      }));
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
