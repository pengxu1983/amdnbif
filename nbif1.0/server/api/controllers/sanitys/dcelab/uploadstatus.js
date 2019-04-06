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
    sails.log(results);
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
        let currentChangelistIsBroken = 'no';
        for(let v=0;v<variants.length;v++){
          for(let t=0;t<tasks.length;t++){
            if(results[tasks[t].taskname][variants[v].variantname] == 'FAIL'){
              let valid = JSON.parse(tasks[t].valid);
              if(valid[inputs.tree].indexOf(variants[v].variantname)==-1){
                //ignored
                sails.log('ignored');
                sails.log(variants[v].variantname);
              }
              else{
                currentChangelistIsBroken = 'yes';
              }
            }
          }
        }
        //check last CL if broken
        let brokenCLs = await Buffer_changelists.find({
          dcelabisBroken  : 'yes'
        });
        let checkedCLs = await Buffer_changelists.find({
          dcelabischecked : 'yes',
          dcelab  : {'!=':'NA'}
        });
        let brokenCL;
        if(brokenCLs.length == 0){// no changelist broken before
          if(currentChangelistIsBroken == 'yes'){
            //send email
            //set brokenCL 
            brokenCL = inputs.changelist;
          }
          else if(currentChangelistIsBroken == 'no'){
            //nothing
            brokenCL = 'NA';
          }
        }
        else{
          if(currentChangelistIsBroken == 'yes'){
            //find checked latest CL
            let lastCL;
            for(let s=0;s<checkedCLs.length;s++){
              if(s==0){
                lastCL = checkedCLs[s];
              }
              else{
                if(parseInt(checkedCLs[s].changelist)>parseInt(lastCL.changelist)){
                  lastCL = checkedCLs[s];
                }
              }
            }
            if(lastCL.isBroken == 'yes'){
              //nothing since previous CL is broken and already send mail
              brokenCL = lastCL.brokenCL;
            }
            else if(lastCL.isBroken == 'no'){
              //send email
              brokenCL = inputs.changelist;
            }
          }
          else if(currentChangelistIsBroken == 'no'){
            //nothing
            brokenCL = 'NA';
          }
        }
        await Buffer_changelists.update({
          changelist  : inputs.changelist
        },{
          dcelab  : inputs.results,
          dcelabisBroken  : currentChangelistIsBroken
        });
        return exits.success(JSON.stringify({
          ok  : 'ok'
        }));
      }
    }
    if(inputs.tree == 'NV21'){
      if(inputs.kind == 'dcelabuploadstatus'){
        //all variants
        let variants  = await Variants.find({
          id  : {'>=':0}
        });
        //all tests
        let tasks = await Common_tasks.find({
          id  : {'>=':0}
        });
        let currentChangelistIsBroken = 'no';
        for(let v=0;v<variants.length;v++){
          for(let t=0;t<tasks.length;t++){
            if(results[tasks[t].taskname][variants[v].variantname] == 'FAIL'){
              let valid = JSON.parse(tasks[t].valid);
              if(valid[inputs.tree].indexOf(variants[v].variantname)==-1){
                //ignored
                sails.log('ignored');
                sails.log(variants[v].variantname);
              }
              else{
                currentChangelistIsBroken = 'yes';
              }
            }
          }
        }
        //check last CL if broken
        let brokenCLs = await Buffer_changelists_01.find({
          dcelabisBroken  : 'yes'
        });
        let checkedCLs = await Buffer_changelists_01.find({
          dcelabischecked : 'yes',
          dcelab  : {'!=':'NA'}
        });
        let brokenCL;
        if(brokenCLs.length == 0){// no changelist broken before
          if(currentChangelistIsBroken == 'yes'){
            //send email
            //set brokenCL 
            brokenCL = inputs.changelist;
          }
          else if(currentChangelistIsBroken == 'no'){
            //nothing
            brokenCL = 'NA';
          }
        }
        else{
          if(currentChangelistIsBroken == 'yes'){
            //find checked latest CL
            let lastCL;
            for(let s=0;s<checkedCLs.length;s++){
              if(s==0){
                lastCL = checkedCLs[s];
              }
              else{
                if(parseInt(checkedCLs[s].changelist)>parseInt(lastCL.changelist)){
                  lastCL = checkedCLs[s];
                }
              }
            }
            if(lastCL.isBroken == 'yes'){
              //nothing since previous CL is broken and already send mail
              brokenCL = lastCL.brokenCL;
            }
            else if(lastCL.isBroken == 'no'){
              //send email
              brokenCL = inputs.changelist;
            }
          }
          else if(currentChangelistIsBroken == 'no'){
            //nothing
            brokenCL = 'NA';
          }
        }
        await Buffer_changelists_01.update({
          changelist  : inputs.changelist
        },{
          dcelab  : inputs.results,
          dcelabisBroken  : currentChangelistIsBroken
        });
        return exits.success(JSON.stringify({
          ok  : 'ok'
        }));
      }
    }
  }
};
