let querystring     = require('querystring');
let http            = require('http');
let moment          = require('moment');
let process         = require('process');
let cronJob         = require("cron").CronJob;
let child_process   = require('child_process');
let fs              = require('fs');
let loginit         = function(){
  return '[LOG]['+moment().format('YYYY-MM-DD HH:mm:ss')+'] ';
};
let process         = {};
module.exports = {


  friendlyName: 'Parameters',


  description: 'Parameters something.',


  inputs: {
    tasktype  : {
      type  : 'string'
    },
    params  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/parameters');
    sails.log(inputs);
    let hostname  = 'localhost';
    let port      = 9001;
    let method    = 'POST';
    let path;
    switch  (inputs.tasktype){
      case  'shelvesanitycheckstart':
        path  = 'cleanworkspace';
        break;
    }
    //////////////////
    //// next step
    //////////////////
    let postData = querystring.stringify(inputs);
    
    let options = {
      hostname: hostname,
      port: port,
      path: path,
      method: method,
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
    
    // Write data to request body
    req.write(postData);
    req.end();
    //////////////////
    //// next step
    //////////////////


    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
