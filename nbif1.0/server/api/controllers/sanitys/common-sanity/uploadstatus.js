module.exports = {


  friendlyName: 'Uploadstatus',


  description: 'Uploadstatus common sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    changelist : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    testname : {
      type  : 'string'
    },
    result  : {
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
    sails.log('/sanitys/common-sanity/uploadstatus');
    sails.log(inputs);
    ///////////
    ///////////
    ///////////
    if(inputs.tree == 'NV21'){
      sails.log('NV21');
      if(inputs.kind == 'singlechangelist'){
        let results = JSON.parse(inputs.results);
        sails.log('singlechangelist');
        sails.log(results);
        //all variants
        let variants  = await Variants.find({
          id  : {'>=':0}
        });
        //all tests
        let tests = await Common_sanitys.find({
          id  : {'>=':0}
        });
        //check if current CL is brocken
        let currentChangelistIsBroken = 'no';
        for(let v=0;v<variants.length;v++){
          for(let t=0;t<tests.length;t++){
            if(results[variants[v].variantname][tests[t].testname] == 'FAIL'){
              let valid = JSON.parse(tests[t].valid);
              sails.log(inputs.tree);
              sails.log(valid[inputs.tree]);
              sails.log(typeof(valid[inputs.tree]));
              sails.log(variants[v].variantname);
              sails.log(typeof(variants[v].variantname));
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
          isBroken  : 'yes'
        });
        let checkedCLs = await Buffer_changelists_01.find({
          ischecked : 'yes',
          results   : {'!=':'NA'}
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
          results   : inputs.results,
          isBroken  : currentChangelistIsBroken,
          brokenCL  : brokenCL
        });
        return exits.success({
          ok  : 'ok'
        });
      }
    }
    if(inputs.tree == 'MAIN'){
      sails.log('MAIN');
      if(inputs.kind == 'singlechangelist'){
        let results = JSON.parse(inputs.results);
        sails.log('singlechangelist');
        sails.log(results);
        //all variants
        let variants  = await Variants.find({
          id  : {'>=':0}
        });
        //all tests
        let tests = await Common_sanitys.find({
          id  : {'>=':0}
        });
        //check if current CL is brocken
        let currentChangelistIsBroken = 'no';
        for(let v=0;v<variants.length;v++){
          for(let t=0;t<tests.length;t++){
            if(results[variants[v].variantname][tests[t].testname] == 'FAIL'){
              let valid = JSON.parse(tests[t].valid);
              sails.log(inputs.tree);
              sails.log(valid[inputs.tree]);
              sails.log(typeof(valid[inputs.tree]));
              sails.log(variants[v].variantname);
              sails.log(typeof(variants[v].variantname));
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
          isBroken  : 'yes'
        });
        let checkedCLs = await Buffer_changelists.find({
          ischecked : 'yes',
          results   : {'!=':'NA'}
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
          results   : inputs.results,
          isBroken  : currentChangelistIsBroken,
          brokenCL  : brokenCL
        });
        return exits.success({
          ok  : 'ok'
        });
      }
    }
    // All done.

  }


};
