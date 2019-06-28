module.exports = {


  friendlyName: 'Get',


  description: 'Get regression.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/get');
    sails.log(inputs);
    if(inputs.projectname =='mi200'){
      if(inputs.kind  ==  'Overall'){
        let R = await Regressionsummary0001.find({
          projectname : inputs.projectname,
          groupname   : 'all'
        });
        if(R.length == 0){
          return exits.success(JSON.stringify({
            ok  : 'notok',
            msg : 'no valid regression'
          }));
        }
        else{
          return exits.success(JSON.stringify({
            ok  : 'ok',
            projectname : R.projectname,
            variantname : R.variantname,
            passnum     : R.passlist.length,
            failnum     : R.faillist.length,
            unknownnum  : R.unknownnum.length,
            passrate    : R.passrate
          }));
        }
      }
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'not valid kind'
    }));

  }


};
