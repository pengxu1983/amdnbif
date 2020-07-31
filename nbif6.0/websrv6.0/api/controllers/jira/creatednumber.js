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
    sails.log('/jira/createdNumber');
    sails.log(inputs);
    let result  = {};
    let projectlist = JSON.parse(inputs.projectlist);
    for(let p=0;p<projectlist.length;p++){
      //Floyd
      if(projectlist[p] ==  'Floyd'){
        result['Floyd'] = [];
        for(let index=0;index<30;index++){
          let R = await Jiradetails.count({
            project     : 'DEIPCNBS20',
            variantname : 'Floyd',
            sampleDate  : moment(inputs.start,'YYYY-MM-DD').add(index,'days').format('YYYY-MM-DD'),
          });
          result['Floyd'].push(R);
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
