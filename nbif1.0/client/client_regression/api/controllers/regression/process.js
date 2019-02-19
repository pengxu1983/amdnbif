var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
//var workspace     = '/proj/bif_nbio_vol3_backup/benpeng/';
//var workspace     = '/local_vol1_nobackup/benpeng/';
var workspace     = '/proj/bif_nbio_vol1_backup/benpeng/'
var jobid_regression_newkickoff_daily = new cronJob('0 0 18 * * *',function(){
  console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
  console.log('jobid_regression_newkickoff_daily start');
  let projectname = 'mero';
  let variantname = 'nbif_al_gpu';
  let mode  = 'normal';
  let loop  = 'daily';
  let time  = moment().format('YYYYMMDDHHmmss');
  let currentCL ;
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
        let currentCL = JSON.parse(chunk).changelist.changelist;
        let str = workspace+'/nbif.regression.main.'+loop;
        let text = '';
        //prepare
        if(fs.existsSync(str)){
          if(fs.existsSync(str+'/out')){
            child_process.execSync('mv '+str+'/out '+str+'/out.toRemove');
            child_process.exec('rm -rf '+str+'/out.toRemove');
          }
          else{
          }
        }
        //prepare the script
        text += '#!/tool/pandora64/bin/tcsh\n';
        if(fs.existsSync(str)){
        }
        else{
          text += 'mkdir '+str+'\n';
        }
        text += 'cd    '+str+'\n';
        text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
        if(fs.existsSync(str)){
          text += 'p4w sync_all @'+currentCL+'\n';
        }
        else{
          text += 'p4_mkwa -codeline nbif2_0 -cl '+currentCL+'\n';
        }
        text += 'source useful_cmd -cyb -proj '+projectname+'\n';
        text += 'dj -l testlist.log -DDEBUG -m run_test -s ${suite} all -a print -w "config==nbif_all_rtl && when=~/nbif_nightly/"\n';
        text += 'bdji -l build.log -m -DREGRESS -DUSE_VRQ -DCGM run_test -s nbifall demo_test_0_nbif_all_rtl -a execute=off\n';
        text += 'bdji -l run.log -m -DREGRESS -DUSE_VRQ -DCGM run_test -s nbifall all -b trs -A trs.batch=plsignore -A trs.environment=nbif_al_gpu -A trs.cec.logspec='+str+'/_env/local/nbif_logspec.xml -A trs.switches="-regr-no-results-copy" -w "config==nbif_all_rtl && when=~/nbif_nightly/" -a run_only\n';//FIXME about the -s arg
        text += 'echo "done"\n';
        fs.writeFileSync(str+'.script',text,{
          encoding  : 'utf8',
          mode      : '0700',
          flag      : 'w'
        });
        child_process.execFile(str+'.script',{
          encoding  : 'utf8',
          maxBuffer : 1024*1024*1024
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
