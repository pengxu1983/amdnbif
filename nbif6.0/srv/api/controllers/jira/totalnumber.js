let moment = require('moment');
module.exports = {


  friendlyName: 'Totalnumber',


  description: 'Totalnumber jira.',


  inputs: {
    start : {
      type  : 'string'
    },
    projectlist : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/jira/totalnumber');
    sails.log(inputs);
    let result  = {};
    let regx  = {};
    let projectlist= JSON.parse(inputs.projectlist);
    let datelist  = [];
    for(let p=0;p<projectlist.length;p++){
      result[projectlist[p]]=[];
      regx[projectlist[p]]=RegExp(projectlist[p]);
      for(let index=10;index>=0;index--){
        sails.log(moment().day(1-index*7).format('YYYY-MM-DD'));
        R  = await Jiradetails.count({
          sampleDate  : moment().day(1-index*7).format('YYYY-MM-DD'),
          project     : 'DEIPCNBS20',
          variantname : {
            contains  : projectlist[p]
          }
        });
        result[projectlist[p]].push(R);
      }
    }
    sails.log(result);
    
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok',
      result  : JSON.stringify(result)
    }));

  }


};
