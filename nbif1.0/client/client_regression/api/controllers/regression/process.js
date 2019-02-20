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
let currentCL ;
var jobid_regression_main_daily_check_status = new cronJob('0 0 * * * *',function(){
  console.log('jobid_regression_main_daily start at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  let treeRoot = workspace+'/nbif.regression.main.daily';
  let outDir   = treeRoot+'/out/linux_2.6.32_64.VCS/nbif_al_gpu/config/nbif_all_rtl/run/nbif-al_gpu-mero/nbiftdl';
  let testList = [];
  let testResult = {};
  //get test list
  if(fs.existsSync(treeRoot+'/testlist.log')){
    fs.readFile(treeRoot+'/testlist.log','utf8',(err,data)=>{
      if(err){
        console.log(err);
      }
      else{
        let lines = data.split('\n');
        lines.pop();
        let regx = /evaluation of 'testcase/;
        for(let l=0;l<lines.length;l++){
          if(regx.test(lines[l])){
            let R = lines[l].split('/');
            let RR = R[1].split('_nbif_all_rtl');
            testList.push(RR[0]);
            testResult[RR[0]]={};
          }
        }
      }
    });
  }
  else {
    return;
  }
  //check status per test
  let regx0 = /\+seed=(\d+)/;
  let regx1 = /^Error/i;
  let regx2 = /^UVM_ERROR/;
  let regx3 = /^UVM_ERROR\s+:\s+\d+/;
  let regx4 = /^UVM_FATAL/;
  let regx5 = /^UVM_FATAL\s+:\s+\d+/;
  for(let t=0;t<testList.length;t++){
    testResult[testList[t]][projectname]  = projectname;
    testResult[testList[t]][variantname]  = variantname;
    testResult[testList[t]]['changelist'] = currentCL;
    testResult[testList[t]]['result']     = 'UNKNOWN';
    testResult[testList[t]]['seed']       = 'NA';
    testResult[testList[t]]['signature']  = 'NA';
    if(fs.existsSync(outDir+'/'+testList[t]+'_nbif_all_rtl/REGRESS_PASS')){
      testResult[testList[t]]['result']     = 'PASS';
      testResult[testList[t]]['seed']       = 'NA';
      testResult[testList[t]]['signature']  = 'NA';
    }
    else if(fs.existsSync(outDir+'/'+testList[t]+'_nbif_all_rtl/vcs_run.log')){
      fs.readFile(outDir+'/'+testList[t]+'_nbif_all_rtl/vcs_run.log','utf8',(err,data)=>{
        if(err){
          console.log(err);
        }
        else{
          let lines = data.split('\n');
          lines.pop();
          for(let l =0;l<lines.length;l++){
            if(regx0.test(lines[l])){
              lines[l].replace(regx0,function($0,$1){
                testResult[testList[t]]['seed']       = $1;
              });
            }
            if(regx1.test(lines[l])){
              testResult[testList[t]]['result']     = 'FAIL';
              testResult[testList[t]]['signature']  = lines[l];
              break;
            }
            if(regx2.test(lines[l])){
              if(regx3.test(lines[l])){
                //ignore
                break;
              }
              testResult[testList[t]]['result']     = 'FAIL';
              testResult[testList[t]]['signature']  = lines[l];
              break;
            }
            if(regx4.test(lines[l])){
              if(regx5.test(lines[l])){
                //ignore
                break;
              }
              testResult[testList[t]]['result']     = 'FAIL';
              testResult[testList[t]]['signature']  = lines[l];
              break;
            }
          }
        }
      });
    }
    else{
      //unknown status
    }
  }
  //send result per test
},null,false,'Asia/Chongqing');
var jobid_regression_main_daily = new cronJob('0 19 21 * * *',function(){
  console.log('jobid_regression_main_daily start at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  
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
        text += 'regrsys_prep_wa -no-chmod\n';
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
