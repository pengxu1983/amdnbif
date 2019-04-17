module.exports = {


  friendlyName: 'Getcommonsanitystatus',


  description: 'Getcommonsanitystatus common sanity.',


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
    sails.log('/sanitys/common-sanity/getcommonsanitystatus');
    sails.log(inputs);
    if(inputs.tree  ==  'MAIN'){
      let sanity_lastcheckedCL='NA';
      let sanity_result='NA';
      let sanity_lastpassCL='NA';
      let sanity_brokenCL='NA';
      let sanity_brokenCLowner='NA';
      let sanity_details='NA';
      let sanity_valid=await Common_sanitys.find({
        id  : {'>=':0}
      });
      let dcelab_lastcheckedCL='NA';
      let dcelab_result='NA';
      let dcelab_lastpassCL='NA';
      let dcelab_brokenCL='NA';
      let dcelab_brokenCLowner='NA';
      let dcelab_details='NA';
      let dcelab_valid=await Common_tasks.find({
        taskname  : 'dcelab'
      });
      //=============================================
      /////////////////////////////////
      //sanity
      /////////////////////////////////
      let sanity_R = await Buffer_changelists.find({
        ischecked : 'yes',
        results   : {'!=':'NA'}
      });
      if(sanity_R.length == 0){
      }
      else{
      /////////////////////////////////
      //sanity_lastcheckedCL
      /////////////////////////////////
        for(let r=0;r<sanity_R.length;r++){
          if(r==0){
            sanity_lastcheckedCL  = sanity_R[r].changelist;
          }
          else if(parseInt(sanity_R[r].changelist)>parseInt(sanity_lastcheckedCL)){
            sanity_lastcheckedCL  = sanity_R[r].changelist;
          }
        }
      /////////////////////////////////
      //sanity_details
      /////////////////////////////////
        let sanity_details_R = await Buffer_changelists.findOne({
          changelist  :  sanity_lastcheckedCL
        });
        sanity_details  = sanity_details_R.results;
      /////////////////////////////////
      //sanity_result
      /////////////////////////////////
        if(sanity_details_R.isBroken == 'no'){
          sanity_result = 'PASS';
        }
        else if(sanity_details_R.isBroken == 'yes'){
          sanity_result = 'FAIL';
        }
      /////////////////////////////////
      //sanity_lastpassCL
      /////////////////////////////////
        if(sanity_details_R.isBroken == 'no'){
          sanity_lastpassCL = sanity_lastcheckedCL;
        }
        else if(sanity_details_R.isBroken == 'yes'){
          let sanity_lastpassCL_R = await Buffer_changelists.find({
            ischecked : 'yes',
            isBroken  : 'no',
            results   : {'!=':'NA'}
          });
          for(let r=0;r<sanity_lastpassCL_R.length;r++){
            if(r==0){
              sanity_lastpassCL = sanity_lastpassCL_R[r].changelist;
            }
            else if(parseInt(sanity_lastpassCL_R[r].changelist)>parseInt(sanity_lastpassCL)){
              sanity_lastpassCL = sanity_lastpassCL_R[r].changelist;
            }
          }
        }
      /////////////////////////////////
      //sanity_lastcheckedCL
      /////////////////////////////////
      /////////////////////////////////
      //sanity_lastcheckedCL
      /////////////////////////////////
      }
      /////////////////////////////////
      //dcelab
      /////////////////////////////////
      let dcelab_R = await Buffer_changelists.find({
        dcelabischecked : 'yes',
        dcelab          : {'!=':'NA'}
      });
      if(dcelab_R.length == 0){
      }
      else{
      /////////////////////////////////
      //dcelab_lastcheckedCL
      /////////////////////////////////
        for(let r=0;r<dcelab_R.length;r++){
          if(r==0){
            dcelab_lastcheckedCL  = dcelab_R[r].changelist;
          }
          else if(parseInt(dcelab_R[r].changelist)>parseInt(dcelab_lastcheckedCL)){
            dcelab_lastcheckedCL  = dcelab_R[r].changelist;
          }
        }
      /////////////////////////////////
      //dcelab_details
      /////////////////////////////////
        let dcelab_details_R = await Buffer_changelists.findOne({
          changelist  :  dcelab_lastcheckedCL
        });
        dcelab_details  = dcelab_details_R.dcelab;
      /////////////////////////////////
      //dcelab_result
      /////////////////////////////////
        if(dcelab_details_R.dcelabisBroken  == 'no'){
          dcelab_result = 'PASS';
        }
        else if(dcelab_details_R.dcelabisBroken == 'yes'){
          dcelab_result = 'FAIL';
        }
      /////////////////////////////////
      //dcelab_lastpassCL
      /////////////////////////////////
        if(dcelab_details_R.dcelabisBroken == 'no'){
          dcelab_lastpassCL = dcelab_lastcheckedCL;
        }
        else if(dcelab_details_R.dcelabisBroken == 'yes'){
          let dcelab_lastpassCL_R = await Buffer_changelists.find({
            dcelabischecked : 'yes',
            dcelabisBroken  : 'no',
            dcelab   : {'!=':'NA'}
          });
          for(let r=0;r<dcelab_lastpassCL_R.length;r++){
            if(r==0){
              dcelab_lastpassCL = dcelab_lastpassCL_R[r].changelist;
            }
            else if(parseInt(dcelab_lastpassCL_R[r].changelist)>parseInt(dcelab_lastpassCL)){
              dcelab_lastpassCL = dcelab_lastpassCL_R[r].changelist;
            }
          }
        }
      /////////////////////////////////
      //sanity_lastcheckedCL
      /////////////////////////////////
      /////////////////////////////////
      //sanity_lastcheckedCL
      /////////////////////////////////
      }
      ////sanity_lastcheckedCL
      /////////////////////////////
      //let R = await Buffer_changelists.find({//TODOTREE
      //  ischecked : 'yes',
      //  results   : {'!=':'NA'}
      //});
      //if(R.length == 0){
      //}
      //else{
      //  for(let r=0;r<R.length;r++){
      //    if(r==0){
      //      sanity_lastcheckedCL  = R[r].changelist;
      //    }
      //    else if(parseInt(sanity_lastcheckedCL)<parseInt(R[r].changelist)){
      //      sanity_lastcheckedCL  = R[r].changelist;
      //    }
      //    ///////////////////////////
      //    //sanity_result
      //    ///////////////////////////
      //    if(R[r].isBroken  ==  'no'){
      //      sanity_result = 'PASS';
      //      ///////////////////////////
      //      //sanity_lastpassCL
      //      ///////////////////////////
      //      sanity_lastpassCL = sanity_lastcheckedCL;
      //    }
      //    else if(R[r].isBroken  ==  'yes'){
      //      sanity_result = 'FAIL';
      //      ///////////////////////////
      //      //sanity_lastpassCL
      //      ///////////////////////////
      //      let RR = await Buffer_changelists.find({//TODOTREE
      //        ischecked : 'yes',
      //        isBroken  : 'no'
      //      });
      //      for(let rr=0;rr<RR.length;rr++){
      //        if(rr==0){
      //          sanity_lastpassCL = RR[rr].changelist;
      //        }
      //        else if(parseInt(sanity_lastpassCL)<parseInt(RR[rr].changelist)){
      //          sanity_lastpassCL = RR[rr].changelist;
      //        }
      //      }
      //      ///////////////////////////
      //      //sanity_brokenCL
      //      ///////////////////////////
      //      sanity_brokenCL = R[r].brokenCL;
      //      ///////////////////////////
      //      //sanity_brokenCLowner
      //      ///////////////////////////
      //      RR = await Buffer_changelists.findOne({//TODOTREE
      //        changelist  : sanity_brokenCL
      //      });
      //      if(RR){
      //        sanity_brokenCLowner  = RR.owner;
      //      }
      //    }
      //    ///////////////////////////
      //    //sanity_details
      //    ///////////////////////////
      //    sanity_details  = R[r].results;
      //  }
      //  
      //}
      ////=============================================
      /////////////////////////////
      ////dcelab_lastcheckedCL
      /////////////////////////////
      //R = await Buffer_changelists.find({//TODOTREE
      //  dcelabischecked : 'yes',
      //  dcelab          : {'!=':'NA'}
      //});
      //if(R.length == 0){
      //}
      //else{
      //  for(let r=0;r<R.length;r++){
      //    if(r==0){
      //      dcelab_lastcheckedCL  = R[r].changelist;
      //    }
      //    else if(parseInt(dcelab_lastcheckedCL)<parseInt(R[r].changelist)){
      //      dcelab_lastcheckedCL  = R[r].changelist;
      //    }
      //    ///////////////////////////
      //    //dcelab_result
      //    ///////////////////////////
      //    if(R[r].dcelabisBroken  ==  'no'){
      //      dcelab_result = 'PASS';
      //      ///////////////////////////
      //      //dcelab_lastpassCL
      //      ///////////////////////////
      //      dcelab_lastpassCL = dcelab_lastcheckedCL;
      //    }
      //    else if(R[r].dcelabisBroken  ==  'yes'){
      //      dcelab_result = 'FAIL';
      //      ///////////////////////////
      //      //dcelab_lastpassCL
      //      ///////////////////////////
      //      let RR = await Buffer_changelists.find({//TODOTREE
      //        dcelabischecked : 'yes',
      //        dcelabisBroken  : 'no'
      //      });
      //      for(let rr=0;rr<RR.length;rr++){
      //        if(rr==0){
      //          dcelab_lastpassCL = RR[rr].changelist;
      //        }
      //        else if(parseInt(dcelab_lastpassCL)<parseInt(RR[rr].changelist)){
      //          dcelab_lastpassCL = RR[rr].changelist;
      //        }
      //      }
      //      ///////////////////////////
      //      //dcelab_brokenCL
      //      ///////////////////////////
      //      sails.log('DBG1');
      //      sails.log(dcelab_brokenCL);
      //      dcelab_brokenCL = R[r].dcelabbrokenCL;
      //      sails.log(dcelab_brokenCL);
      //      ///////////////////////////
      //      //dcelab_brokenCLowner
      //      ///////////////////////////
      //      RR = await Buffer_changelists.findOne({//TODOTREE
      //        changelist  : dcelab_brokenCL
      //      });
      //      if(RR){
      //        dcelab_brokenCLowner  = RR.owner;
      //      }
      //    }
      //    ///////////////////////////
      //    //dcelab_details
      //    ///////////////////////////
      //    dcelab_details = R[r].dcelab;
      //  }
      //}
      return exits.success(JSON.stringify({
        ok                    : 'ok',
        sanity_lastcheckedCL  : sanity_lastcheckedCL ,
        sanity_result         : sanity_result        ,
        sanity_lastpassCL     : sanity_lastpassCL    ,
        sanity_brokenCL       : sanity_brokenCL      ,
        sanity_brokenCLowner  : sanity_brokenCLowner ,
        sanity_details        : sanity_details       ,
        sanity_valid          : sanity_valid         ,
        dcelab_lastcheckedCL  : dcelab_lastcheckedCL ,
        dcelab_result         : dcelab_result        ,
        dcelab_lastpassCL     : dcelab_lastpassCL    ,
        dcelab_brokenCL       : dcelab_brokenCL      ,
        dcelab_brokenCLowner  : dcelab_brokenCLowner ,
        dcelab_details        : dcelab_details       ,
        dcelab_valid          : dcelab_valid
      }));
    }
  }
};
