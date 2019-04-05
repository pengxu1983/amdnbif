module.exports = {


  friendlyName: 'Uploadstatus',


  description: 'Uploadstatus dcelab.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    changelist : {
      type  : 'string'
    },
    results : {
      type  : 'string'
    },
    tree    : {
      type  : 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/dcelab/uploadstatus');
    sails.log(inputs);
    let results = JSON.parse(inputs.results);
    if(inputs.tree == 'MAIN'){
      if(inputs.kind == 'dcelabuploadstatus'){
        //all variants
        let variants  = await Variants.find({
          id  : {'>=':0}
        });
        //all tests
        let tasks = await Common_tasks.find({
          id  : {'>=':0}
        });
        for(let v=0;v<variants.length;v++){
          for(let t=0;t<tasks.length;t++){
            if(results[variants[v].variantname][tasks[t].taskname] == 'FAIL'){
              let valid = JSON.parse(tasks[t].valid);
            }
          }
        }
        await Buffer_changelists.update({
          changelist  : inputs.changelist
        },{
          dcelab  : inputs.results
        });
        return exits.success(JSON.stringify({
          ok  : 'ok'
        }));
      }
    }
  }


};
