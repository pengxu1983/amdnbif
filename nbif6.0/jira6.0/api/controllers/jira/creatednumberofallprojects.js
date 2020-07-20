let moment = require('moment');
module.exports = {


  friendlyName: 'Creatednumberofallprojects',


  description: 'Creatednumberofallprojects jira.',


  inputs: {
    start : {
      type  : 'string'
    },
    end : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/jira/creatednumberofallprojects');
    sails.log(inputs);
    let numbers = [];
    let index = 0;
    let R;
    let sampleDate;
    for(let i=0;i<10;i++){
      R = await Jiradetails.find({
        sampleDate  : moment().subtract(i,'days').format('YYYY-MM-DD')
      });
      if(R  > 0){
        sampleDate  = moment().subtract(i,'days').format('YYYY-MM-DD');
        break;
      }
    }
    if(R.length ==  0){
      return exits.success(JSON.stringify({
        ok  : 'notok'
      }));
    }
    let current = inputs.start;
    while(moment(current).isSameOrBefore(inputs.end)){
      let RR =  await Jiradetails.count({
        sampleDate  : sampleDate,
        createdDate : current
      });
      numbers.push(RR);
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok',
      numbers : JSON.stringify(numbers)
    }));

  }


};
