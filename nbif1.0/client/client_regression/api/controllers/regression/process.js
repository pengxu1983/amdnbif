var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
var workspace     = '/proj/cip_arden_nbif_regress4/benpeng/';
let projectname = 'mero';
let variantname = 'nbif_al_gpu';
let mode  = 'normal';
let loop  = 'daily';
let time  = moment().format('YYYYMMDDHHmmss');
let kickoffdate ;
let currentCL ;
let postQ=[];
let postQlimit=5;
let treeRoot = workspace+'/nbif.regression.main.'+projectname+'.'+mode;
var jobid_send_request = new cronJob('* * * * * *',function(){
  if(postQ.length == 0){
    jobid_send_request.stop();
    return;
  }
  else if(postQ.length <= postQlimit){
    //console.log('DBG222');
    for(let onereq=0;onereq<postQ.length;onereq++){
      let postData  = querystring.stringify(postQ[onereq].data);
      console.log('To send : ');
      console.log(postQ[onereq].data);
      //console.log(postQ[onereq].url);
      let options = {
        hostname: 'amdnbif.thehunters.club',
        port: 80,
        path: postQ[onereq].url,
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
    }
    postQ=[];
  }
  else{
    //console.log('DBG333');
    for(let onereq=0;onereq<postQlimit;onereq++){
      let postData  = querystring.stringify(postQ[onereq].data);
      console.log('To send : ');
      console.log(postQ[onereq].data);
      //console.log(postQ[onereq].url);
      let options = {
        hostname: 'amdnbif.thehunters.club',
        port: 80,
        path: postQ[onereq].url,
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

    }
    postQ.splice(0,postQlimit);
  }
},null,false,'Asia/Chongqing');
var jobid_regression_main_daily_check_status = new cronJob('0 0 */3 * * *',function(){

  console.log('jobid_regression_main_daily_check_status start at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  //jobid_regression_main_daily_check_status.stop();
  //let treeRoot = workspace+'/nbif.regression.main.'+projectname+'.'+mode;
  let outDir  = {};
  let availableSuite = ['nbiftdl','nbifresize','nbifrandom','nbifgen4','nbifdummyf'];//TODO
  outDir['nbiftdl']     = treeRoot+'/out/linux_2.6.32_64.VCS/nbif_al_gpu/config/nbif_all_rtl/run/nbif-al_gpu-mero/nbiftdl';
  outDir['nbifresize']  = treeRoot+'/out/linux_2.6.32_64.VCS/nbif_al_gpu/config/nbif_all_rtl/run/nbif-al_gpu-mero/nbifresize';
  outDir['nbifrandom']  = treeRoot+'/out/linux_2.6.32_64.VCS/nbif_al_gpu/config/nbif_all_rtl/run/nbif-al_gpu-mero/nbifrandom';
  outDir['nbifgen4']    = treeRoot+'/out/linux_2.6.32_64.VCS/nbif_al_gpu/config/nbif_all_rtl/run/nbif-al_gpu-mero/nbifgen4';
  outDir['nbifdummyf']  = treeRoot+'/out/linux_2.6.32_64.VCS/nbif_al_gpu/config/nbif_all_rtl/run/nbif-al_gpu-mero/nbifdummyf';
  for(let suite in outDir){
    testDir = outDir[suite];
    console.log(testDir);
    child_process.exec('bsub -P BIF-SHUB -q normal -J NBIFrg -R \'rusage[mem=4000] select[type==RHEL6_64]\' rm -rf '+testDir+'/*.toRemove',{
      encoding  : 'utf8'
    },(error,stdout,stderr) =>{
      if(error){
        console.log(error);
      }
      console.log(stdout);
    });
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
  //get currentCL, kickoffdate, projectname, variantname
  let R = child_process.execSync('cd '+treeRoot+' && p4 changes -m1 ...#have',{
    encoding  : 'utf8'
  }).split(' ');
  let currentCL = R[1];
  let lines = fs.readFileSync(treeRoot+'/PXinfo','utf8').split('\n');
  lines.pop();
  let treeInfo={};
  for(let l=0;l<lines.length;l++){
    let R = lines[l].split(':::');
    treeInfo[R[0]]=R[1];
  }
  //send basic tree info into DB
  //++++++++++++++++++++++++
  let postData = querystring.stringify({
    'kind'        : 'basictreeinfoall',
    'mode'        : treeInfo['mode'],
    'variantname' : treeInfo['variantname'],
    'testlist'    : JSON.stringify(testList),
    'kickoffdate' : treeInfo['kickoffdate'],
    'changelist'  : treeInfo['changelist'],
    'projectname' : treeInfo['projectname']
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
  //send basic tree info into DB
  //------------------------

  //check status per test
  for(let testName in testResult){
    if(testResult[testName]['result'] == 'PASS'){
      console.log(testName+' is already checked');
      continue;
    }
    if(testResult[testName]['result'] == 'FAIL'){
      console.log(testName+' is already checked');
      continue;
    }
    testResult[testName]['kickoffdate']  = treeInfo['kickoffdate'];
    testResult[testName]['projectname']  = treeInfo['projectname'];
    testResult[testName]['variantname']  = treeInfo['variantname'];
    testResult[testName]['changelist']   = treeInfo['changelist'];
    testResult[testName]['result']       = 'UNKNOWN';
    testResult[testName]['seed']         = 'NA';
    testResult[testName]['signature']    = 'NA';
    testResult[testName]['mode']         = treeInfo['mode'];
    testResult[testName]['projectname']  = treeInfo['projectname'];
    if(fs.existsSync(outDir[testResult[testName]['suite']]+'/'+testName+'_nbif_all_rtl/REGRESS_PASS')){
      testResult[testName]['result']     = 'PASS';
      testResult[testName]['seed']       = 'NA';
      testResult[testName]['signature']  = 'NA';
      //remove out dir of this particular test
      fs.renameSync(outDir[testResult[testName]['suite']]+'/'+testName+'_nbif_all_rtl',outDir[testResult[testName]['suite']]+'/'+testName+'_nbif_all_rtl.toRemove');
      child_process.execSync('bsub -P BIF-SHUB -q normal -J NBIFrg -R \'rusage[mem=200] select[type==RHEL6_64]\' rm -rf '+outDir[testResult[testName]['suite']]+'/'+testName+'_nbif_all_rtl.toRemove');
      fs.mkdirSync(outDir[testResult[testName]['suite']]+'/'+testName+'_nbif_all_rtl');
      fs.writeFileSync(outDir[testResult[testName]['suite']]+'/'+testName+'_nbif_all_rtl/REGRESS_PASS','',{
        encoding  : 'utf8',
        mode      : '0600',
        flag      : 'w'
      })
    }
    else if(fs.existsSync(outDir[testResult[testName]['suite']]+'/'+testName+'_nbif_all_rtl/vcs_run.log')){
      let R =child_process.execSync(workspace+'/amdnbif/nbif1.0/client/client_regression/tools/processSimLog.pl '+outDir[testResult[testName]['suite']]+'/'+testName+'_nbif_all_rtl/vcs_run.log',{
        encoding  : 'utf8',
        maxBuffer : 1024*1024*100
      });
      let RR = R.split('\n');
      testResult[testName]['seed']       = RR[0];
      testResult[testName]['result']     = RR[1];
      testResult[testName]['signature']  = RR[2];
    }
    else{
      //unknown status
    }
    jobid_send_request.stop();
    console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
    console.log('TTT : '+testName+':');
    postQ.push({
      url : '/regression/uploadstatus',
      data  : {
        'kind'          : 'singletest',
        'kickoffdate'   : treeInfo['kickoffdate'],
        'variantname'   : treeInfo['variantname'],
        'changelist'    : treeInfo['changelist'],
        'projectname'   : treeInfo['projectname'],
        'testname'      : testName,
        'mode'          : treeInfo['mode'],
        'result'        : testResult[testName]['result'],
        'seed'          : testResult[testName]['seed'],
        'signature'     : testResult[testName]['signature'],
        'suite'         : testResult[testName]['suite'],
        'shelve'        : 'NA',//TODO
        //'onetestresult' : JSON.stringify(testResult[testName])
      }
    });

    //console.log('DBG111');
    //console.log(testResult[testName]);
  };
  jobid_send_request.start();
},null,false,'Asia/Chongqing');
var jobid_regression_main_daily = new cronJob('0 30 17 * * *',function(){
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
        //let treeRoot = workspace+'/nbif.regression.main.'+loop;
        let text = '';
        //prepare
        if(fs.existsSync(treeRoot)){
          if(fs.existsSync(treeRoot+'/out')){
            if(fs.existsSync(treeRoot+'/out.toRemove')){
              child_process.execSync('bsub -P BIF-SHUB -q normal -Is -J NBIFrg -R \'rusage[mem=4000] select[type==RHEL6_64]\' rm -rf '+treeRoot+'/out.toRemove');
            }
            fs.renameSync(treeRoot+'/out',treeRoot+'/out.toRemove');
            child_process.exec('bsub -P BIF-SHUB -q normal -J NBIFrg -R \'rusage[mem=4000] select[type==RHEL6_64]\' rm -rf '+treeRoot+'/out.toRemove',{
              encoding  : 'utf8'
            },(error,stdout,stderr)=>{
              if(error){
                console.log(error);
              }
            });
          }
          else{
          }
          if(fs.existsSync(treeRoot+'/build.log')){
            if(fs.existsSync(treeRoot+'/build.log.toRemove')){
              fs.unlinkSync(treeRoot+'/build.log.toRemove');
            }
            fs.renameSync(treeRoot+'/build.log',treeRoot+'/build.log.toRemove');
            fs.unlink(treeRoot+'/build.log.toRemove',(err) =>{});
          }
          if(fs.existsSync(treeRoot+'/run.log')){
            if(fs.existsSync(treeRoot+'/run.log.toRemove')){
              fs.unlinkSync(treeRoot+'/run.log.toRemove');
            }
            fs.renameSync(treeRoot+'/run.log',treeRoot+'/run.log.toRemove');
            fs.unlink(treeRoot+'/run.log.toRemove',(err) =>{});
          }
          if(fs.existsSync(treeRoot+'/testlist.log')){
            if(fs.existsSync(treeRoot+'/testlist.log.toRemove')){
              fs.unlinkSync(treeRoot+'/testlist.log.toRemove');
            }
            fs.renameSync(treeRoot+'/testlist.log',treeRoot+'/testlist.log.toRemove');
            fs.unlink(treeRoot+'/testlist.log.toRemove',(err) =>{});
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
          text += 'p4_mkwa -codeline nbif2_0 -cl '+currentCL+'\n';//TODO per tree
        }
        text += 'source useful_cmd -cyb -proj '+projectname+'\n';
        text += 'set batch_name_v = `/tool/pandora64/.package/perl-5.24.0/bin/perl '+treeRoot+'/src/test/tools/scripts/get_latest_batch_name.pl -r -mode -p '+variantname+' -c nbif_all_rtl -m normal`\n';
        text += 'trs fb -o benpeng > batchinfo\n';
        text += 'regrsys_prep_wa -no-chmod\n';
        text += 'bsub -P BIF-SHUB -q normal -Is -J NBIFrg -R \'rusage[mem=5000] select[type==RHEL6_64]\' dj -l testlist.log -DDEBUG -m run_test -s nbifall all -a print -w "config==nbif_all_rtl && when=~/nbif_nightly/"\n';
        text += 'bdji -l build.log -m -DREGRESS -DUSE_VRQ -DCGM run_test -s nbifall demo_test_0_nbif_all_rtl -a execute=off\n';
        text += 'bdji -l run.log -DRERUN_TDL_BATCH=$batch_name_v -m -DREGRESS -DUSE_VRQ -DCGM run_test -s nbifall all -b trs -A trs.batch=NBIFRG_'+loop+'_'+variantname+' -A trs.environment=nbif_al_gpu -A trs.cec.logspec='+treeRoot+'/_env/local/nbif_logspec.xml -A trs.switches="-regr-no-results-copy" -w "config==nbif_all_rtl && when=~/nbif_nightly/" -a run_only\n';//FIXME about the -s arg
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
          text = '';
          text += 'changelist:::'+currentCL+'\n';
          text += 'projectname:::'+projectname+'\n';
          text += 'treeRoot:::'+treeRoot+'\n';
          text += 'variantname:::'+variantname+'\n';
          text += 'kickoffdate:::'+kickoffdate+'\n';
          text += 'mode:::'+mode+'\n';
          fs.writeFileSync(treeRoot+'/PXinfo',text,{
            encoding  : 'utf8',
            mode      : '0600',
            flag      : 'w'
          });
          text = '';
          text += '#!/tool/pandora64/bin/tcsh\n';
          text += 'cd    '+treeRoot+'\n';
          text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
          text += 'source useful_cmd -cyb -proj '+projectname+'\n';
          if(fs.existsSync(treeRoot+'/batchinfo')){
            let lines = fs.readFileSync(treeRoot+'/batchinfo','utf8').split('\n');
            lines.pop();
            let regx = /^Batch name: (\d+)_(\w+)/;
            for(let l=0;l<lines.length;l++){
              if(regx.test(lines[l])){
                lines[l].replace(regx,function(rs,$1,$2){
                  if(moment($1).add(2,'days').isSameOrBefore(moment(kickoffdate))){
                    text += 'trs kb -b '+$1+'_'+$2+'\n';//FIXME
                  }
                });
              }
            }
          }
          fs.writeFileSync(treeRoot+'/cleanbatch',text,{
            encoding  : 'utf8',
            mode      : '0700',
            flag      : 'w'
          });
          child_process.execFile(treeRoot+'/cleanbatch',{
            encoding  : 'utf8',
          },function(err,stdout,stderr){
            if(err){
              console.log(err);
            }
            console.log(stdout);
            //fs.unlinkSync(treeRoot+'/cleanbatch');
          });
          //console.log(stdout);
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
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
