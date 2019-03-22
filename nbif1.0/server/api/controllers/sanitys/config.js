module.exports = {


  friendlyName: 'Config',


  description: 'Config sanitys.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    testname  :  {
      type  : 'string'
    },
    taskname  : {
      type  : 'string'
    },
    valid     : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/config');
    sails.log(inputs);
    if(inputs.kind  ==  'testupdate'){
      let R = await Common_sanitys.findOne({
        testname  : inputs.testname
      });
      if(R){
        await Common_sanitys.update({
          testname  : inputs.testname
        },{
          valid     : inputs.valid
        });
      }
      else{
        //not allow now FIXME
      }
      return  exits.success(JSON.stringify({
        ok  : 'ok'
      }));
    }
    else if(inputs.kind == 'taskupdate'){
      let R = await Common_tasks.findOne({
        taskname  : inputs.taskname
      });
      if(R){
        await Common_tasks.update({
          taskname  : inputs.taskname
        },{
          valid     : inputs.valid
        });
      }
      else{
        await Common_tasks.create({
          taskname  : inputs.taskname,
          valid     : inputs.valid
        });
      }
    }
    // All done.
    //return;

  }


};
