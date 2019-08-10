let moment        = require('moment');
let querystring   = require('querystring');
let http          = require('http');
let fs            = require('fs');
let child_process = require('child_process');
let cronJob       = require("cron").CronJob;
//let workdir       = '/proj/cip_floyd_genz/nbif_regression/';
//let refTreeRoot   = workdir+'/nbif.main/';
let cron_disbatch  = new cronJob('0 */2 * * * *',function(){
  console.log('cron_disbatch start at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  let postData = querystring.stringify({
    'kind': 'dispatch'
  });
  
  let options = {
    hostname: 'amdnbif3.thehunters.club',
    port: 80,
    path: '/sanity/dispatch',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  let req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
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
  
},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Dispatch',


  description: 'Dispatch something.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
