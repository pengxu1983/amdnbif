let workdir       = '/proj/cip_arden_nbif_regress4/benpeng';
let regTreeRoot   = workdir + '';//TODO
let refTreeRoot   = workdir + '/nbif.main.ref';
let moment        = require('moment');
let querystring   = require('querystring');
let http          = require('http');
let fs            = require('fs');
let child_process = require('child_process');
let cronJob       = require("cron").CronJob;
let webhost       = 'amdnbif3.thehunters.club';//MODIFY
let checkresult   = new cronJob('0 0 */3 * * *',function(){
  console.log('start at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  //get basic tree info
  let lines = fs.readFileSync(regTreeRoot+'/NBIF_TREE_INFO','utf8').split('\n');
  lines.pop();
  let treeInfo={};
  for(let l=0;l<lines.length;l++){
    let R = lines[l].split(':::');
    treeInfo[R[0]]=R[1];
  }
  //Check if already have basic tree info
  let postData = querystring.stringify({
    'changelist'  : treeInfo['changelist'],
    'kickoffdate' : treeInfo['kickoffdate'],
    'projectname' : treeInfo['projectname'],
    'variantname' : treeInfo['variantname'],
    'modename'    : treeInfo['modename'],
    'shelve'      : treeInfo['shelve']
  });
  
  let options = {
    hostname: webhost,
    port: 80,
    path: '/regression/uploadtreeinfo',
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
      console.log('ok :'+JSON.parse(chunk).ok);
      console.log('msg :'+JSON.parse(chunk).msg);
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

},null,false,'Asia/Chongqing');

module.exports = {


  friendlyName: 'Getresults 0001',


  description: '',


  inputs: {
    start : {
      type  : 'string'
    },
    stop  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regressiondetails/getresults0001');
    sails.log(inputs);
    if(inputs.start  ==  'checkresult'){
      checkresult.start();
      return exits.success(JSON.stringify({
        ok  : 'ok',
        msg : 'checkresult  started'
      }));
    }
    if(inputs.stop  ==  'checkresult'){
      checkresult.stop();
      return exits.success(JSON.stringify({
        ok  : 'ok',
        msg : 'checkresult  stopped'
      }));
    }

  }


};
