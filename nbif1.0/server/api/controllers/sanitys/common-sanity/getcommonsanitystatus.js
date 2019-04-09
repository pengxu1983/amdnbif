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
        id  : {'>=':0}
      });
      //=============================================
      ///////////////////////////
      //sanity_lastcheckedCL
      ///////////////////////////
      let R = await Buffer_changelists.find({//TODOTREE
        ischecked : 'yes',
        results   : {'!=':'NA'}
      });
      if(R.length == 0){
      }
      else{
        for(let r=0;r<R.length;r++){
          if(r==0){
            sanity_lastcheckedCL  = R[r].changelist;
          }
          else if(parseInt(sanity_lastcheckedCL)<parseInt(R[r].changelist)){
            sanity_lastcheckedCL  = R[r].changelist;
          }
          ///////////////////////////
          //sanity_result
          ///////////////////////////
          if(R[r].isBroken  ==  'no'){
            sanity_result = 'PASS';
            ///////////////////////////
            //sanity_lastpassCL
            ///////////////////////////
            sanity_lastpassCL = sanity_lastcheckedCL;
          }
          else if(R[r].isBroken  ==  'yes'){
            sanity_result = 'FAIL';
            ///////////////////////////
            //sanity_lastpassCL
            ///////////////////////////
            let RR = await Buffer_changelists.find({//TODOTREE
              ischecked : 'yes',
              isBroken  : 'no'
            });
            for(let rr=0;rr<RR.length;rr++){
              if(rr==0){
                sanity_lastpassCL = RR[rr].changelist;
              }
              else if(parseInt(sanity_lastpassCL)<parseInt(RR[rr].changelist)){
                sanity_lastpassCL = RR[rr].changelist;
              }
            }
            ///////////////////////////
            //sanity_brokenCL
            ///////////////////////////
            sanity_brokenCL = R[r].brokenCL;
            ///////////////////////////
            //sanity_brokenCLowner
            ///////////////////////////
            RR = await Buffer_changelists.findOne({//TODOTREE
              changelist  : sanity_brokenCL
            });
            if(RR){
              sanity_brokenCLowner  = RR.owner;
            }
          }
          ///////////////////////////
          //sanity_details
          ///////////////////////////
          sanity_details  = R[r].results;
        }
        
      }
      //=============================================
      ///////////////////////////
      //dcelab_lastcheckedCL
      ///////////////////////////
      R = await Buffer_changelists.find({//TODOTREE
        dcelabischecked : 'yes',
        dcelab          : {'!=':'NA'}
      });
      if(R.length == 0){
      }
      else{
        for(let r=0;r<R.length;r++){
          if(r==0){
            dcelab_lastcheckedCL  = R[r].changelist;
          }
          else if(parseInt(dcelab_lastcheckedCL)<parseInt(R[r].changelist)){
            dcelab_lastcheckedCL  = R[r].changelist;
          }
          ///////////////////////////
          //dcelab_result
          ///////////////////////////
          if(R[r].dcelabisBroken  ==  'no'){
            dcelab_result = 'PASS';
            ///////////////////////////
            //dcelab_lastpassCL
            ///////////////////////////
            dcelab_lastpassCL = dcelab_lastcheckedCL;
          }
          else if(R[r].dcelabisBroken  ==  'yes'){
            dcelab_result = 'FAIL';
            ///////////////////////////
            //dcelab_lastpassCL
            ///////////////////////////
            let RR = await Buffer_changelists.find({//TODOTREE
              dcelabischecked : 'yes',
              dcelabisBroken  : 'no'
            });
            for(let rr=0;rr<RR.length;rr++){
              if(rr==0){
                dcelab_lastpassCL = RR[rr].changelist;
              }
              else if(parseInt(dcelab_lastpassCL)<parseInt(RR[rr].changelist)){
                dcelab_lastpassCL = RR[rr].changelist;
              }
            }
            ///////////////////////////
            //dcelab_brokenCL
            ///////////////////////////
            dcelab_brokenCL = R[r].dcelabbrokenCL;
            ///////////////////////////
            //dcelab_brokenCLowner
            ///////////////////////////
            RR = await Buffer_changelists.findOne({//TODOTREE
              changelist  : dcelab_brokenCL
            });
            if(RR){
              dcelab_brokenCLowner  = RR.owner;
            }
          }
          ///////////////////////////
          //dcelab_details
          ///////////////////////////
          dcelab_details = R[r].dcelab;
        }
      }
      return exits.success(JSON.stringify({
        ok                    : 'ok',
        sanity_lastcheckedCL  : sanity_lastcheckedCL ,
        sanity_result         : sanity_result        ,
        sanity_lastpassCL     : sanity_lastpassCL    ,
        sanity_brokenCL       : sanity_brokenCL      ,
        sanity_brokenCLowner  : sanity_brokenCLowner ,
        sanity_details        : sanity_details       ,
        dcelab_lastcheckedCL  : dcelab_lastcheckedCL ,
        dcelab_result         : dcelab_result        ,
        dcelab_lastpassCL     : dcelab_lastpassCL    ,
        dcelab_brokenCL       : dcelab_brokenCL      ,
        dcelab_brokenCLowner  : dcelab_brokenCLowner ,
        dcelab_details        : dcelab_details        
      }));
    }
    if(inputs.tree  ==  'NV21'){
      let sanity_lastcheckedCL='NA';
      let sanity_result='NA';
      let sanity_lastpassCL='NA';
      let sanity_brokenCL='NA';
      let sanity_brokenCLowner='NA';
      let sanity_details='NA';
      let dcelab_lastcheckedCL='NA';
      let dcelab_result='NA';
      let dcelab_lastpassCL='NA';
      let dcelab_brokenCL='NA';
      let dcelab_brokenCLowner='NA';
      let dcelab_details='NA';
      //=============================================
      ///////////////////////////
      //sanity_lastcheckedCL
      ///////////////////////////
      let R = await Buffer_changelists_01.find({//TODOTREE
        ischecked : 'yes',
        results   : {'!=':'NA'}
      });
      if(R.length == 0){
      }
      else{
        for(let r=0;r<R.length;r++){
          if(r==0){
            sanity_lastcheckedCL  = R[r].changelist;
          }
          else if(parseInt(sanity_lastcheckedCL)<parseInt(R[r].changelist)){
            sanity_lastcheckedCL  = R[r].changelist;
          }
          ///////////////////////////
          //sanity_result
          ///////////////////////////
          if(R[r].isBroken  ==  'no'){
            sanity_result = 'PASS';
            ///////////////////////////
            //sanity_lastpassCL
            ///////////////////////////
            sanity_lastpassCL = sanity_lastcheckedCL;
          }
          else if(R[r].isBroken  ==  'yes'){
            sanity_result = 'FAIL';
            ///////////////////////////
            //sanity_lastpassCL
            ///////////////////////////
            let RR = await Buffer_changelists_01.find({//TODOTREE
              ischecked : 'yes',
              isBroken  : 'no'
            });
            for(let rr=0;rr<RR.length;rr++){
              if(rr==0){
                sanity_lastpassCL = RR[rr].changelist;
              }
              else if(parseInt(sanity_lastpassCL)<parseInt(RR[rr].changelist)){
                sanity_lastpassCL = RR[rr].changelist;
              }
            }
            ///////////////////////////
            //sanity_brokenCL
            ///////////////////////////
            sanity_brokenCL = R[r].brokenCL;
            ///////////////////////////
            //sanity_brokenCLowner
            ///////////////////////////
            RR = await Buffer_changelists_01.findOne({//TODOTREE
              changelist  : sanity_brokenCL
            });
            if(RR){
              sanity_brokenCLowner  = RR.owner;
            }
          }
          ///////////////////////////
          //sanity_details
          ///////////////////////////
          sanity_details  = R[r].results;
        }
        
      }
      //=============================================
      ///////////////////////////
      //dcelab_lastcheckedCL
      ///////////////////////////
      R = await Buffer_changelists_01.find({//TODOTREE
        dcelabischecked : 'yes',
        dcelab          : {'!=':'NA'}
      });
      if(R.length == 0){
      }
      else{
        for(let r=0;r<R.length;r++){
          if(r==0){
            dcelab_lastcheckedCL  = R[r].changelist;
          }
          else if(parseInt(dcelab_lastcheckedCL)<parseInt(R[r].changelist)){
            dcelab_lastcheckedCL  = R[r].changelist;
          }
          ///////////////////////////
          //dcelab_result
          ///////////////////////////
          if(R[r].dcelabisBroken  ==  'no'){
            dcelab_result = 'PASS';
            ///////////////////////////
            //dcelab_lastpassCL
            ///////////////////////////
            dcelab_lastpassCL = dcelab_lastcheckedCL;
          }
          else if(R[r].dcelabisBroken  ==  'yes'){
            dcelab_result = 'FAIL';
            ///////////////////////////
            //dcelab_lastpassCL
            ///////////////////////////
            let RR = await Buffer_changelists_01.find({//TODOTREE
              dcelabischecked : 'yes',
              dcelabisBroken  : 'no'
            });
            for(let rr=0;rr<RR.length;rr++){
              if(rr==0){
                dcelab_lastpassCL = RR[rr].changelist;
              }
              else if(parseInt(dcelab_lastpassCL)<parseInt(RR[rr].changelist)){
                dcelab_lastpassCL = RR[rr].changelist;
              }
            }
            ///////////////////////////
            //dcelab_brokenCL
            ///////////////////////////
            dcelab_brokenCL = R[r].dcelabbrokenCL;
            ///////////////////////////
            //dcelab_brokenCLowner
            ///////////////////////////
            RR = await Buffer_changelists_01.findOne({//TODOTREE
              changelist  : dcelab_brokenCL
            });
            if(RR){
              dcelab_brokenCLowner  = RR.owner;
            }
          }
          ///////////////////////////
          //dcelab_details
          ///////////////////////////
          dcelab_details = R[r].dcelab;
        }
      }
      return exits.success(JSON.stringify({
        ok                    : 'ok',
        sanity_lastcheckedCL  : sanity_lastcheckedCL ,
        sanity_result         : sanity_result        ,
        sanity_lastpassCL     : sanity_lastpassCL    ,
        sanity_brokenCL       : sanity_brokenCL      ,
        sanity_brokenCLowner  : sanity_brokenCLowner ,
        sanity_details        : sanity_details       ,
        dcelab_lastcheckedCL  : dcelab_lastcheckedCL ,
        dcelab_result         : dcelab_result        ,
        dcelab_lastpassCL     : dcelab_lastpassCL    ,
        dcelab_brokenCL       : dcelab_brokenCL      ,
        dcelab_brokenCLowner  : dcelab_brokenCLowner ,
        dcelab_details        : dcelab_details        
      }));
    }
  }
};
