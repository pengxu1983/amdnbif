let moment        = require('moment');
let querystring   = require('querystring');
let http          = require('http');
let fs            = require('fs');
let child_process = require('child_process');
let cronJob       = require("cron").CronJob;
let CONF          = '/proj/cip_floyd_genz/benpeng/amdnbif/nbif3.0/clt/clt_sanity_agent/tools/CONF';
///////////////////////////////
//
//
//          Get Changelist
//
//           start
///////////////////////////////
let cron_changelist  = new cronJob('*/5 * * * * *',function(){
  let configs= {};
  if(fs.existsSync(CONF)){
    let content = fs.readFileSync(CONF,{
      encoding  : 'utf8',
    });
    let lines = content.split('\n');
    lines.pop();
    for(let l=0;l<lines.length;l++){
      let R = lines[l].split(':::');
      configs[R[0]]=R[1];
      console.log(R[0]);
      console.log(R[1]);
    }
  }
  else{
    console.log('no CONF');
  }
  cron_changelist.stop();
  //send request to get infos
  let postData = querystring.stringify({
    'kind': 'earliestunchecked',
    'agentID' : configs['agentID']
  });
  
  let options = {
    hostname: 'amdnbif3.thehunters.club',
    port: 80,
    path: '/changelist/get',
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
      console.log(`BODY: ${chunk}`);
      let body= JSON.parse(chunk);
      if(body.ok  ==  'ok'){
        let postData = querystring.stringify({
          'start': 'getinfo',
          'data': JSON.stringify({
            branchname  : body.branchname,
            changelist  : body.changelist
          })
        });
        
        let options = {
          hostname: 'localhost',
          port: 8001,
          path: '/process',
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
            console.log(`BODY: ${chunk}`);
          });
          res.on('end', () => {
            console.log('No more data in response.');
          });
        });
        
        req.on('error', (e) => {
          console.error(`problem with request: ${e.message}`);
        });
        
        // write data to request body
        req.write(postData);
        req.end();
      }
      else{
        cron_changelist.start();
      }
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });
  
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  // write data to request body
  req.write(postData);
  req.end();
},null,true,'Asia/Chongqing');
///////////////////////////////
//
//
//          Get Info
//
//            end
///////////////////////////////
module.exports = {


  friendlyName: 'Getinfo',


  description: 'Getinfo something.',


  inputs: {
    start : {
      type  : 'string'
    },
    data  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/getinfo');
    sails.log(inputs);
    if(inputs.start ==  'cron_changelist'){
      cron_changelist.start();
    }
    if(inputs.start ==  'getinfo'){
      let data = JSON.parse(inputs.data);
      let branchname  = data.branchname;
      let changelist  = data.changelist;
      let postData = querystring.stringify({
        'kind': 'sanityinfo'
      });
      
      let options = {
        hostname: 'amdnbif3.thehunters.club',
        port: 80,
        path: '/sanityagent/getinfo',
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
          console.log(`BODY: ${chunk}`);
          let body = JSON.parse(chunk);
          let variants  = JSON.parse(body.variants);
          let projects  = JSON.parse(body.projects);
          let tasks     = JSON.parse(body.tasks);
        });
        res.on('end', () => {
          console.log('No more data in response.');
        });
      });
      
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });
      
      // write data to request body
      req.write(postData);
      req.end();
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok',
      msg : 'done'
    }));

  }


};
