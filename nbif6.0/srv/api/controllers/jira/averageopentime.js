let moment = require('moment');
module.exports = {


  friendlyName: 'Averageopentime',


  description: 'Averageopentime jira.',


  inputs: {
    projectlist : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/jira/averageopentime');
    sails.log(inputs);
    let projectlist= JSON.parse(inputs.projectlist);
    let result  = {};
    let regx  = {};
    for(let p=0;p<projectlist.length;p++){
      if(projectlist[p] =='Floyd'){
        let withinNBIF = await Jiradetails.find({
          project     : 'DEIPCNBS20',
          variantname : {
            contains  : projectlist[p]
          },
        });
        let outofNBIF = [];//TODO
        let All = withinNBIF.concat(outofNBIF);
        let shortest;
        let longest;
        let average;
        let sumtime = 0;
        for(let a=0;a<All.length;a++){
          let opentime;
          if(All[a].stat  ==  'Closed'){
            opentime  = moment.duration(moment(All[a].closedDate).diff(All[a].createdDate)).as('days').toFixed();
          }
          else if(All[a].stat  ==  'Deferred'){
            opentime  = moment.duration(moment(All[a].deferredDate).diff(All[a].createdDate)).as('days').toFixed();
          }
          else{
            opentime  = moment.duration(moment().day(1).diff(All[a].createdDate)).as('days').toFixed();
          }
          //sails.log('opentime '+opentime);
          if(opentime ==  '0'){
            //sails.log(All[a].link);
          }
          sumtime =  sumtime+parseInt(opentime);
          if(a  ==  0){
            shortest  = parseInt(opentime);
            longest   = parseInt(opentime);
          }
          else{
            if(shortest >= parseInt(opentime)){
              shortest  = parseInt(opentime);
            }
            if(longest  <=  parseInt(opentime)){
              longest   = parseInt(opentime);
            }
          }
        }
        average = sumtime/All.length;
        average = average.toFixed(2);
        result[projectlist[p]]={
          project   : projectlist[p],
          shortest  : shortest,
          average   : average,
          longest   : longest
        };
      }
      if(projectlist[p] =='NV31'){
        let withinNBIF = await Jiradetails.find({
          project     : 'DEIPCNBS20',
          variantname : {
            contains  : projectlist[p]
          },
        });
        let outofNBIF = [];//TODO
        let All = withinNBIF.concat(outofNBIF);
        let shortest;
        let longest;
        let average;
        let sumtime = 0;
        for(let a=0;a<All.length;a++){
          let opentime;
          if(All[a].stat  ==  'Closed'){
            opentime  = moment.duration(moment(All[a].closedDate).diff(All[a].createdDate)).as('days').toFixed();
          }
          else if(All[a].stat  ==  'Deferred'){
            opentime  = moment.duration(moment(All[a].deferredDate).diff(All[a].createdDate)).as('days').toFixed();
          }
          else{
            opentime  = moment.duration(moment().day(1).diff(All[a].createdDate)).as('days').toFixed();
          }
          //sails.log('opentime '+opentime);
          if(opentime ==  '0'){
            //sails.log(All[a].link);
          }
          sumtime =  sumtime+parseInt(opentime);
          if(a  ==  0){
            shortest  = parseInt(opentime);
            longest   = parseInt(opentime);
          }
          else{
            if(shortest >= parseInt(opentime)){
              shortest  = parseInt(opentime);
            }
            if(longest  <=  parseInt(opentime)){
              longest   = parseInt(opentime);
            }
          }
        }
        average = sumtime/All.length;
        average = average.toFixed(2);
        result[projectlist[p]]={
          project   : projectlist[p],
          shortest  : shortest,
          average   : average,
          longest   : longest
        };
      }
      if(projectlist[p] =='MI300'){
        let withinNBIF = await Jiradetails.find({
          project     : 'DEIPCNBS20',
          variantname : {
            contains  : projectlist[p]
          },
        });
        let outofNBIF = [];//TODO
        let All = withinNBIF.concat(outofNBIF);
        let shortest;
        let longest;
        let average;
        let sumtime = 0;
        for(let a=0;a<All.length;a++){
          let opentime;
          if(All[a].stat  ==  'Closed'){
            opentime  = moment.duration(moment(All[a].closedDate).diff(All[a].createdDate)).as('days').toFixed();
          }
          else if(All[a].stat  ==  'Deferred'){
            opentime  = moment.duration(moment(All[a].deferredDate).diff(All[a].createdDate)).as('days').toFixed();
          }
          else{
            opentime  = moment.duration(moment().day(1).diff(All[a].createdDate)).as('days').toFixed();
          }
          //sails.log('opentime '+opentime);
          if(opentime ==  '0'){
            //sails.log(All[a].link);
          }
          sumtime =  sumtime+parseInt(opentime);
          if(a  ==  0){
            shortest  = parseInt(opentime);
            longest   = parseInt(opentime);
          }
          else{
            if(shortest >= parseInt(opentime)){
              shortest  = parseInt(opentime);
            }
            if(longest  <=  parseInt(opentime)){
              longest   = parseInt(opentime);
            }
          }
        }
        average = sumtime/All.length;
        average = average.toFixed(2);
        result[projectlist[p]]={
          project   : projectlist[p],
          shortest  : shortest,
          average   : average,
          longest   : longest
        };
      }
    }
    // All done.
    return exits.success({
      ok  : 'ok',
      result  : JSON.stringify(result)
    });

  }


};
