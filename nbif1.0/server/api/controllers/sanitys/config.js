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
    },
    data      : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/config');
    sails.log(inputs);
    if(inputs.kind  ==  'testupdate'){
      await Common_sanitys.destroy({
        id  : {'>=':0}
      });
      let data = JSON.parse(inputs.data);
      sails.log(typeof(data));
      for(let d=0;d<data.length;d++){
        await Common_sanitys.create({
          testname  : data[d].testname,
          valid     : data[d].valid
        });
      }
      //let R = await Common_sanitys.findOne({
      //  testname  : inputs.testname
      //});
      //if(R){
      //  await Common_sanitys.update({
      //    testname  : inputs.testname
      //  },{
      //    valid     : inputs.valid
      //  });
      //}
      //else{
      //  //not allow now FIXME
      //}
      return  exits.success(JSON.stringify({
        ok  : 'ok'
      }));
    }
    else if(inputs.kind == 'taskupdate'){
      await Common_tasks.destroy({
        id  : {'>=':0}
      });
      let data = JSON.parse(inputs.data);
      sails.log(typeof(data));
      for(let d=0;d<data.length;d++){
        await Common_tasks.create({
          taskname  : data[d].taskname,
          valid     : data[d].valid
        });
      }
      //let R = await Common_tasks.findOne({
      //  taskname  : inputs.taskname
      //});
      //if(R){
      //  await Common_tasks.update({
      //    taskname  : inputs.taskname
      //  },{
      //    valid     : inputs.valid
      //  });
      //}
      //else{
      //  await Common_tasks.create({
      //    taskname  : inputs.taskname,
      //    valid     : inputs.valid
      //  });
      //}
    }
    // All done.
    //return;

  }


};
