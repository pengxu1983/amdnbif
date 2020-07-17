#!/home/benpeng/nbifweb_client/software/node/bin/node
let fs = require('fs');
let xml2js = require('xml2js');
let moment = require('moment');
let process         = require('process');
let child_process   = require('child_process');
let querystring     = require('querystring');
let http            = require('http');
let xmlfile = process.argv[2];
//console.log(xmlfile);
let NBIF_ALL_JIRA  = {};
let fields;
let parser = new xml2js.Parser();
//TODO  need to collect all files under one DIR
fs.readFile(xmlfile, function(err, data) {
  let sampleDate  = '2020-07-15';//TODO
  parser.parseString(data,async function (err, result) {
    //console.dir(result.rss.channel[0].item[0].customfields[0].customfield);
    //console.dir(result.rss.channel[0].item[0].comments[0].comment);
    //console.dir(result.rss.channel[0].item[0]);
    for(let i=0;i<result.rss.channel[0].item.length;i++){
      //JIRAID
      let JIRAID  = result.rss.channel[0].item[i].key[0].$.id;
      //console.dir(JIRAID);
      //key
      let key = result.rss.channel[0].item[i].key[0]._;
      //console.dir(key);
      //summary
      let summary = result.rss.channel[0].item[i].summary[0];
      //console.dir(summary);
      //description
      let description = result.rss.channel[0].item[i].description[0];
      //console.dir(description);
      //lastComment
      let lastComment = undefined;
      let lastCommentauthor = undefined;
      let lastCommentcreateddate  = undefined;
      if(result.rss.channel[0].item[i].hasOwnProperty('comments')){
        lastComment = result.rss.channel[0].item[i].comments[0].comment[0]._;
        lastCommentauthor = result.rss.channel[0].item[i].comments[0].comment[0].$.author;
        lastCommentcreateddate   = moment(moment(result.rss.channel[0].item[i].comments[0].comment[0].$.created).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
      }
      //console.dir(lastComment);
      //console.dir(lastCommentauthor);
      //console.dir(lastCommentcreateddate);
      //reporter
      let reporter  = result.rss.channel[0].item[i].reporter[0].$.username;
      //console.dir(reporter);
      //assignee
      let assignee  = result.rss.channel[0].item[i].assignee[0].$.username;
      //console.dir(assignee);
      //type
      let type  = result.rss.channel[0].item[i].type[0]._;
      //console.dir(type);
      //createdDate
      let createdDate = moment(moment(result.rss.channel[0].item[i].created[0]).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
      //console.dir(createdDate);
      //updatedDate
      let updatedDate = moment(moment(result.rss.channel[0].item[i].updated[0]).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
      //console.dir(updatedDate);
      //dueDate
      let dueDate = '';
      if(result.rss.channel[0].item[i].due[0] !=  ''){
        dueDate = moment(moment(result.rss.channel[0].item[i].due[0]).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
      }
      //console.dir(dueDate);
      //status
      let stat  = result.rss.channel[0].item[i].status[0]._;
      //console.dir(stat);
      //closedDate
      let closedDate;
      if(stat ==  'Closed'){
        //closedDate  = moment(moment(result.rss.channel[0].item[i].[0]).format('ddd, D MMM YYYY HH:mm:ss ZZ')).format('YYYY-MM-DD');
        fields  = result.rss.channel[0].item[i].customfields[0].customfield;
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
        fields  = result.rss.channel[0].item[i].customfields[0].customfield;
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
      fields  = result.rss.channel[0].item[i].customfields[0].customfield;
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
      //child_process.execSync('sleep 1');
      //console.log('sending '+key);
      let postData = querystring.stringify({
        'JIRAID'      : JIRAID,
        'key'         : key,
        'summary'     : summary,
        'description' : description,
        'reporter'    : reporter,
        'assignee'    : assignee,
        'dueDate'     : dueDate,
        'createdDate' : createdDate,
        'updatedDate' : updatedDate,
        'deferredDate': deferredDate,
        'closedDate'  : closedDate,
        'variantname' : variantname,
        'sampleDate'  : sampleDate,
        'type'        : type,
        'stat'        : stat,
        'lastComment' : lastComment
      });
      
      let options = {
        hostname: 'atletx7-neu003',
        port: 7031,
        path: '/jira/add',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      };
      
      let req = http.request(options, (res) => {
        //console.log(`STATUS: ${res.statusCode}`);
        //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          //console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
          //console.log('No more data in response.');
        });
      });
      
      req.on('error', (e) => {
        //console.dir(JSON.parse(postData));
        //console.error(`problem with request: ${e.message}`);
      });
      
      // Write data to request body
      req.write(postData);
      req.end();

    }
    

    //console.dir(result.rss.channel[0].item[0].customfields[0]);
    console.log('Done');
  });
});
