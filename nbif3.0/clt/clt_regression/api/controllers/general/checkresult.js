let refTreeRoot     = '';
let regTreeRoot     = '/proj/cip_floyd_genz/ip_regress/antti/nbif2_0_mi200/';//TODO
let regTreeRootList = [
  '/proj/cip_floyd_genz/ip_regress/antti/nbif2_0_mi200_apu/',
  '/proj/cip_floyd_genz/ip_regress/antti/nbif2_0_mi200/',
];//MODIFY ///TODO
let out_home        = '/out/linux_3.10.0_64.VCS/';
var moment          = require('moment');
var querystring     = require('querystring');
var http            = require('http');
var fs              = require('fs');
var child_process   = require('child_process');
var cronJob         = require("cron").CronJob;
var workspace       = '/proj/cip_floyd_genz/benpeng';////MODIFY

//let postQ           = [];
//let postQlimit      = 20;////MODIFY
//let treeInfoList    = [];
let cron_check_result = new cronJob('0 */5 * * * *',function(){
  cron_check_result.stop();
  console.log('cron_check_result starts at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  let oneregTreeRoot  = regTreeRoot;
  let testlist  = [];
  let grouplist = [];
  let testResult= {};
  let treeInfo  = {};
  //treeinfo get
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
    return;
  }
  //testlist get
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


},null,false,'Asia/Chongqing');
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

    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
