var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
//var workspace     = '/proj/bif_nbio_vol3_backup/benpeng/';
//var workspace     = '/local_vol1_nobackup/benpeng/';
var workspace     = '/proj/bif_nbio_vol1_backup/benpeng/';
let projectname = 'mero';
let variantname = 'nbif_al_gpu';
let mode  = 'normal';
let loop  = 'daily';
let time  = moment().format('YYYYMMDDHHmmss');
let kickoffdate ;
let currentCL ;
var jobid_regression_main_daily_check_status = new cronJob('0 30 * * * *',function(){
  console.log('jobid_regression_main_daily_check_status start at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  let treeRoot = workspace+'/nbif.regression.main.daily';
  let outDir  = {};
  let availableSuite = ['nbiftdl','nbifresize','nbifrandom','nbifgen4','nbifdummyf'];
  outDir['nbiftdl'] = treeRoot+'/out/linux_2.6.32_64.VCS/nbif_al_gpu/config/nbif_all_rtl/run/nbif-al_gpu-mero/nbiftdl';
  outDir['nbifresize'] = treeRoot+'/out/linux_2.6.32_64.VCS/nbif_al_gpu/config/nbif_all_rtl/run/nbif-al_gpu-mero/nbifresize';
  outDir['nbifrandom'] = treeRoot+'/out/linux_2.6.32_64.VCS/nbif_al_gpu/config/nbif_all_rtl/run/nbif-al_gpu-mero/nbifrandom';
  outDir['nbifgen4'] = treeRoot+'/out/linux_2.6.32_64.VCS/nbif_al_gpu/config/nbif_all_rtl/run/nbif-al_gpu-mero/nbifgen4';
  outDir['nbifdummyf'] = treeRoot+'/out/linux_2.6.32_64.VCS/nbif_al_gpu/config/nbif_all_rtl/run/nbif-al_gpu-mero/nbifdummyf';
  for(let suite in outDir){
    testDir = outDir[suite]
  }
  let testList = [];
  let testResult = {};
  //get test list
  if(fs.existsSync(treeRoot+'/testlist.log')){
    let lines = fs.readFileSync(treeRoot+'/testlist.log','utf8').split('\n');
    lines.pop();
    let regx = /evaluation of 'testcase/;
    for(let l=0;l<lines.length;l++){
      if(regx.test(lines[l])){
        let R = lines[l].split('/');
        let RR = R[1].split('_nbif_all_rtl');
        let RRR = R[0].split('::');
        testList.push(RR[0]);
        testResult[RR[0]]={};
        testResult[RR[0]]['suite']  = RRR[1];
      }
    }
  }
  else {
    return;
  }
  //check status per test
  for(let t=0;t<testList.length;t++){
    console.log('T :'+t);
    console.log(testList[t]);
    testResult[testList[t]]['kickoffdate']  = kickoffdate;
    testResult[testList[t]]['projectname']  = projectname;
    testResult[testList[t]]['variantname']  = variantname;
    testResult[testList[t]]['changelist']   = currentCL;
    testResult[testList[t]]['result']       = 'UNKNOWN';
    testResult[testList[t]]['seed']         = 'NA';
    testResult[testList[t]]['signature']    = 'NA';
    testResult[testList[t]]['mode']         = 'normal';
    
    if(fs.existsSync(outDir['nbiftdl']+'/'+testList[t]+'_nbif_all_rtl/REGRESS_PASS')){
      testResult[testList[t]]['result']     = 'PASS';
      testResult[testList[t]]['seed']       = 'NA';
      testResult[testList[t]]['signature']  = 'NA';
      console.log(testList[t]+' is PASS');
      console.log(testResult[testList[t]]);
    }
    else if(fs.existsSync(outDir['nbiftdl']+'/'+testList[t]+'_nbif_all_rtl/vcs_run.log')){
      let R =child_process.execSync(workspace+'/amdnbif/nbif1.0/client/client_regression/tools/processSimLog.pl '+outDir['nbiftdl']+'/'+testList[t]+'_nbif_all_rtl/vcs_run.log',{
        encoding  : 'utf8',
        maxBuffer : 1024*1024*100
      });
      console.log(R.split('\n'));
      testResult[testList[t]]['seed']       = R[0];
      testResult[testList[t]]['result']     = R[1];
      testResult[testList[t]]['signature']  = R[2];
    }
    else{
      //unknown status
    }
  }
  //send result 
  let postData = querystring.stringify({
    'kind': 'nbif.main.normal',
    'kickoffdate' : kickoffdate,
    'results' : testResult
  });
  
  let options = {
    hostname: 'amdnbif.thehunters.club',
    port: 80,
    path: '/regression/uploadstatus',
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

},null,false,'Asia/Chongqing');
var jobid_regression_main_daily = new cronJob('0 0 9 * * *',function(){
  console.log('jobid_regression_main_daily start at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  jobid_regression_main_daily_check_status.stop();
  console.log('jobid_regression_main_daily_check_status stopped due to new kickoff at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  kickoffdate =  moment().format('YYYY-MM-DD');
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
        currentCL = JSON.parse(chunk).changelist.changelist;
        let treeRoot = workspace+'/nbif.regression.main.'+loop;
        let text = '';
        //prepare
        if(fs.existsSync(treeRoot)){
          if(fs.existsSync(treeRoot+'/out')){
            child_process.execSync('mv '+treeRoot+'/out '+treeRoot+'/out.toRemove');
            child_process.exec('rm -rf '+treeRoot+'/out.toRemove');
          }
          else{
          }
          if(fs.existsSync(treeRoot+'/build.log')){
            child_process.execSync('mv '+treeRoot+'/build.log'+' '+treeRoot+'/build.log.toRemove');
            child_process.exec('rm -rf '+treeRoot+'/build.log.toRemove');
          }
          if(fs.existsSync(treeRoot+'/run.log')){
            child_process.execSync('mv '+treeRoot+'/run.log'+' '+treeRoot+'/run.log.toRemove');
            child_process.exec('rm -rf '+treeRoot+'/run.log.toRemove');
          }
          if(fs.existsSync(treeRoot+'/testlist.log')){
            child_process.execSync('mv '+treeRoot+'/testlist.log'+' '+treeRoot+'/testlist.log.toRemove');
            child_process.exec('rm -rf '+treeRoot+'/testlist.log.toRemove');
          }
        }
        //prepare the script
        text += '#!/tool/pandora64/bin/tcsh\n';
        if(fs.existsSync(treeRoot)){
        }
        else{
          text += 'mkdir '+treeRoot+'\n';
        }
        text += 'cd    '+treeRoot+'\n';
        text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
        let retrieveSeedCmd = '';
        if(fs.existsSync(treeRoot)){
          text += 'p4w sync_all @'+currentCL+'\n';
        }
        else{
          text += 'p4_mkwa -codeline nbif2_0 -cl '+currentCL+'\n';
        }
        text += 'source useful_cmd -cyb -proj '+projectname+'\n';
        text += 'set batch_name_v = `/tool/pandora64/.package/perl-5.24.0/bin/perl '+treeRoot+'/src/test/tools/scripts/get_latest_batch_name.pl -r -mode -p '+variantname+' -c nbif_all_rtl -m normal`\n';
        text += 'regrsys_prep_wa -no-chmod\n';
        text += 'dj -l testlist.log -DDEBUG -m run_test -s nbifall all -a print -w "config==nbif_all_rtl && when=~/nbif_nightly/"\n';
        text += 'bdji -l build.log -m -DREGRESS -DUSE_VRQ -DCGM run_test -s nbifall demo_test_0_nbif_all_rtl -a execute=off\n';
        text += 'bdji -l run.log -DRERUN_TDL_BATCH=$batch_name_v -m -DREGRESS -DUSE_VRQ -DCGM run_test -s nbifall all -b trs -A trs.batch=plsignore -A trs.environment=nbif_al_gpu -A trs.cec.logspec='+treeRoot+'/_env/local/nbif_logspec.xml -A trs.switches="-regr-no-results-copy" -w "config==nbif_all_rtl && when=~/nbif_nightly/" -a run_only\n';//FIXME about the -s arg
        text += 'echo "done"\n';
        fs.writeFileSync(treeRoot+'.script',text,{
          encoding  : 'utf8',
          mode      : '0700',
          flag      : 'w'
        });
        child_process.execFile(treeRoot+'.script',{
          encoding  : 'utf8',
          maxBuffer : 1024*1024*1024
        },function(error,stdout,stderr){
          if(error){
            console.log(error);
          }
          console.log(stdout);
          jobid_regression_main_daily_check_status.start();
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


  fn: async function (inputs,exits) {
    sails.log('/regression/process');
    sails.log(inputs);
    if(inputs.kind  ==  'startcheck'){
      jobid_regression_main_daily_check_status.start();
    }
    // All done.
    return;

  }


};
