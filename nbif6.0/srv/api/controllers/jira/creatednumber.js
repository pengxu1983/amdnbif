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
      result[projectlist[p]]=[];
      for(let index=10;index>=0;index--){
        //sails.log(moment().day(1-index*7).format('YYYY-MM-DD'));
        let R = 0;
        let days  = [];
        for(let d=0;d<7;d++){
          days.push(moment().day(1-index*7).add(d,'days').format('YYYY-MM-DD'));
        }
        //sails.log('days');
        //sails.log(days);
        R = await Jiradetails.count({
          project     : 'DEIPCNBS20',
          variantname : {
            contains  : projectlist[p]
          },
          createdDate : days,
          sampleDate  : moment().day(1).format('YYYY-MM-DD')
        });
        //sails.log(R);
        result[projectlist[p]].push(R);
      }
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok',
      result  : JSON.stringify(result)
    }));

  }


};
