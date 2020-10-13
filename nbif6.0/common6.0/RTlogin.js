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
//let cron_rtlogin = new cronJob(rtlogintime.s+' '+rtlogintime.m+' * * * *',function(){
let cron_rtlogin = new cronJob('0 */30 * * * *',function(){
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
          child_process.execSync('echo "RTLOGINFAIL" | mutt Benny.Peng@amd.com -s [NBIF][Sanity][RTLOGINFAIL]');
          throw err1;
        }
        if(regx.test(stdout)){
        }
        else{
          console.log(loginit()+'STDOUT :');
          console.log(stdout);
          child_process.execSync('echo "RTLOGINFAIL" | mutt Benny.Peng@amd.com -s [NBIF][Sanity][RTLOGINFAIL]');
          throw 'need fix';
        }
      });
    }
  });
},null,true,'Asia/Chongqing');
/////////////////////////
//=======================
/////////////////////////
