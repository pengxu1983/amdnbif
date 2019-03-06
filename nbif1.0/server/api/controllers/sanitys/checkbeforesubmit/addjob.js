module.exports = {


  friendlyName: 'Addjob',


  description: 'Addjob checkbeforesubmit.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    data  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitys/checkbeforesubmit/addjob');
    sails.log(inputs);
    let data = JSON.parse(data);
    if(inputs.kind  ==  'oneshelve'){
      let R = await Buffer_shelves.findOne({
        shelveID  : data.shelveID
      });
      if(R){
      }
      else{
        let projects  = Projects.find({
          id  : {'>=':0}
        });
        let variants  = Variants.find({
          id  : {'>=':0}
        });
        let common_sanitys = Common_sanitys.find({
          id  : {'>=':0}
        }); 
        let initresults = {};
        for(let v=0;v<variants.length;v++){
          initresults[variants[v].variantname]={};
          for(let c=0;c<common_sanitys.length;c++){
            initresults[variants[v].variantname][common_sanitys[c].testname]='notrun';
          }
          initresults[variants[v].variantname]['dcelab']='notrun';
        }
        await Buffer_shelves.create({
          shelveID        :   data.shelveID      
          username        :   data.username      
          basechangelist  :   data.basechangelist
          projectname     :   data.projectname   
          variantname     :   data.variantname   
          password        :   data.password      
          results         :   JSON.stringify(initresults)
        });
      }
    }
    // All done.
    //return;

  }


};
