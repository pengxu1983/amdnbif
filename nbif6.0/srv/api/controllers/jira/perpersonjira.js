let moment = require('moment');
module.exports = {


  friendlyName: 'Perpersonjira',


  description: 'Perpersonjira jira.',


  inputs: {
    projectlist : {
      type    : 'string'
    },
    projectname : {
      type    : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/jira/perpersonjira');
    sails.log(inputs);
    //let projectlist= JSON.parse(inputs.projectlist);
    let result  = {};
    result['userlist']=[//TODO
      'benpeng',
      'chengli',
      'trgong',
      'shawhan',
      'myhou',
      'qingli1',
      'siluo',
      'buhengxu',
      'petwang',
      'tingxie2',
      'wenyanxu',
      'belchen',
      'smchen',
      'geochen',
      'zhegao',
      'antli',
      'pfli',
      'bibliu1',
      'bobliu',
      'smshen',
      'zhao2sun',
      'ecwang',
      'jawan',
      'wangr1',
      'xiaojwan',
      'shiyan',
      'dongyu',
      'alzhu',
      'yangz',
      'lweng',
      'yiwezhou',
    ];
    let statuslist  = ['Opened','Implemented','Closed','Rejected','Deferred'];
    //for(let p=0;p<projectlist.length;p++){
      if(inputs.projectname =='Floyd'){
        result[inputs.projectname]={};
        for(let s=0;s<statuslist.length;s++){
          result[inputs.projectname][statuslist[s]]=[];
          for(let u=0;u<result['userlist'].length;u++){
            sails.log(result['userlist'][u]);
            let filter;
            if(statuslist[s]  ==  'Opened'){
              filter  = {
                nin:[
                  'Implemented',
                  'Closed',
                  'Rejected',
                  'Deferred'
                ]
              };
            }
            else{
              filter  = statuslist[s];
            }
            let withinNBIF = await Jiradetails.count({
              project     : 'DEIPCNBS20',
              variantname : {
                contains  : inputs.projectname
              },
              assignee    : result['userlist'][u],
              stat        : filter,
              sampleDate  : moment().day(1).format('YYYY-MM-DD')
            });
            sails.log('withinNBIF '+withinNBIF);
            let outofNBIF = 0;//TODO
            let All = parseInt(outofNBIF)+parseInt(withinNBIF);
            sails.log(statuslist[s]);
            sails.log(All);
            result[inputs.projectname][statuslist[s]].push(All);
          }
        }
      }
      if(inputs.projectname =='MI300'){
        result[inputs.projectname]={};
        for(let s=0;s<statuslist.length;s++){
          result[inputs.projectname][statuslist[s]]=[];
          for(let u=0;u<result['userlist'].length;u++){
            sails.log(result['userlist'][u]);
            let filter;
            if(statuslist[s]  ==  'Opened'){
              filter  = {
                nin:[
                  'Implemented',
                  'Closed',
                  'Rejected',
                  'Deferred'
                ]
              };
            }
            else{
              filter  = statuslist[s];
            }
            let withinNBIF = await Jiradetails.count({
              project     : 'DEIPCNBS20',
              variantname : {
                contains  : inputs.projectname
              },
              assignee    : result['userlist'][u],
              stat        : filter,
              sampleDate  : moment().day(1).format('YYYY-MM-DD')
            });
            sails.log('withinNBIF '+withinNBIF);
            let outofNBIF = 0;//TODO
            let All = parseInt(outofNBIF)+parseInt(withinNBIF);
            sails.log(statuslist[s]);
            sails.log(All);
            result[inputs.projectname][statuslist[s]].push(All);
          }
        }
      }
      if(inputs.projectname =='NV31'){
        result[inputs.projectname]={};
        for(let s=0;s<statuslist.length;s++){
          result[inputs.projectname][statuslist[s]]=[];
          for(let u=0;u<result['userlist'].length;u++){
            sails.log(result['userlist'][u]);
            let filter;
            if(statuslist[s]  ==  'Opened'){
              filter  = {
                nin:[
                  'Implemented',
                  'Closed',
                  'Rejected',
                  'Deferred'
                ]
              };
            }
            else{
              filter  = statuslist[s];
            }
            let withinNBIF = await Jiradetails.count({
              project     : 'DEIPCNBS20',
              variantname : {
                contains  : inputs.projectname
              },
              assignee    : result['userlist'][u],
              stat        : filter,
              sampleDate  : moment().day(1).format('YYYY-MM-DD')
            });
            sails.log('withinNBIF '+withinNBIF);
            let outofNBIF = 0;//TODO
            let All = parseInt(outofNBIF)+parseInt(withinNBIF);
            sails.log(statuslist[s]);
            sails.log(All);
            result[inputs.projectname][statuslist[s]].push(All);
          }
        }
      }
    //}
    // All done.
    sails.log(result);
    return exits.success({
      ok  : 'ok',
      result  : JSON.stringify(result)
    });

  }


};
