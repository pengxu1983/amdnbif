let moment        = require('moment');
let querystring   = require('querystring');
let http          = require('http');
let fs            = require('fs');
let child_process = require('child_process');
let cronJob       = require("cron").CronJob;
let workdir       = '/proj/cip_floyd_genz/nbif_regression/';
let refTreeRoot   = workdir+'/nbif.main/';//MODIFY
let cron_uploadchangelists  = new cronJob('*/10 * * * * *',function(){
  console.log('cron_uploadchangelists started at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  let R = child_process.spawnSync('cd '+refTreeRoot+' && p4 changes -m10 ...#head',{
    encoding  : 'utf8',
    shell : 'tcsh'
  });
  //console.log(R.stdout);
  let trytimes = 5;
  while(R.error && (trytimes>0)){
    R = child_process.spawnSync('cd '+refTreeRoot+' && p4 changes -m10 ...#head',{
      encoding  : 'utf8',
      shell : 'tcsh'
    });
    trytimes--;
  }
  let changelistsRaw  = R.stdout.split('\n');
  changelistsRaw.pop();
  //console.log(changelistsRaw);
  let changelist=[];
  let regx0 = /^Change (\d+) on \d+\/\d+\/\d+ by (\w+)/;
  for(let r = 0 ; r < changelistsRaw.length; r++){
    changelistsRaw[r].replace(regx0,function(rs,$1,$2){
      console.log('changelist '+$1);
      console.log('owner '+$2);
    });
  }
},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Process',


  description: 'Process something.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    changelists : {
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
