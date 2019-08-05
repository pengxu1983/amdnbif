let refTreeRoot     = '';
let regTreeRootList = [
  '/proj/cip_floyd_genz/ip_regress/antti/nbif2_0_mi200_apu/'
];//MODIFY
let out_home        = '/out/linux_3.10.0_64.VCS/';
var moment          = require('moment');
var querystring     = require('querystring');
var http            = require('http');
var fs              = require('fs');
var child_process   = require('child_process');
var cronJob         = require("cron").CronJob;
var workspace       = '/proj/cip_floyd_genz/benpeng';////MODIFY
let postQ           = [];
let postQlimit      = 20;////MODIFY
let treeInfoList    = [];
let cron_send_request = new cronJob('* * * * * *',function(){
  console.log('cron_send_request starts at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  console.log(treeInfoList);
  console.log(treeInfoList.length);
  if(postQ.length ==  0){
    cron_send_request.stop();
    for(let t = 0;t<treeInfoList.length;t++){
      let treeInfo = treeInfoList[t];
      console.log('current treeInfo is');
      console.log(treeInfo);
      let postData = querystring.stringify({
        projectname : treeInfo['projectname'],
        variantname : treeInfo['variantname'],
        isBAPU      : treeInfo['isBAPU'],     
        kickoffdate : treeInfo['kickoffdate'],
        changelist  : treeInfo['changelist'], 
        shelve      : treeInfo['shelve'],     
      });
      
      let options = {
        hostname: 'amdnbif3.thehunters.club',
        port: 80,
        path: '/regression/summary',
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
          //console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
          //console.log('No more data in response.');
          console.log('summary DONE');
        });
      });
      
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });
      
      // write data to request body
      req.write(postData);
      req.end();
    }
  }
  else{
    let indexmax  = postQlimit;
    if(postQlimit>=postQ.length){
      indexmax  = postQ.length;
    }
    for(let onereq=0;onereq<indexmax;onereq++){
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
        //console.log(`STATUS: ${res.statusCode}`);
        //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          //console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
          //console.log('No more data in response.');
        });
      });
      
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });
      
      // write data to request body
      req.write(postData);
      req.end();
    }
    postQ.splice(0,indexmax);
  }
},null,false,'Asia/Chongqing');
let cron_check_result = new cronJob('0 30 */6 * * *',function(){
  console.log('cron_check_result starts at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  console.log('basic info :');
  console.log('refTreeRoot is '+refTreeRoot);
  console.log('regTreeRootList is ');
  console.log(regTreeRootList);
  let testlist    = [];
  let grouplist   = [];
  let mergedgrouplist   = [];
  let testResult  = {};
  //testlist get
  for(let i=0;i<regTreeRootList.length;i++){
    let treeInfo    = {};
    let regTreeRoot = regTreeRootList[i];
    if(fs.existsSync(regTreeRoot+'/NBIF_TREE_INFO')){
      console.log('NBIF_TREE_INFO ok');
      let lines = fs.readFileSync(regTreeRoot+'/NBIF_TREE_INFO','utf8').split('\n');
      lines.pop();
      let flag = 1;
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
    let R = treeInfoList;
    console.log('treeInfo is :::');
    console.log(treeInfo);
    console.log(R);
    if(R.length == 0){
      treeInfoList.push({
        projectname : treeInfo['projectname'],
        variantname : treeInfo['variantname'],
        kickoffdate : treeInfo['kickoffdate'],
        changelist  : treeInfo['changelist'],
        shelve      : treeInfo['shelve'],
        isBAPU      : treeInfo['isBAPU']
      });
      console.log('first push');
    }
    else{
      let flag = 1;
      for(let t=0;t<R.length;t++){
        console.log('dbg');
        console.log(R[t]);
        if(
          (R[t]['projectname'] == treeInfo['projectname']) &&
          (R[t]['variantname'] == treeInfo['variantname']) &&
          (R[t]['kickoffdate'] == treeInfo['kickoffdate']) &&
          (R[t]['changelist']  == treeInfo['changelist'])  &&
          (R[t]['shelve']      == treeInfo['shelve'])      &&
          (R[t]['isBAPU']      == treeInfo['isBAPU']) 
        ){
          flag  = 0;
          break;
        }
      }
      if(flag ==  1){
        console.log('push');
        treeInfoList.push({
          projectname : treeInfo['projectname'],
          variantname : treeInfo['variantname'],
          kickoffdate : treeInfo['kickoffdate'],
          changelist  : treeInfo['changelist'],
          shelve      : treeInfo['shelve'],
          isBAPU      : treeInfo['isBAPU']
        });
      }
      else{
        console.log('not push');
      }
    }
    if(fs.existsSync(regTreeRoot+'/testlist.log')){
      let lines     = fs.readFileSync(regTreeRoot+'/testlist.log','utf8').split('\n');
      lines.pop();
      let regx01    = /^\[dj \d+:\d+:\d+ I\]:   "testcase": "(.*)"/;
      let regx02    = /^\[dj \d+:\d+:\d+ I\]:   }/;
      let regx03    = /^\[dj \d+:\d+:\d+ I\]:     "name": "(.*)"/;
      let regx04    = /^\[dj \d+:\d+:\d+ I\]:     "config": "(.*)"/;
      let regx05    = /^\[dj \d+:\d+:\d+ I\]:     "run_seed": "(.*)"/;
      let regx06    = /^\[dj \d+:\d+:\d+ I\]:     "group": "(.*)"/;
      let regx07    = /^\[dj \d+:\d+:\d+ I\]:     "run_start_time": "(.*)"/;
      let regx08    = /^\[dj \d+:\d+:\d+ I\]:     "run_out_path": "(.*)"/;
      let regx09    = /^\[dj \d+:\d+:\d+ I\]:     "fullname": "(.*)"/;
      let flag      = 0;
      let testname  = '';
      //parse testlist from testlist.log ////start
      for(let l=0;l<lines.length;l++){
        if(regx01.test(lines[l])){
          flag = 1;
          lines[l].replace(regx01,function(rs,$1){
            let R1 = $1.split('::');
            let R2 = R1[1].split('/');
            testname = R2[1];
            let suite    = R2[0];
            testResult[testname]  ={};
            testResult[testname]['suite']       = suite;
            testResult[testname]['kickoffdate'] = treeInfo['kickoffdate'];
            testResult[testname]['variantname'] = treeInfo['variantname'];
            testResult[testname]['changelist']  = treeInfo['changelist'];
            testResult[testname]['projectname'] = treeInfo['projectname'];
            testResult[testname]['shelve']      = treeInfo['shelve'];
            testResult[testname]['isBAPU']      = treeInfo['isBAPU'];
            if(testlist.indexOf(testname)==-1){
              testlist.push(testname);
              console.log('testname :');
              console.log(testname);
              console.log('suite');
              console.log(testResult[testname]['suite']);
            }
          });
        }
        else if(regx02.test(lines[l])){
          flag = 0;
        }
        else if(flag == 1){
          if(regx04.test(lines[l])){
            lines[l].replace(regx04,function(rs,$1){
              testResult[testname]['config'] = $1;
              console.log('config');
              console.log($1);
            });
          }
          else if(regx05.test(lines[l])){
            lines[l].replace(regx05,function(rs,$1){
              testResult[testname]['run_seed'] = $1;
              console.log('run_seed');
              console.log($1);
            });
          }
          else if(regx06.test(lines[l])){
            lines[l].replace(regx06,function(rs,$1){
              testResult[testname]['groupname'] = $1;
              if(grouplist.indexOf($1) == -1){
                grouplist.push($1);
              }
              console.log('groupname');
              console.log($1);
            });
          }
          else if(regx07.test(lines[l])){
            lines[l].replace(regx07,function(rs,$1){
              testResult[testname]['run_start_time'] = $1;
              console.log('run_start_time');
              console.log($1);
            });
          }
          else if(regx08.test(lines[l])){
            lines[l].replace(regx08,function(rs,$1){
              let tmp = $1.split('OUT_HOME');
              testResult[testname]['run_out_path'] = regTreeRoot+out_home+tmp[1];
              console.log('run_out_path');
              console.log(testResult[testname]['run_out_path']);
            });
          }
          else if(regx09.test(lines[l])){
            lines[l].replace(regx09,function(rs,$1){
              let R1 = $1.split('::');
              let R2 = R1[1].split('/');
              suite = R2[0];
              console.log('suite');
              console.log(suite);
            });
          }
        }
      }
      //parse testlist from testlist.log ////end
    }
    else{
      console.log('invalid tree!!!');
      return;
    }
  }
  console.log('tree infos are');
  console.log(treeInfoList);
  console.log('test number is');
  console.log(testlist.length);
  //console.log('group number is');
  //console.log(grouplist.length);
  cron_send_request.stop();
  for(let testName in testResult){
    console.log(' checking ...'+testName);
    testResult[testName]['result']      = 'UNKNOWN';
    testResult[testName]['signature']   = 'NA';
    testResult[testName]['seed']        = 'NA';
    testResult[testName]['runtime']     = 'NA';
    if(fs.existsSync(testResult[testName]['run_out_path']+'/REGRESS_PASS')){
      testResult[testName]['result']      = 'PASS';
    }
    else if(fs.existsSync(testResult[testName]['run_out_path']+'/vcs_run.log')){
      let R =child_process.execSync(workspace+'/amdnbif/nbif3.0/clt/clt_regression/tools/processSimLog.pl '+testResult[testName]['run_out_path']+'/vcs_run.log',{//MODIFY
        encoding  : 'utf8',
        maxBuffer : 1024*1024*100
      });
      let RR = R.split('\n');
      testResult[testName]['seed']       = RR[0];
      testResult[testName]['result']     = RR[1];
      testResult[testName]['signature']  = RR[2];
      if((testResult[testName]['seed'] != 'NA') && (testResult[testName]['result'] == 'NA')){
        testResult[testName]['result']  = 'RUNNING';
      }
    }
    let R = mergedgrouplist;
    if(R.length == 0){
      mergedgrouplist.push({
        groupname   : testResult[testName]['groupname'],
        isBAPU      : testResult[testName]['isBAPU'],
        projectname : testResult[testName]['projectname'],
        variantname : testResult[testName]['variantname'],
        kickoffdate : testResult[testName]['kickoffdate'],
        changelist  : testResult[testName]['changelist'],
        shelve      : testResult[testName]['shelve']
      });
    }
    else{
      let flag = 1;
      for(let g=0;g<R.length;g++){
        if(
          (R[g].groupname   == testResult[testName]['groupname']  ) &&
          (R[g].isBAPU      == testResult[testName]['isBAPU']     ) &&
          (R[g].variantname == testResult[testName]['variantname']) &&
          (R[g].projectname == testResult[testName]['projectname']) &&
          (R[g].kickoffdate == testResult[testName]['kickoffdate']) &&
          (R[g].changelist  == testResult[testName]['changelist'])  &&
          (R[g].shelve      == testResult[testName]['shelve'])
        ){
          flag = 0;
        }
      }
      if(flag ==  1){
        mergedgrouplist.push({
          groupname   : testResult[testName]['groupname'],
          isBAPU      : testResult[testName]['isBAPU'],
          projectname : testResult[testName]['projectname'],
          variantname : testResult[testName]['variantname'],
          kickoffdate : testResult[testName]['kickoffdate'],
          changelist  : testResult[testName]['changelist'],
          shelve      : testResult[testName]['shelve']
        });
      }
    }
    postQ.push({
      'kind'          : 'onecase',
      'oneTestResult' : JSON.stringify({
        testname      : testName,
        kickoffdate   : testResult[testName]['kickoffdate'],
        variantname   : testResult[testName]['variantname'],
        changelist    : testResult[testName]['changelist'],
        projectname   : testResult[testName]['projectname'],
        result        : testResult[testName]['result'],
        seed          : testResult[testName]['seed'],
        signature     : testResult[testName]['signature'],
        suite         : testResult[testName]['suite'],
        shelve        : testResult[testName]['shelve'],
        isBAPU        : testResult[testName]['isBAPU'],
        groupname     : testResult[testName]['groupname']
      })
    });
  }
  console.log('group number');
  console.log(mergedgrouplist.length);
  console.log(mergedgrouplist);
  let postData = querystring.stringify({
    'kind': 'oneregression',
    'oneRegression':  JSON.stringify({
      mergedgrouplist : mergedgrouplist
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
    //console.log(`STATUS: ${res.statusCode}`);
    //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
      cron_send_request.start();
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


  friendlyName: 'Check main',


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


  fn: async function (inputs) {

    // All done.
    return;

  }


};
