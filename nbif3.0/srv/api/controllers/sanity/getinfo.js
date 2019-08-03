module.exports = {


  friendlyName: 'Getinfo',


  description: 'Getinfo sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    },
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanity/getinfo');
    sails.log(inputs);
    if(inputs.kind  ==  'all'){
    }
    else if(inputs.kind ==  'sanity'){
      let tasks = await Sanitytasks.find({
        projectname : inputs.projectname
      });
      return  exits.success(JSON.stringify({
        ok  : 'ok',
        tasks : JSON.stringify(tasks)
      }));
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'not valid kind'
    }));

  }


};
