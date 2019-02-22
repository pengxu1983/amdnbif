var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;

//common values
var workspace     = '/local_vol1_nobackup/benpeng/';
let variants;
let tests;

var jobid_common_sanity_fast = new cronJob('0 45 22 * * *',function(){
  console.log('jobid_common_sanity_fast start at '+ moment().format('YYYY-MM-DD HH:mm:ss'));
  /////////////////////////
  //get info from db
  /////////////////////////
  let postData = querystring.stringify({
    'kind': 'commonsanityinfo'
  });
  
  let options = {
    hostname: 'amdnbif.thehunters.club',
    port: 80,
    path: '/sanitys/common-sanity/info',
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
      //console.log(`BODY: ${chunk}`);
      variants  = JSON.parse(chunk).variants;
      tests     = JSON.parse(chunk).tests;
      //console.log(variants);
      //console.log(tests);
      child_process.execSync('touch '+workspace+'/zombie.script');
      child_process.execSync('rm -rf '+workspace+'/*.script');
      for(let v=0;v<variants.length;v++){
        let treeRoot = workspace+'nbif.common_sanity.main.fast.'+variants[v].variantname;
        //prepare work space
        if(fs.existsSync(treeRoot)){
          child_process.execSync('mv '+treeRoot+' '+treeRoot+'.toRemove');
          child_process.exec('rm -rf              '+treeRoot+'.toRemove');
        }
        fs.mkdirSync(treeRoot);
        //prepare build tree script
        let text = '';
        text += '#!/tool/pandora64/bin/tcsh\n';
        text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
        text += 'cd '+treeRoot+'\n';
        text += 'p4_mkwa -codeline nbif2_0\n';
        text += 'bootenv -v '+variants[v].variantname+'\n';
        text += 'echo "boot done"\n';
        text += 'dj -l build.log -DUVM_VERBOSITY=UVM_LOW -m4 -DUSE_VRQ -DCGM -DSEED=12345678  run_test -s nbiftdl demo_test_0_nbif_all_rtl \n';
        fs.writeFileSync(treeRoot+'.build.script',text,{
          encoding  : 'utf8',
          mode      : '0700',
          flag      : 'w'
        });
      }
    });
    res.on('end', () => {
      //console.log('No more data in response.');
      console.log('/sanitys/common-sanity/info done');
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


  description: 'Process common sanity.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
