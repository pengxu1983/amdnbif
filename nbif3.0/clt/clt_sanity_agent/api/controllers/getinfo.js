let moment        = require('moment');
let querystring   = require('querystring');
let http          = require('http');
let fs            = require('fs');
let child_process = require('child_process');
let cronJob       = require("cron").CronJob;
let CONF          = '/proj/cip_floyd_genz/benpeng/amdnbif/nbif3.0/clt/clt_sanity_agent/tools/'+'/CONF';
let params        = function(CONF){
  let configs = {};
  if(fs.existsSync(CONF)){
    let content = fs.readFileSync(CONF,{
      encoding  : 'utf8',
    });
    let lines = content.split('\n');
    lines.pop();
    for(let l=0;l<lines.length;l++){
      let R = lines[l].split(':::');
      configs[R[0]]=R[1];
    }
  }
  return configs;
};
let cron_getinfo  = new cronJob('*/5 * * * * *',function(){
  cron_getinfo.stop();
  //send request to get infos
  let postData = querystring.stringify({
    'kind': 'earliestunchecked',
    'agentID' : params['agentID']
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
      let body = JSON.parse(chunk);
      if(body.ok  ==  'ok'){
        //next
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
module.exports = {


  friendlyName: 'Getinfo',


  description: 'Getinfo something.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
