#!/home/benpeng/nbifweb_client/software/node/bin/node
let querystring     = require('querystring');
let http            = require('http');
var moment          = require('moment');
let process         = require('process');
let cronJob         = require("cron").CronJob;
let child_process   = require('child_process');
let fs              = require('fs');
let loginit         = function(){
  return '[LOG]['+moment().format('YYYY-MM-DD HH:mm:ss')+'] ';
};
let rtloginstart    = moment().add(30,'seconds');
let rtlogintime     = {
  s : rtloginstart.format('ss'),
  m : rtloginstart.format('mm'),
};
/////////////////////////
//rt_login
/////////////////////////
let cron_rtlogin = new cronJob(rtlogintime.s+' '+rtlogintime.m+' * * * *',function(){
  child_process.exec('~/nbifweb_client/software/tools/rtlogin',function(err,stdout,stderr){
    if(err) {
      throw err;
    }
    let regx  = /you must use a password/;
    if(regx.test(stdout)){
      let lines = stdout.split('\n');
      for(let l=0;l<lines.length;l++){
        console.log('[LOG]['+moment().format('YYYY-MM-DD HH:mm:ss')+']rt_login : '+lines[l]);
      }
    }
    else{
      child_process.execSync('rm -rf /home/benpeng/.jfrog/');
      child_process.exec('~/nbifweb_client/software/tools/rtlogin',function(err1,result1,stderr1){
        if(err1) {
          child_process.execSync('mutt Benny.Peng@amd.com -s [NBIF][Sanity][RTLOGINFAIL] < /proj/cip_nbif_dv_3/amdnbif/nbif5.1/clt/clt_run_tasks/tools/RTlogin.fail');
          throw err1;
        }
        if(regx.test(stdout)){
        }
        else{
          child_process.execSync('mutt Benny.Peng@amd.com -s [NBIF][Sanity][RTLOGINFAIL] < /proj/cip_nbif_dv_3/amdnbif/nbif5.1/clt/clt_run_tasks/tools/RTlogin.fail');
          throw 'need fix';
        }
      });
    }
  });
},null,true,'Asia/Chongqing');
/////////////////////////
//=======================
/////////////////////////
