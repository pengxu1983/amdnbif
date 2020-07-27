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
let sendreport = new cronJob('* * * * * *', async function () {
  console.log(moment().format('YYYY-MM-DD'));
  child_process.exec(__dirname+'/../../../../common6.0/SendJIRAstatus.js',async function(err,stdout,stderr){
    console.log('SEND:'+stdout);
  });
  sendreport.stop();
}, null,true, 'Asia/Chongqing');
module.exports = {


  friendlyName: 'Get',


  description: 'Get jira.',


  inputs: {
    startTime : {
      type      :'string'
    },
    endTime : {
      type      :'string'
    },
    username  : {
      type      :'string'
    },

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/jira/get');
    sails.log(inputs);
    let startTimeReport;
    let endTimeReport;
    let datelist  = [];
    //let dateindex = 0;
    let current = inputs.startTime;
    while(moment(current,'YYYY-MM-DD').isSameOrBefore(moment(inputs.endTime,'YYYY-MM-DD'))){
      datelist.push(current);
      current = moment(current,'YYYY-MM-DD').add(1,'days').format('YYYY-MM-DD');
    }
    //sails.log(datelist);
    startTimeReport = await Jiradetails.find({
      sampleDate  : inputs.startTime,
      assignee    : inputs.username,
      stat        : {'!=':['Closed','Deferred','Rejected']}
    });
    //sails.log(startTimeReport);
    endTimeReport = await Jiradetails.find({
      sampleDate  : inputs.endTime,
      assignee    : inputs.username,
      stat        : {'!=':['Closed','Deferred','Rejected']}
    });
    //sails.log(endTimeReport);
    let mailbody  = '';
    mailbody  +=  '<html>';
    mailbody  +=  '<body>';
    mailbody  +=  '<h3>'+inputs.startTime+' JIRA report</h3>';
    mailbody  +=  '<table border="1">';
    mailbody  +=  '<tr>';
    mailbody  +=  '<th>key</th>';
    mailbody  +=  '<th>summary</th>';
    mailbody  +=  '<th>assignee</th>';
    mailbody  +=  '<th>status</th>';
    mailbody  +=  '<th>dueDate</th>';
    mailbody  +=  '</tr>';
    for(let i=0;i<startTimeReport.length;i++){
      //sails.log(startTimeReport[i]);
      mailbody  +=  '<tr>';
      mailbody  +=  '<td><a href="'+startTimeReport[i].link+'">'+startTimeReport[i].key+'</td>';
      let data =  fs.readFileSync('/local_vol1_nobackup/benpeng/jira/NBIF_ALL_JIRA/'+inputs.startTime+'.xml');
      parser.parseString(data,function(err,result){
        for(let j=0;j<result.rss.channel[0].item.length;j++){
          startTimeReport[i].lastComment = undefined;
          startTimeReport[i].lastCommentauthor = undefined;
          startTimeReport[i].lastCommentcreateddate  = undefined;
          if(result.rss.channel[0].item[j].key[0].$.id  ==  startTimeReport[i].JIRAID){
            startTimeReport[i].summary = result.rss.channel[0].item[j].summary[0];
            //if(result.rss.channel[0].item[j].hasOwnProperty('comments')){
            //  startTimeReport[i].lastComment = result.rss.channel[0].item[j].comments[0].comment[0]._;
            //  startTimeReport[i].lastCommentauthor = result.rss.channel[0].item[j].comments[0].comment[0].$.author;
            //  startTimeReport[i].lastCommentcreateddate   = moment(moment(result.rss.channel[0].item[j].comments[0].comment[0].$.created).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
            //}
            //startTimeReport[i].description = result.rss.channel[0].item[i].description[0];
            break;
          }
        }
        mailbody  +=  '<td>'+startTimeReport[i].summary+'</td>';
        mailbody  +=  '<td>'+startTimeReport[i].assignee+'</td>';
        mailbody  +=  '<td>'+startTimeReport[i].stat+'</td>';
        mailbody  +=  '<td>'+startTimeReport[i].dueDate+'</td>';
        mailbody  +=  '</tr>';
      });
    }
    mailbody  +=  '</table>';
    mailbody  +=  '<h3>'+inputs.endTime+' JIRA report</h3>';
    mailbody  +=  '<table border="1">';
    mailbody  +=  '<tr>';
    mailbody  +=  '<th>key</th>';
    mailbody  +=  '<th>summary</th>';
    mailbody  +=  '<th>assignee</th>';
    mailbody  +=  '<th>status</th>';
    mailbody  +=  '<th>dueDate</th>';
    mailbody  +=  '</tr>';
    for(let i=0;i<endTimeReport.length;i++){
      //sails.log(endTimeReport[i]);
      mailbody  +=  '<tr>';
      mailbody  +=  '<td><a href="'+endTimeReport[i].link+'">'+endTimeReport[i].key+'</td>';
      let data =  fs.readFileSync('/local_vol1_nobackup/benpeng/jira/NBIF_ALL_JIRA/'+inputs.endTime+'.xml');
      parser.parseString(data,function(err,result){
        for(let j=0;j<result.rss.channel[0].item.length;j++){
          endTimeReport[i].lastComment = undefined;
          endTimeReport[i].lastCommentauthor = undefined;
          endTimeReport[i].lastCommentcreateddate  = undefined;
          if(result.rss.channel[0].item[j].key[0].$.id  ==  endTimeReport[i].JIRAID){
            endTimeReport[i].summary = result.rss.channel[0].item[j].summary[0];
            if(result.rss.channel[0].item[j].hasOwnProperty('comments')){
              endTimeReport[i].lastComment = result.rss.channel[0].item[j].comments[0].comment[0]._;
              endTimeReport[i].lastCommentauthor = result.rss.channel[0].item[j].comments[0].comment[0].$.author;
              endTimeReport[i].lastCommentcreateddate   = moment(moment(result.rss.channel[0].item[j].comments[0].comment[0].$.created).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
            }
            endTimeReport[i].description = result.rss.channel[0].item[i].description[0];
            break;
          }
        }
        mailbody  +=  '<td>'+endTimeReport[i].summary+'</td>';
        mailbody  +=  '<td>'+endTimeReport[i].assignee+'</td>';
        mailbody  +=  '<td>'+endTimeReport[i].stat+'</td>';
        mailbody  +=  '<td>'+endTimeReport[i].dueDate+'</td>';
        mailbody  +=  '</tr>';
      });
    }
    mailbody  +=  '</body>';
    mailbody  +=  '</html>';
    fs.writeFileSync('/local_vol1_nobackup/benpeng/jira/NBIF_ALL_JIRA/'+inputs.startTime+'.'+inputs.endTime+'.'+inputs.username,mailbody,{
      encoding  : 'utf8',
      mode      : '0600',
      flag      : 'w'
    })
    child_process.execSync('mutt '+getemail('benpeng')+' -e  \'set content_type="text/html"\' -s abc < '+'/local_vol1_nobackup/benpeng/jira/NBIF_ALL_JIRA/'+inputs.startTime+'.'+inputs.endTime+'.'+inputs.username);//TODO
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
