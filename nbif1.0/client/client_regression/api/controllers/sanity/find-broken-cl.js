var querystring = require('querystring');
var http = require('http');
var fs= require('fs');
var cronJob = require("cron").CronJob;
var child_process = require('child_process');
var jobid_checkIfSanityBroken = new cronJob('*/10 * * * * *',function(){
  //Get the lastCL and lastpassCL

  var postData = querystring.stringify({
    'kind'        : 'getbrokencl',
    'projectname' : 'MERO',
    'variantname' : 'nbif_al_gpu'
  });
  
  var options = {
    hostname: 'amdnbif.thehunters.club',
    port: 80,
    path: '/sanitys/getbrokencl',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  var req = http.request(options, (res) => {
    sails.log(`STATUS: ${res.statusCode}`);
    sails.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      sails.log(`BODY: ${chunk}`);
      sails.log(chunk.lastpassCL);
    });
    res.on('end', () => {
      sails.log('No more data in response.');
    });
  });
  
  req.on('error', (e) => {
    sails.error(`problem with request: ${e.message}`);
  });
  
  // write data to request body
  req.write(postData);
  req.end();
},null,false,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Find broken cl',


  description: '',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('sanity/find-broken-cl');
    if(inputs.kind == 'start'){
      jobid_checkIfSanityBroken.start();
    }
    else if(inputs.kind == 'stop'){
      jobid_checkIfSanityBroken.stop();
    }
    // All done.
    return exits.success({
      ok  : 'ok'
    });

  }


};
