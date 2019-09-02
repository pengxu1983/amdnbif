var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
let cron_clean_daily = new cronJob('0 0 22 * * *',function(){
  let postData = querystring.stringify({
    'kind': 'all'
  });
  
  let options = {
    hostname: 'amdnbif2.thehunters.club',
    port: 80,
    path: '/regression/clean',
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
  
},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Clean',


  description: 'Clean regression.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/clean');
    sails.log(inputs);
    if(inputs.kind  ==  'all'){
      for(let day = 0 ; day < 5 ; day ++){
        await Regressiondetails0001.destroy({
          kickoffdate : moment().subtract(day+15,'days').format('YYYY-MM-DD')
        });
        await Regressiondetails0002.destroy({
          kickoffdate : moment().subtract(day+15,'days').format('YYYY-MM-DD')
        });
        await Regressionsummary0001.destroy({
          kickoffdate : moment().subtract(day+15,'days').format('YYYY-MM-DD')
        });
        await Regressionsummary0002.destroy({
          kickoffdate : moment().subtract(day+15,'days').format('YYYY-MM-DD')
        });
      }
    }
    // All done.
    return exit.success(JSON.stringify({
      ok  : 'notok',
      msg : 'not valid kind'
    }));

  }


};
