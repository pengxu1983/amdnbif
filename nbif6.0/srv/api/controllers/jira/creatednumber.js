let moment = require('moment');
module.exports = {


  friendlyName: 'Creatednumber',


  description: 'Creatednumber jira.',


  inputs: {
    start : {
      type  : 'string'
    },
    end   : {
      type  : 'string'
    },
    projectlist : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    //sails.log('/jira/createdNumber');
    //sails.log(inputs);
    let result  = {};
    let projectlist = JSON.parse(inputs.projectlist);
    for(let p=0;p<projectlist.length;p++){
      //Floyd //TODO need jira from outer team
      if(projectlist[p] ==  'Floyd'){
        result['Floyd'] = [];
        for(let index=0;index<30;index++){
          let R={}
          R['Floyd'] = await Jiradetails.count({
            project     : 'DEIPCNBS20',
            variantname : {
              contains :'Floyd'
            },
            createdDate : moment(inputs.start,'YYYY-MM-DD').add(index,'days').format('YYYY-MM-DD'),
          });
          //sails.log('Floyd:'+R['Floyd']);
          result['Floyd'].push(R['Floyd']);
        }
      }
      //NV31
      if(projectlist[p] ==  'NV31'){
        result['NV31'] = [];
        for(let index=0;index<30;index++){
          let R={}
          R['NV31'] = await Jiradetails.count({
            project     : 'DEIPCNBS20',
            variantname : {
              contains :'NV31'
            },
            createdDate : moment(inputs.start,'YYYY-MM-DD').add(index,'days').format('YYYY-MM-DD'),
          });
          //sails.log('NV31:'+R['NV31']);
          result['NV31'].push(R['NV31']);
        }
      }
      //MI300
      if(projectlist[p] ==  'MI300'){
        result['MI300'] = [];
        for(let index=0;index<30;index++){
          let R={}
          R['MI300'] = await Jiradetails.count({
            project     : 'DEIPCNBS20',
            variantname : {
              contains :'MI300'
            },
            createdDate : moment(inputs.start,'YYYY-MM-DD').add(index,'days').format('YYYY-MM-DD'),
          });
          //sails.log('MI300:'+R['MI300']);
          result['MI300'].push(R['MI300']);
        }
      }
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok',
      result  : JSON.stringify(result)
    }));

  }


};
