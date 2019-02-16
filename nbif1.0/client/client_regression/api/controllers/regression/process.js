var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
var workspace     = '/proj/bif_nbio_vol3_backup/benpeng/';
var jobid_regression_newkickoff = new cronJob('* * * * * *',function(){
  console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
  console.log('jobid_regression_newkickoff start');
  if(fs.existsSync(workspace+'/amdnbif_scripts/')){
  }
  else{
    fs.mkdirSync('mkdir '+workspace+'/amdnbif_scripts/');
  }
  //find info from DB
  //changelist
  let postData = querystring.stringify({
    'kind': 'regressioninfo'
  });
  
  let options = {
    hostname: 'amdnbif.thehunters.club',
    port: 80,
    path: '/regression/info',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  let req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
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

  //variant
  //project
  let text = '';
  text += '#!/tool/pandora64/bin/tcsh\n';
  text += 'cd '+workspace+'/nbif\n';

},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Process',


  description: 'Process regression.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
