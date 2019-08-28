let refTreeRoot     = '/proj/cip_nbif_de_1/nbif.ref.branch.mero/';//MODIFY
//let regTreeRootList = [
//  '/local_vol1_nobackup/benpeng/nbif.ref.main/',
//];
let out_home        = '/out/linux_3.10.0_64.VCS/';
var moment          = require('moment');
var querystring     = require('querystring');
var http            = require('http');
var fs              = require('fs');
var child_process   = require('child_process');
var cronJob         = require("cron").CronJob;
let branchname      = 'nbif2_0_mero_branch';//TODO
//var workspace       = '/proj/cip_floyd_genz/benpeng';////MODIFY
//let postQ           = [];
//let postQlimit      = 20;////MODIFY
//let treeInfoList    = [];
let cron_check_changelist= new cronJob('*/5 * * * * *',function(){
  console.log('cron_check_changelist start at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  let R = child_process.spawnSync('cd '+refTreeRoot+' && p4 changes -m10 ...#head',{
    encoding  : 'utf8',
    shell : 'tcsh'
  });
  let RR = R.stdout.split('\n');
  RR.pop();
  //console.log(RR);
  //console.log(typeof(RR));
  let regx = /^Change (\d+) on (\d+\/\d+\/\d+) by (\w+)/;
  let changelists = [];
  for(let c=0;c<RR.length;c++){
    let changelist;
    let username;
    RR[c].replace(regx,function(rs,$1,$2,$3){
      changelist  = $1;
      cltime      = moment($2,'YYYY/MM/DD').format('YYYY-MM-DD');
      username    = $3;
      //console.log($1);
      //console.log($2);
      changelists.unshift({
        changelist  : changelist,
        username    : username,
        cltime      : cltime
      });
    });
  }
  let postData = querystring.stringify({
    'kind': branchname,
    'changelists'  : JSON.stringify(changelists),
  });
  
  let options = {
    hostname: 'amdnbif2.thehunters.club',
    port: 80,
    path: '/changelist/upload',
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
      console.log(chunk);
      console.log(typeof(chunk));
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
},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Process',


  description: 'Process something.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
