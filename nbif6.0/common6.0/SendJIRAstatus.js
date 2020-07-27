#!/home/benpeng/nbifweb_client/software/node/bin/node
let fs              = require('fs');
let xml2js          = require('xml2js');
let moment          = require('moment');
let process         = require('process');
let child_process   = require('child_process');
let querystring     = require('querystring');
let http            = require('http');
let parser          = new xml2js.Parser();

let TeamMemberList= [//TODO
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
];
let DVMemberList= [];
let DEMemberList= [];
let CClist=['benpeng','geochen','siluo','buhengxu','smshen'];
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
//making mailbody

let startTime = moment().subtract(7,'days').format('YYYY-MM-DD');
let endTime = moment().subtract(0,'days').format('YYYY-MM-DD');


let sendReport= new cronJob('* * * * * 1', async function () {
  let startTimeReport = {};
  let endTimeReport   = {};
  let startTimeAllUser  = {};
  let endTimeAllUser  = {};
  console.log('start');
  let data_startTime  =  fs.readFileSync('/local_vol1_nobackup/benpeng/jira/NBIF_ALL_JIRA/'+startTime+'.xml'); 
  let data_endTime    =  fs.readFileSync('/local_vol1_nobackup/benpeng/jira/NBIF_ALL_JIRA/'+endTime+'.xml'); 
  parser.parseString(data_startTime,function(err,result){
    startTimeReport = result;
  });
  parser.parseString(data_endTime,function(err,result){
    endTimeReport = result;
  });
  for(let userindex = 0;userindex <TeamMemberList.length;userindex++){
    startTimeAllUser[TeamMemberList[userindex]]={};
    endTimeAllUser[TeamMemberList[userindex]]={};
    //Per Person
    let mailbody_weekly  = '';
    mailbody_weekly  +=  '<html>';
    mailbody_weekly  +=  '<body>';
    mailbody_weekly  +=  '<h2>Hi, '+TeamMemberList[userindex]+'</h2>';
    mailbody_weekly  +=  '<h3>'+startTime+' JIRA report</h3>';
    mailbody_weekly  +=  '<table border="1">';
    mailbody_weekly  +=  '<tr>';
    mailbody_weekly  +=  '<th>key</th>';
    mailbody_weekly  +=  '<th>summary</th>';
    mailbody_weekly  +=  '<th>assignee</th>';
    mailbody_weekly  +=  '<th>status</th>';
    mailbody_weekly  +=  '<th>dueDate</th>';
    mailbody_weekly  +=  '<th>variant</th>';
    mailbody_weekly  +=  '</tr>';
    //startTimeReport
    let startTimeNumber=0;
    for(let i=0;i<startTimeReport.rss.channel[0].item.length;i++){
      //JIRAID
      let JIRAID  = startTimeReport.rss.channel[0].item[i].key[0].$.id;
      //console.dir(JIRAID);
      //link
      let link    = startTimeReport.rss.channel[0].item[i].link[0];
      //console.dir(link);
      //key
      let key = startTimeReport.rss.channel[0].item[i].key[0]._;
      //console.dir(key);
      //summary
      let summary = startTimeReport.rss.channel[0].item[i].summary[0];
      //console.dir(summary);
      //description
      let description = startTimeReport.rss.channel[0].item[i].description[0];
      //console.dir(description);
      //lastComment
      let lastComment = undefined;
      let lastCommentauthor = undefined;
      let lastCommentcreateddate  = undefined;
      if(startTimeReport.rss.channel[0].item[i].hasOwnProperty('comments')){
        lastComment = startTimeReport.rss.channel[0].item[i].comments[0].comment[0]._;
        lastCommentauthor = startTimeReport.rss.channel[0].item[i].comments[0].comment[0].$.author;
        lastCommentcreateddate   = moment(moment(startTimeReport.rss.channel[0].item[i].comments[0].comment[0].$.created).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
      }
      //console.dir(lastComment);
      //console.dir(lastCommentauthor);
      //console.dir(lastCommentcreateddate);
      //reporter
      let reporter  = startTimeReport.rss.channel[0].item[i].reporter[0].$.username;
      //console.dir(reporter);
      //assignee
      let assignee  = startTimeReport.rss.channel[0].item[i].assignee[0].$.username;
      //console.dir(assignee);
      //type
      let type  = startTimeReport.rss.channel[0].item[i].type[0]._;
      //console.dir(type);
      //createdDate
      let createdDate = moment(moment(startTimeReport.rss.channel[0].item[i].created[0]).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
      //console.dir(createdDate);
      //updatedDate
      let updatedDate = moment(moment(startTimeReport.rss.channel[0].item[i].updated[0]).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
      //console.dir(updatedDate);
      //dueDate
      let dueDate = '';
      if(startTimeReport.rss.channel[0].item[i].due[0] !=  ''){
        dueDate = moment(moment(startTimeReport.rss.channel[0].item[i].due[0]).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
      }
      //console.dir(dueDate);
      //status
      let stat  = startTimeReport.rss.channel[0].item[i].status[0]._;
      //console.dir(stat);
      //closedDate
      let closedDate;
      if(stat ==  'Closed'){
        //closedDate  = moment(moment(startTimeReport.rss.channel[0].item[i].[0]).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
        fields  = startTimeReport.rss.channel[0].item[i].customfields[0].customfield;
        for(let f=0;f<fields.length;f++){
          if(fields[f].customfieldname  ==  'Closed Date'){
            //console.dir(fields[f].customfieldvalues[0]);
            closedDate  = moment(moment(fields[f].customfieldvalues[0].customfieldvalue[0]).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
            break;
          }
        }
        //console.dir('closed : '+closedDate);
      }
      //deferredDate
      let deferredDate;
      if(stat ==  'Deferred'){
        fields  = startTimeReport.rss.channel[0].item[i].customfields[0].customfield;
        //console.dir(fields);
        for(let f=0;f<fields.length;f++){
          if(fields[f].customfieldname  ==  'Deferred Date'){
            //console.dir(fields[f].customfieldvalues[0].customfieldvalue[0]);
            deferredDate  = moment(moment(fields[f].customfieldvalues[0].customfieldvalue[0]).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
            break;
          }
        }
        //console.dir('deferred : '+deferredDate);
      }
      //variantname
      let variantlist;
      let variantname = [];
      fields  = startTimeReport.rss.channel[0].item[i].customfields[0].customfield;
      for(let f=0;f<fields.length;f++){
        if(fields[f].customfieldname  ==  'Variant'){
          variantlist = fields[f].customfieldvalues[0].customfieldvalue;
          break;
        }
      }
      if(variantlist==undefined){
      }
      else{
        //console.dir(variantlist.length);
        for(let v=0;v<variantlist.length;v++){
          variantname.push(variantlist[v]._);
        }
      }
      variantname = JSON.stringify(variantname);
      //console.dir(variantname);
      if(TeamMemberList[userindex]==assignee && stat != 'Closed' && stat != 'Deferred' && stat!= 'Rejected'){
        mailbody_weekly +=  '<tr>';
        mailbody_weekly +=  '<td><a href="'+link+'">'+key+'</a></td>';
        mailbody_weekly +=  '<td>'+summary+'</td>';
        mailbody_weekly +=  '<td>'+assignee+'</td>';
        mailbody_weekly +=  '<td>'+stat+'</td>';
        mailbody_weekly +=  '<td>'+dueDate+'</td>';
        mailbody_weekly +=  '<td>'+variantname+'</td>';
        mailbody_weekly +=  '</tr>';
        startTimeNumber++;
        startTimeAllUser[TeamMemberList[userindex]][JIRAID]={};
        startTimeAllUser[TeamMemberList[userindex]][JIRAID]['key']=key;
        startTimeAllUser[TeamMemberList[userindex]][JIRAID]['link']=link;
        startTimeAllUser[TeamMemberList[userindex]][JIRAID]['summary']=summary;
        startTimeAllUser[TeamMemberList[userindex]][JIRAID]['assignee']=assignee;
        startTimeAllUser[TeamMemberList[userindex]][JIRAID]['stat']=stat;
        startTimeAllUser[TeamMemberList[userindex]][JIRAID]['dueDate']=dueDate;
        startTimeAllUser[TeamMemberList[userindex]][JIRAID]['variantname']=variantname;
      }
    }
    mailbody_weekly  +=  '</table>';
    mailbody_weekly  +=  '<h3>'+endTime+' JIRA report</h3>';
    mailbody_weekly  +=  '<table border="1">';
    mailbody_weekly  +=  '<tr>';
    mailbody_weekly  +=  '<th>key</th>';
    mailbody_weekly  +=  '<th>summary</th>';
    mailbody_weekly  +=  '<th>assignee</th>';
    mailbody_weekly  +=  '<th>status</th>';
    mailbody_weekly  +=  '<th>dueDate</th>';
    mailbody_weekly  +=  '<th>variant</th>';
    mailbody_weekly  +=  '</tr>';
    //endTimeReport
    let endTimeNumber=0;
    for(let i=0;i<endTimeReport.rss.channel[0].item.length;i++){
      //JIRAID
      let JIRAID  = endTimeReport.rss.channel[0].item[i].key[0].$.id;
      //console.dir(JIRAID);
      //link
      let link    = endTimeReport.rss.channel[0].item[i].link[0];
      //console.dir(link);
      //key
      let key = endTimeReport.rss.channel[0].item[i].key[0]._;
      //console.dir(key);
      //summary
      let summary = endTimeReport.rss.channel[0].item[i].summary[0];
      //console.dir(summary);
      //description
      let description = endTimeReport.rss.channel[0].item[i].description[0];
      //console.dir(description);
      //lastComment
      let lastComment = undefined;
      let lastCommentauthor = undefined;
      let lastCommentcreateddate  = undefined;
      if(endTimeReport.rss.channel[0].item[i].hasOwnProperty('comments')){
        lastComment = endTimeReport.rss.channel[0].item[i].comments[0].comment[0]._;
        lastCommentauthor = endTimeReport.rss.channel[0].item[i].comments[0].comment[0].$.author;
        lastCommentcreateddate   = moment(moment(endTimeReport.rss.channel[0].item[i].comments[0].comment[0].$.created).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
      }
      //console.dir(lastComment);
      //console.dir(lastCommentauthor);
      //console.dir(lastCommentcreateddate);
      //reporter
      let reporter  = endTimeReport.rss.channel[0].item[i].reporter[0].$.username;
      //console.dir(reporter);
      //assignee
      let assignee  = endTimeReport.rss.channel[0].item[i].assignee[0].$.username;
      //console.dir(assignee);
      //type
      let type  = endTimeReport.rss.channel[0].item[i].type[0]._;
      //console.dir(type);
      //createdDate
      let createdDate = moment(moment(endTimeReport.rss.channel[0].item[i].created[0]).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
      //console.dir(createdDate);
      //updatedDate
      let updatedDate = moment(moment(endTimeReport.rss.channel[0].item[i].updated[0]).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
      //console.dir(updatedDate);
      //dueDate
      let dueDate = '';
      if(endTimeReport.rss.channel[0].item[i].due[0] !=  ''){
        dueDate = moment(moment(endTimeReport.rss.channel[0].item[i].due[0]).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
      }
      //console.dir(dueDate);
      //status
      let stat  = endTimeReport.rss.channel[0].item[i].status[0]._;
      //console.dir(stat);
      //closedDate
      let closedDate;
      if(stat ==  'Closed'){
        //closedDate  = moment(moment(endTimeReport.rss.channel[0].item[i].[0]).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
        fields  = endTimeReport.rss.channel[0].item[i].customfields[0].customfield;
        for(let f=0;f<fields.length;f++){
          if(fields[f].customfieldname  ==  'Closed Date'){
            //console.dir(fields[f].customfieldvalues[0]);
            closedDate  = moment(moment(fields[f].customfieldvalues[0].customfieldvalue[0]).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
            break;
          }
        }
        //console.dir('closed : '+closedDate);
      }
      //deferredDate
      let deferredDate;
      if(stat ==  'Deferred'){
        fields  = endTimeReport.rss.channel[0].item[i].customfields[0].customfield;
        //console.dir(fields);
        for(let f=0;f<fields.length;f++){
          if(fields[f].customfieldname  ==  'Deferred Date'){
            //console.dir(fields[f].customfieldvalues[0].customfieldvalue[0]);
            deferredDate  = moment(moment(fields[f].customfieldvalues[0].customfieldvalue[0]).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
            break;
          }
        }
        //console.dir('deferred : '+deferredDate);
      }
      //variantname
      let variantlist;
      let variantname = [];
      fields  = endTimeReport.rss.channel[0].item[i].customfields[0].customfield;
      for(let f=0;f<fields.length;f++){
        if(fields[f].customfieldname  ==  'Variant'){
          variantlist = fields[f].customfieldvalues[0].customfieldvalue;
          break;
        }
      }
      if(variantlist==undefined){
      }
      else{
        //console.dir(variantlist.length);
        for(let v=0;v<variantlist.length;v++){
          variantname.push(variantlist[v]._);
        }
      }
      variantname = JSON.stringify(variantname);
      //console.dir(variantname);
      endTimeReport[TeamMemberList[userindex]]=[];
      if(TeamMemberList[userindex]==assignee  && stat != 'Closed' && stat != 'Deferred' && stat!= 'Rejected'){
        mailbody_weekly +=  '<tr>';
        mailbody_weekly +=  '<td><a href="'+link+'">'+key+'</a></td>';
        mailbody_weekly +=  '<td>'+summary+'</td>';
        mailbody_weekly +=  '<td>'+assignee+'</td>';
        mailbody_weekly +=  '<td>'+stat+'</td>';
        mailbody_weekly +=  '<td>'+dueDate+'</td>';
        mailbody_weekly +=  '<td>'+variantname+'</td>';
        mailbody_weekly +=  '</tr>';
        endTimeNumber++;
        endTimeAllUser[TeamMemberList[userindex]][JIRAID]={};
        endTimeAllUser[TeamMemberList[userindex]][JIRAID]['key']=key;
        endTimeAllUser[TeamMemberList[userindex]][JIRAID]['link']=link;
        endTimeAllUser[TeamMemberList[userindex]][JIRAID]['summary']=summary;
        endTimeAllUser[TeamMemberList[userindex]][JIRAID]['assignee']=assignee;
        endTimeAllUser[TeamMemberList[userindex]][JIRAID]['stat']=stat;
        endTimeAllUser[TeamMemberList[userindex]][JIRAID]['dueDate']=dueDate;
        endTimeAllUser[TeamMemberList[userindex]][JIRAID]['variantname']=variantname;
      }
    }
    mailbody_weekly  +=  '</table>';
    mailbody_weekly  +=  '<h3>Progress of last 7 days :</h3>';
    mailbody_weekly  +=  '<h4>Total number from '+startTimeNumber+' to '+endTimeNumber+'</h4>';
    let newones = [];
    for(let id in endTimeAllUser[TeamMemberList[userindex]]){
      if(startTimeAllUser[TeamMemberList[userindex]].hasOwnProperty(id)){
        //no action
      }
      else{
        newones.push(endTimeAllUser[TeamMemberList[userindex]][id]);
      }
    }
    //new comming JIRA
    mailbody_weekly  +=  '<h4>New ones '+newones.length+': </h4>';
    mailbody_weekly  +=  '<table border="1">';
    mailbody_weekly  +=  '<tr>';
    mailbody_weekly  +=  '<th>key</th>';
    mailbody_weekly  +=  '<th>summary</th>';
    mailbody_weekly  +=  '<th>assignee</th>';
    mailbody_weekly  +=  '<th>status</th>';
    mailbody_weekly  +=  '<th>dueDate</th>';
    mailbody_weekly  +=  '<th>variant</th>';
    mailbody_weekly  +=  '</tr>';
    for(let n=0;n<newones.length;n++){
      mailbody_weekly +=  '<tr>';
      mailbody_weekly +=  '<td><a href="'+newones[n].link+'">'+newones[n].key+'</a></td>'
      mailbody_weekly +=  '<td>'+newones[n].summary+'</td>'
      mailbody_weekly +=  '<td>'+newones[n].assignee+'</td>'
      mailbody_weekly +=  '<td>'+newones[n].stat+'</td>'
      mailbody_weekly +=  '<td>'+newones[n].dueDate+'</td>'
      mailbody_weekly +=  '<td>'+newones[n].variantname+'</td>'
      mailbody_weekly +=  '</tr>';
    }
    //JIRA 
    mailbody_weekly  +=  '</body>';
    mailbody_weekly  +=  '</html>';
    fs.writeFileSync('/local_vol1_nobackup/benpeng/jira/NBIF_ALL_JIRA/'+startTime+'.'+endTime+'.'+TeamMemberList[userindex]+'.weekly',mailbody_weekly,{
      encoding  : 'utf8',
      mode      : '0600',
      flag      : 'w'
    })
    //send mail
    let CC  = '';
    for (let c=0;c<CClist.length;c++){
      CC  +=  ' -c '+getemail(CClist[c])+' ';
    }
    console.log('AA');
    console.log(CC);
    console.log(TeamMemberList[userindex]);
    console.log(getemail(TeamMemberList[userindex]));
    child_process.execSync('mutt '+getemail(TeamMemberList[userindex])+' -e  \'set content_type="text/html"\' -s "[NBIF][JIRA]Weekly personal JIRA progress" '+CC+'  < '+'/local_vol1_nobackup/benpeng/jira/NBIF_ALL_JIRA/'+startTime+'.'+endTime+'.'+TeamMemberList[userindex]+'.weekly');//TODO
  }
  sendReport.stop();
}, null,true, 'Asia/Chongqing');
