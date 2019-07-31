module.exports = {


  friendlyName: 'Tasksupload',


  description: 'Tasksupload sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    tasks : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanity/tasksupload');
    sails.log(inputs);
    if(inputs.kind == 'all'){
      let tasks = JSON.parse(inputs.tasks);
      await Sanitytasks.destroy({
        id :{'>=':0}
      });
      for(let t=0;t<tasks.length;t++){
        await Sanitytasks.create(tasks[t]);
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        msg : 'tasks upload done'
      }));
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'not valid kind'
    }));

  }


};
