let refTreeRoot   = '';
let regTreeRoot   = '/proj/nbif_mero_regress1/ip_regress/anttili/nbif2_0_3';
let resultDir     = regTreeRoot+'/out/linux_2.6.32_64.VCS/nbif_nv10_gpu/config/nbif_all_rtl/run/nbif-nv10_gpu-mi200';
var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
var workspace     = '/proj/cip_arden_nbif_regress4/benpeng';////MODIFY
//let projectname   = 'mi200';////MODIFY
//let variantname   = 'nbif_nv10_gpu';////MODIFY
let outDir        = {};
let postQ=[];
let postQlimit=5;////MODIFY
outDir['nbiftdl']     = resultDir+'/nbiftdl';
outDir['nbifresize']  = resultDir+'/nbifresize';
outDir['nbifrandom']  = resultDir+'/nbifrandom';
outDir['nbifgen4']    = resultDir+'/nbifgen4';
outDir['nbifdummyf']  = resultDir+'/nbifdummyf';
let cron_send_request = new cronJob('* * * * * *',function(){
  console.log('cron_send_request starts at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  if(postQ.length == 0){
    cron_send_request.stop();
    return;
  }
  else if(postQ.length <= postQlimit){
    for(let onereq=0;onereq<postQ.length;onereq++){
      let postData  = querystring.stringify(postQ[onereq]);
      console.log('To send : ');
      console.log(postQ[onereq]);
      let options = {
        hostname: 'amdnbif3.thehunters.club',
        port: 80,
        path: '/regression/upload',
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
    }
    postQ=[];
  }
  else{
    for(let onereq=0;onereq<postQlimit;onereq++){
      let postData  = querystring.stringify(postQ[onereq]);
      console.log('To send : ');
      console.log(postData);
      console.log(typeof(postData));
      let options = {
        hostname: 'amdnbif3.thehunters.club',
        port: 80,
        path: '/regression/upload',
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

    }
    postQ.splice(0,postQlimit);
  }
},null,false,'Asia/Chongqing');
let cron_check_result = new cronJob('0 * * * * *',function(){
  console.log('cron_check_result starts at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  console.log('basic info :');
  console.log('refTreeRoot is '+refTreeRoot);
  console.log('regTreeRoot is '+regTreeRoot);

  //get tree basic info
  //changelist
  //projectname
  //variantname
  //isBAPU
  //isBACO
  let treeInfo  = {};
  let testlist  = [];
  let testResult = {};
  if(fs.existsSync(regTreeRoot+'/NBIF_TREE_INFO')){
    console.log('NBIF_TREE_INFO ok');
    let lines = fs.readFileSync(regTreeRoot+'/NBIF_TREE_INFO','utf8').split('\n');
    lines.pop();
    for(let l=0;l<lines.length;l++){
      let R = lines[l].split(':::');
      treeInfo[R[0]]  = R[1];
      console.log(R[0]+' is '+R[1]);
    }
  }
  else{
    console.log('invalid tree!!!');
    return;
  }
  

  //get test list
  if(fs.existsSync(regTreeRoot+'/testlist.log')){
    console.log('testlist ok');
    let lines = fs.readFileSync(regTreeRoot+'/testlist.log','utf8').split('\n');
    lines.pop();
    let regx = /evaluation of 'testcase/;
    for(let l=0;l<lines.length;l++){
      if(regx.test(lines[l])){
        let R = lines[l].split('/');
        let RR = R[1].split('_nbif_all_rtl');
        let RRR = R[0].split('::');
        testlist.push(RR[0]);
        testResult[RR[0]]={};
        testResult[RR[0]]['suite']  = RRR[1];
        testResult[RR[0]]['isBAPU'] = treeInfo['isBAPU'];
        //console.log('testname is '+RR[0]);
        //console.log('suite is '+testResult[RR[0]]['suite']);
      }
    }
    console.log('testlist done');
    console.log('test number '+testlist.length);
    let postData = querystring.stringify({
      'kind': 'oneregression',
      'oneRegression' : JSON.stringify({
        kickoffdate   : treeInfo['kickoffdate'],
        variantname   : treeInfo['variantname'],
        changelist    : treeInfo['changelist'], 
        projectname   : treeInfo['projectname'],
        shelve        : treeInfo['shelve'],     
        isBAPU        : treeInfo['isBAPU'],     
        isBACO        : treeInfo['isBACO'],     
      })
    });
    
    let options = {
      hostname: 'amdnbif3.thehunters.club',
      port: 80,
      path: '/regression/upload',
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

  }
  else{
    console.log('invalid tree!!!');
    return;
  }
  //get results
  cron_send_request.stop();
  //for(let testName in testResult){
  //  //console.log(testName+' :');
  //  testResult[testName]['result']      = 'UNKNOWN';
  //  testResult[testName]['signature']   = 'NA';
  //  testResult[testName]['seed']        = 'NA';
  //  testResult[testName]['runtime']     = 'NA';
  //  if(fs.existsSync(outDir[testResult[testName]['suite']]+'/'+testName+'_nbif_all_rtl/REGRESS_PASS')){
  //    testResult[testName]['result']      = 'PASS';
  //  }
  //  else if(fs.existsSync(outDir[testResult[testName]['suite']]+'/'+testName+'_nbif_all_rtl/vcs_run.log')){
  //    let R =child_process.execSync(workspace+'/amdnbif/nbif3.0/clt/clt_regression/tools/processSimLog.pl '+outDir[testResult[testName]['suite']]+'/'+testName+'_nbif_all_rtl/vcs_run.log',{
  //      encoding  : 'utf8',
  //      maxBuffer : 1024*1024*100
  //    });
  //    let RR = R.split('\n');
  //    testResult[testName]['seed']       = RR[0];
  //    testResult[testName]['result']     = RR[1];
  //    testResult[testName]['signature']  = RR[2];
  //  }
  //  postQ.push({
  //    'kind'          : 'onecase',
  //    'oneTestResult' : JSON.stringify({
  //      kickoffdate   : treeInfo['kickoffdate'],
  //      variantname   : treeInfo['variantname'],
  //      changelist    : treeInfo['changelist'],
  //      projectname   : treeInfo['projectname'],
  //      testname      : testName,
  //      result        : testResult[testName]['result'],
  //      seed          : testResult[testName]['seed'],
  //      signature     : testResult[testName]['signature'],
  //      suite         : testResult[testName]['suite'],
  //      shelve        : treeInfo['shelve'],
  //      isBAPU        : treeInfo['isBAPU'],
  //      isBACO        : treeInfo['isBACO']
  //    })
  //  });
  //}
  //cron_send_request.start();
},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Check',


  description: 'Check mi 200.',


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
    //for all
    if(inputs.start == inputs.stop){
      return  exits.success(JSON.stringify({
        ok  : 'nok',
        msg : 'conflict opt'
      }));
    }
    //for cron_send_request
    if(inputs.start ==  'cron_send_request'){
      sails.log('Get request to start cron_send_request');
      cron_send_request.start();
      return  exits.success(JSON.stringify({
        ok  : 'ok',
        msg : 'Get request to start cron_send_request'
      }));
    }
    if(inputs.stop ==  'cron_send_request'){
      sails.log('Get request to stop cron_send_request');
      cron_send_request.stop();
      return  exits.success(JSON.stringify({
        ok  : 'ok',
        msg : 'Get request to stop cron_send_request'
      }));
    }
    //for cron_check_result
    if(inputs.start ==  'cron_check_result'){
      sails.log('Get request to start cron_check_result');
      cron_check_result.start();
      return  exits.success(JSON.stringify({
        ok  : 'ok',
        msg : 'Get request to start cron_check_result'
      }));
    }
    if(inputs.stop ==  'cron_check_result'){
      sails.log('Get request to stop cron_check_result');
      cron_check_result.stop();
      return  exits.success(JSON.stringify({
        ok  : 'ok',
        msg : 'Get request to stop cron_check_result'
      }));
    }
    return  exits.success(JSON.stringify({
      ok  : 'nok',
      msg : 'no opt'
    }));

  }


};
