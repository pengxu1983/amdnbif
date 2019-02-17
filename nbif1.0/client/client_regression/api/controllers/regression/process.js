var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
var workspace     = '/proj/bif_nbio_vol3_backup/benpeng/';
var jobid_regression_newkickoff_daily = new cronJob('0 30 14 * * *',function(){
  console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
  console.log('jobid_regression_newkickoff_daily start');
  let projectname = 'mero';
  let variantname = 'nbif_al_gpu';
  let mode  = 'normal';
  let loop  = 'daily';
  let time  = moment().format('YYYYMMDDHHmmss');
  //find info from DB
  let postData = querystring.stringify({
    'kind': 'regressioninfo'
  });
  
  let options = {
    hostname: 'amdnbif.thehunters.club',
    port: 80,
    path: '/regression/info',
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
      console.log(JSON.parse(chunk).ok);
      if(JSON.parse(chunk).ok == 'ok'){
        //ok to kick off regression
        console.log('ok ot regression');
        console.log(JSON.parse(chunk).changelist);
        //clean up the workspace
        fs.mkdirSync(workspace+'/nbif_main.regression.'+loop+'.zombie');
        let R = child_process.execSync('ls -d '+workspace+'/nbif_main.regression.'+loop+'.*',{
          encoding : 'utf8'
        }).split('\n');
        R.pop();
        console.log(R);
        for(let r = 0;r<R.length;r++){
          child_process.exec('rm -rf '+R[r]);
          console.log('Removing '+R[r]);
        }
        //prepare the script
        let text = '';
        text += '';
        text += '#!/tool/pandora64/bin/tcsh\n';
        text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
        text += 'mkdir '+workspace+'/nbif_main.regression.'+loop+'.'+variantname+'.'+projectname+'.'+JSON.parse(chunk).changelist.changelist+'.'+mode+'.'+time+'\n';
        text += 'cd    '+workspace+'/nbif_main.regression.'+loop+'.'+variantname+'.'+projectname+'.'+JSON.parse(chunk).changelist.changelist+'.'+mode+'.'+time+'\n';
        text += 'p4_mkwa -codeline nbif2_0 -cl '+JSON.parse(chunk).changelist.changelist+'\n';
        //text += 'bootenv -v '+variantname+'\n';
        text += 'source useful_cmd -cyb -proj '+projectname+'\n'
        text += '${elsf_opts} dj -l '+workspace+'/nbif_main.regression.'+loop+'.'+variantname+'.'+projectname+'.'+JSON.parse(chunk).changelist.changelist+'.'+mode+'.'+time+'/build.log ${_run_opts} run_test -s ${suite} demo_test_0_${config} -a execute=off\n'
        fs.writeFileSync(workspace+'/nbif_main.regression.'+loop+'.'+variantname+'.'+projectname+'.'+JSON.parse(chunk).changelist.changelist+'.'+mode+'.'+time+'.script',text,{
          encoding  : 'utf8',
          mode      : '0700',
          flag      : 'w'
        });
        child_process.execFile(workspace+'/nbif_main.regression.'+loop+'.'+variantname+'.'+projectname+'.'+JSON.parse(chunk).changelist.changelist+'.'+mode+'.'+time+'.script',{
          encoding  : 'utf8',
          maxBuffer : 1024*1000
        },function(error,stdout,stderr){
          if(error){
            console.log(error);
          }
          console.log(stdout);
        });
      }
      else if(JSON.parse(chunk).ok == 'notok'){
      }
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

  //changelist
  //variant
  //project

},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Process',


  description: 'Process regression.',


  inputs: {
    kind  : {
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
