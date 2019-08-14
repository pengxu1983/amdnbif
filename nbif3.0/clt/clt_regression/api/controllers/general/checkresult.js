//let refTreeRoot     = '';
let regTreeRoot     = '/proj/cip_floyd_genz/ip_regress/antti/nbif2_0_mi200/';//TODO
let regTreeRootList = [
  '/proj/cip_floyd_genz/ip_regress/antti/nbif2_0_mi200_apu/',
  //'/proj/cip_floyd_genz/ip_regress/antti/nbif2_0_mi200/',
];//MODIFY ///TODO
let out_home        = '/out/linux_3.10.0_64.VCS/';
var moment          = require('moment');
var querystring     = require('querystring');
var http            = require('http');
var fs              = require('fs');
var child_process   = require('child_process');
var cronJob         = require("cron").CronJob;
var workspace       = '/proj/cip_floyd_genz/benpeng';////MODIFY
let dly             = async function(ms){
  return new Promise(function(resolve){
    setTimeout(resolve,ms);
  });
}
let cron_check_result = new cronJob('0 * * * * *',function(){
  cron_check_result.stop();
  let postData = querystring.stringify({
    'start': 'oneregressioncheck'
  });
  
  let options = {
    hostname: 'localhost',
    port: 9001,
    path: '/general/checkresult',
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
    //console.error(`problem with request: ${e.message}`);
  });
  
  // write data to request body
  req.write(postData);
  req.end();
},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Process',


  description: 'Process general.',


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
    sails.log('/general/checkresult');
    sails.log(inputs);
    if(inputs.start == 'oneregressioncheck'){
      cron_check_result.stop();
      console.log('cron_check_result starts at '+moment().format('YYYY-MM-DD HH:mm:ss'));
      for(let onetree = 0;onetree <regTreeRootList.length;onetree++){
        ///////////
        //one tree
        ///////////
        let oneregTreeRoot  = regTreeRootList[onetree];
        console.log('tree : '+oneregTreeRoot);
        //let grouplist = [];
        let testResult= {};
        let treeInfo  = {};
        //treeinfo get
        //----start----
        if(fs.existsSync(oneregTreeRoot+'/NBIF_TREE_INFO')){
          console.log('NBIF_TREE_INFO ok');
          let lines = fs.readFileSync(oneregTreeRoot+'/NBIF_TREE_INFO','utf8').split('\n');
          lines.pop();
          for(let l=0;l<lines.length;l++){
            let R = lines[l].split(':::');
            treeInfo[R[0]]  = R[1];
            console.log(R[0]+' is '+R[1]);
          }
        }
        else{
          console.log('invalid tree!!!');
          continue;
        }
        //----end----
        

        //testlist get
        //----start----
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
                //if(testlist.indexOf(testname)==-1){
                //  testlist.push(testname);
                  console.log('testname :');
                  console.log(testname);
                  console.log('suite');
                  console.log(testResult[testname]['suite']);
                //}
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
                  //if(grouplist.indexOf($1) == -1){
                  //  grouplist.push($1);
                  //}
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
              //else if(regx09.test(lines[l])){
              //  lines[l].replace(regx09,function(rs,$1){
              //    let R1 = $1.split('::');
              //    let R2 = R1[1].split('/');
              //    suite = R2[0];
              //    console.log('suite');
              //    console.log(suite);
              //  });
              //}
            }
          }
          //parse testlist from testlist.log ////end
        }
        else{
          console.log('invalid tree!!!');
          continue;
        }
        //----end----
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
            if((testResult[testName]['seed'] != 'NA') && (testResult[testName]['signature'] == 'NA')){
              testResult[testName]['result']  = 'RUNNING';
            }
          }
          await dly(500);
          let postData = querystring.stringify({
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
            console.log(postData);
          });
          
          // write data to request body
          req.write(postData);
          req.end();
          //let R = mergedgrouplist;
          //if(R.length == 0){
          //  mergedgrouplist.push({
          //    groupname   : testResult[testName]['groupname'],
          //    isBAPU      : testResult[testName]['isBAPU'],
          //    projectname : testResult[testName]['projectname'],
          //    variantname : testResult[testName]['variantname'],
          //    kickoffdate : testResult[testName]['kickoffdate'],
          //    changelist  : testResult[testName]['changelist'],
          //    shelve      : testResult[testName]['shelve']
          //  });
          //}
          //else{
          //  let flag = 1;
          //  for(let g=0;g<R.length;g++){
          //    if(
          //      (R[g].groupname   == testResult[testName]['groupname']  ) &&
          //      (R[g].isBAPU      == testResult[testName]['isBAPU']     ) &&
          //      (R[g].variantname == testResult[testName]['variantname']) &&
          //      (R[g].projectname == testResult[testName]['projectname']) &&
          //      (R[g].kickoffdate == testResult[testName]['kickoffdate']) &&
          //      (R[g].changelist  == testResult[testName]['changelist'])  &&
          //      (R[g].shelve      == testResult[testName]['shelve'])
          //    ){
          //      flag = 0;
          //    }
          //  }
          //  if(flag ==  1){
          //    mergedgrouplist.push({
          //      groupname   : testResult[testName]['groupname'],
          //      isBAPU      : testResult[testName]['isBAPU'],
          //      projectname : testResult[testName]['projectname'],
          //      variantname : testResult[testName]['variantname'],
          //      kickoffdate : testResult[testName]['kickoffdate'],
          //      changelist  : testResult[testName]['changelist'],
          //      shelve      : testResult[testName]['shelve']
          //    });
          //  }
          //}
          //postQ.push({
          //  'kind'          : 'onecase',
          //  'oneTestResult' : JSON.stringify({
          //    testname      : testName,
          //    kickoffdate   : testResult[testName]['kickoffdate'],
          //    variantname   : testResult[testName]['variantname'],
          //    changelist    : testResult[testName]['changelist'],
          //    projectname   : testResult[testName]['projectname'],
          //    result        : testResult[testName]['result'],
          //    seed          : testResult[testName]['seed'],
          //    signature     : testResult[testName]['signature'],
          //    suite         : testResult[testName]['suite'],
          //    shelve        : testResult[testName]['shelve'],
          //    isBAPU        : testResult[testName]['isBAPU'],
          //    groupname     : testResult[testName]['groupname']
          //  })
          //});
        }
        await dly(500);
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
          console.log(postData);
        });
        
        // write data to request body
        req.write(postData);
        req.end();
      } //for one tree done


    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
