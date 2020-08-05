let fs = require('fs');
let xml2js = require('xml2js');
let moment = require('moment');
let child_process   = require('child_process');
let querystring     = require('querystring');
let NBIF_ALL_JIRA  = {};
let fields;
let parser        = new xml2js.Parser();
let cronJob         = require("cron").CronJob;
let loginit         = function(){
  return '[LOG]['+moment().format('YYYY-MM-DD HH:mm:ss')+'] ';
};
let getemail        = function(username){
  let email;
  let lines = fs.readFileSync('/home/benpeng/p4users','utf8').split('\n');
  lines.pop();
  let regx  = /^(\w+) <(\S+)>.*accessed/;
  for(let l=0;l<lines.length;l++){
    if(regx.test(lines[l])){
      lines[l].replace(regx,function(rs,$1,$2){
        if($1==username){
          email = $2;
        }
      })
    }
  }
  return email;
}
let xmlfile;
let sampleDate;
let addJIRA= new cronJob('0 0 */4 * * *', async function () {
  console.log(moment().format('YYYY-MM-DD'));
  sampleDate  = moment().subtract(0, 'days').format('YYYY-MM-DD');
  xmlfile = '/local_vol1_nobackup/benpeng/jira/NBIF_ALL_JIRA/'+sampleDate+'.xml';
  if(fs.existsSync(xmlfile)){
    child_process.exec(__dirname+'/../../../../common6.0/AddJIRA.js '+xmlfile,async function(err,stdout,stderr){
      console.log('SEND:'+stdout);
    });
  }
}, null,true, 'Asia/Chongqing');
module.exports = {


  friendlyName: 'Add',


  description: 'Add jira.',


  inputs: {
    project     : {
      type      :'string'
    },
    JIRAID      :{
      type      :'string'
    },
    key         :{
      type      :'string'
    },
    summary     :{
      type      :'string'
    },
    description :{
      type      :'string'
    },
    reporter    :{
      type      :'string'
    },
    assignee    :{
      type      :'string'
    },
    dueDate     :{
      type      :'string'
    },
    createdDate :{
      type      :'string'
    },
    updatedDate :{
      type      :'string'
    },
    deferredDate:{
      type      :'string'
    },
    closedDate  :{
      type      :'string'
    },
    variantname :{
      type      :'string'
    },
    sampleDate  :{
      type      :'string'
    },
    type        :{
      type      :'string'
    },
    stat        :{
      type      :'string'
    },
    lastComment :{
      type      :'string'
    },
    link        :{
      type      :'string'
    },
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    //sails.log('/jira/add');
    sails.log('RECIEVE:'+inputs.key);
    //sails.log(typeof(inputs.description));
    //sails.log(inputs.description);
    let R = await Jiradetails.find({
      JIRAID      : inputs.JIRAID,
      sampleDate  : inputs.sampleDate
    });
    if(R.length ==  0){
      //no record
      await Jiradetails.create({
        project     : inputs.project,
        JIRAID      : inputs.JIRAID      ,
        key         : inputs.key         ,
        //summary     : inputs.summary     ,
        //description : querystring.stringify(inputs.description),
        reporter    : inputs.reporter    ,
        assignee    : inputs.assignee    ,
        dueDate     : inputs.dueDate     ,
        createdDate : inputs.createdDate ,
        updatedDate : inputs.updatedDate ,
        deferredDate: inputs.deferredDate,
        closedDate  : inputs.closedDate  ,
        variantname : inputs.variantname ,
        sampleDate  : inputs.sampleDate  ,
        type        : inputs.type        ,
        stat        : inputs.stat        ,
        //lastComment : querystring.stringify(inputs.lastComment),
        link        : inputs.link
      });
    }
    else{
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
