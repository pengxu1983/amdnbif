var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
var workspace     = '/proj/bif_nbio_vol3_backup/benpeng/';
var jobid_regression_checkresults = new cronJob('*/5 * * * * *',function(){
  console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
  console.log('jobid_regression_checkresults start');
  //get info from DB //TODO
  //Projects 
  //Dirs per project
  let dir = '/proj/nbif_mero_regress1/ip_regress/anttili/branch_nv21_normal_split1/';
  let mode = 'normal';
  let projectname = 'NV21';
  let changelist ;
  //get changelist that regression pick
  let R = child_process.execSync('cd '+dir+' && p4 changes -m1 ...#have',{
    encoding : 'utf8'
  }).split(' ');
  R.pop();
  changelist = R[1];
  let date = R[3];
  console.log('changelist : '+changelist);
  console.log('date : '+date);
  //Send to DB
  let postData = querystring.stringify({
    'kind'        : 'newkickoff',
    'changelist'  : changelist,
    'mode'        : 'normal',
    'date'        : date
  });
  
  let options = {
    hostname: 'amdnbif.thehunters.club',
    port: 80,
    path: '/regression/pushchangelist',
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
    //console.error(`problem with request: ${e.message}`);
  });
  
  // write data to request body
  req.write(postData);
  req.end();
  jobid_regression_checkresults.stop();
},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Resultcheck',


  description: 'Resultcheck regression.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
