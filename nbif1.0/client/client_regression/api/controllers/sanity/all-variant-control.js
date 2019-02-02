var moment = require('moment');
var querystring = require('querystring');
var http = require('http');
var fs= require('fs');
var cronJob = require("cron").CronJob;
var child_process = require('child_process');
var workspace = '/proj/bif_nbio_vol1_backup/benpeng';
var jobid_sanityrun_allvariant_status = 'stopped';
var jobid_sanityrun_allvariant  = new cronJob('0 30 13 * * *',function(){
  let variants = [];
  /////////////////
  //Get all valid variants
  /////////////////
  let postData = querystring.stringify({
    'kind'  : 'allvariantsget'
  });
    
  let options = {
    hostname: 'amdnbif.thehunters.club',
    port: 80,
    path: '/config/get',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  let req = http.request(options, (res) => {
    sails.log(`STATUS: ${res.statusCode}`);
    sails.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      sails.log(`BODY: ${chunk}`);
      variants = JSON.parse(chunk).variants;
      sails.log('variants:');
      sails.log(variants);
      /////////////////
      //Checking result
      /////////////////
      sails.log('checking');
      //FAILLIST
      let FAILLIST = child_process.execSync('grep "dj exited with errors" '+workspace+'/*/demo_test_*.* -l',{
        encoding  : 'utf8'
      }).split('\n');
      FAILLIST.pop();
      for(let i=0;i<FAILLIST.length;i++){
        let tmp1 = FAILLIST[i].split('.');
        tmp1.reverse();
        let tmp2 = tmp1[2].split('/')
        let postData = querystring.stringify({
          'kind'        : 'singletest',
          'changelist'  : tmp1[0],
          'testname'    : tmp2[1],
          'variantname' : tmp1[1],
          'result'      : 'FAIL'
        });
        
        let options = {
          hostname: 'amdnbif.thehunters.club',
          port: 80,
          path: '/sanitys/statusupload',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
          }
        };
        
        let req = http.request(options, (res) => {
          console.log(`STATUS: ${res.statusCode}`);
          console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
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
      //////////////
      //PASSLIST
      let PASSLIST  = child_process.execSync('grep "dj exited successfully" '+workspace+'/*/demo_test_*.* -l',{
        encoding  : 'utf8'
      }).split('\n');
      PASSLIST.pop();
      for(let i=0;i<PASSLIST.length;i++){
        let tmp1 = PASSLIST[i].split('.');
        tmp1.reverse();
        let tmp2 = tmp1[2].split('/')
        let postData = querystring.stringify({
          'kind'        : 'singletest',
          'changelist'  : tmp1[0],
          'testname'    : tmp2[1],
          'variantname' : tmp1[1],
          'result'      : 'PASS'
        });
        
        let options = {
          hostname: 'amdnbif.thehunters.club',
          port: 80,
          path: '/sanitys/statusupload',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
          }
        };
        
        let req = http.request(options, (res) => {
          console.log(`STATUS: ${res.statusCode}`);
          console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
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
      //////////////
    });
    res.on('end', () => {
      sails.log('No more data in response.');
      /////////////////
      //Find changelists that missed
      /////////////////
      let postData = querystring.stringify({
        'kind'  : 'getbrokencl',
      });
        
      let options = {
        hostname: 'amdnbif.thehunters.club',
        port: 80,
        path: '/sanitys/getbrokencl',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      };
      
      let req = http.request(options, (res) => {
        sails.log(`STATUS: ${res.statusCode}`);
        sails.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          sails.log(`BODY: ${chunk}`);
          let lastpassCL= JSON.parse(chunk).lastpassCL;
          let sanityStatus= JSON.parse(chunk).ok;
          let brokenCL =JSON.parse(chunk).brokenCL;
          sails.log('lastpassCL:');
          sails.log(lastpassCL);
          sails.log(brokenCL);
          let R = child_process.execSync('cd '+workspace+'/nbif_main && p4 changes -m30 ...#head',{
            encoding  : 'utf8'
          }).split('\n');
          sails.log(R);
          R.pop();
          let RR=[];
          let changelists = [];
          for(let i=0;i<R.length;i++){
            let tmp = {
              changelist  : '',
              name        : ''
            };
            let tmp1 = R[i].split(' ');
            tmp.changelist  = tmp1[1];
            let tmp2 = tmp1[5];
            let tmp3 = tmp2.split('@');
            sails.log(tmp.changelist);
            sails.log(tmp2);
            sails.log(tmp3[0]);
            tmp.name = tmp3[0];
            RR.push(tmp);
            changelists.push(tmp.changelist);
          }
          sails.log(RR);
          sails.log(changelists);
          let changelists1 = [];
          for(let i=0;i<changelists.length;i++){
            if(changelists[i] == lastpassCL){
              break;
            }
            else{
              changelists1.push(changelists[i]);
            }
          }
          sails.log('aaa');
          sails.log(changelists1);
          child_process.execSync('rm -rf '+workspace+'/nbif_main_*');
          for(let i=0;i<changelists1.length;i++){
            for(let k=0;k<variants.length;k++){
              let text = '';
              text += '#!/tool/pandora64/bin/tcsh\n';
              text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
              text += 'rm -rf '+workspace+'/nbif_main_'+variants[k].variantname+'.'+changelists1[i]+'\n';
              text += 'mkdir  '+workspace+'/nbif_main_'+variants[k].variantname+'.'+changelists1[i]+'\n';
              text += 'cd /proj/bif_nbio_vol1_backup/benpeng/nbif_main_'+variants[k].variantname+'.'+changelists1[i]+'\n';
              text += 'p4_mkwa -codeline nbif2_0 -cl '+changelists1[i]+'\n';
              text += 'bootenv -v '+variants[k].variantname+'\n';
              text += 'bsub -P BIF-SHUB -q normal -Is -J nbif_san -R \'rusage[mem=10000] select[type==RHEL6_64]\' dj -l build.log -DUVM_VERBOSITY=UVM_LOW -m4 -DUSE_VRQ -DCGM -DSEED=12345678  run_test -s nbiftdl demo_test_0_nbif_all_rtl -a execute=off\n';
              text += 'bsub -P BIF-SHUB -q normal     -J nbif_san -R \'rusage[mem=10000] select[type==RHEL6_64]\' dj -l demo_test_0.'+variants[k].variantname+'.'+changelists1[i]+' -DUVM_VERBOSITY=UVM_LOW -m4 -DUSE_VRQ -DCGM -DSEED=12345678  run_test -s nbiftdl demo_test_0_nbif_all_rtl -a run=only\n';
              text += 'bsub -P BIF-SHUB -q normal     -J nbif_san -R \'rusage[mem=10000] select[type==RHEL6_64]\' dj -l demo_test_1.'+variants[k].variantname+'.'+changelists1[i]+' -DUVM_VERBOSITY=UVM_LOW -m4 -DUSE_VRQ -DCGM -DSEED=12345678  run_test -s nbiftdl demo_test_1_nbif_all_rtl -a run=only\n';
              text += 'bsub -P BIF-SHUB -q normal     -J nbif_san -R \'rusage[mem=10000] select[type==RHEL6_64]\' dj -l demo_test_2.'+variants[k].variantname+'.'+changelists1[i]+' -DUVM_VERBOSITY=UVM_LOW -m4 -DUSE_VRQ -DCGM -DSEED=12345678  run_test -s nbiftdl demo_test_1_nbif_all_rtl -a run=only\n';
              fs.writeFileSync(workspace+'/nbif_main_sanity_'+variants[k].variantname+'.'+changelists1[i]+'.script',text,{
                encoding  : 'utf8',
                mode      : '0700',
                flag      : 'w'
              });
              child_process.execFile(workspace+'/nbif_main_sanity_'+variants[k].variantname+'.'+changelists1[i]+'.script',function(error,stdout,stderr){
                if(error){
                  sails.log(error);
                }
              });
            }
          }
        });
        res.on('end', () => {
          sails.log('No more data in response.');
        });
      });
      
      req.on('error', (e) => {
        sails.error(`problem with request: ${e.message}`);
      });
      
      // write data to request body
      req.write(postData);
      req.end();
    });
  });
  
  req.on('error', (e) => {
    sails.error(`problem with request: ${e.message}`);
  });
  
  // write data to request body
  req.write(postData);
  req.end();
  /////////////////
  //All variant gotten
  /////////////////

  /////////////////
  /////////////////
  //Remove previous tree
  //sails.log(moment().format('HH:mm:ss'));
  //sails.log('Sanity '+variantname);
  ////Make a new DIR
  //sails.log('Preparing running script');
  //text += '#!/tool/pandora64/bin/tcsh\n';
  //text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
  //if(fs.existsSync(workspace+'/nbif_main_sanity_'+variantname)){
  //  sails.log('TreeDir already exists');
  //  text += 'rm -rf '+workspace+'/nbif_main_sanity_'+variantname+'\n';
  //}
  //else{
  //  sails.log('TreeDir not exists');
  //  //Do nothing
  //}
  //text += 'mkdir '+workspace+'/nbif_main_sanity_'+variantname+'\n';
  //text += 'cd '+workspace+'/nbif_main_sanity_'+variantname+'\n';
  //text += 'p4_mkwa -codeline nbif2_0\n';
  //text += 'source useful_cmd -proj mero\n';
  //text += 'mdj_l demo_test_0 12345678\n';
  //text += 'mdj_ljt demo_test_1 12345678\n';
  //text += 'mdj_ljt demo_test_2 12345678\n';
  //fs.writeFileSync(workspace+'/nbif_main_sanity_'+variantname+'_script',text,{
  //  encoding  : 'utf8',
  //  mode      : '0700',
  //  flag      : 'w'
  //});
  //sails.log('Running script prepared');
  //sails.log('Execute the script');
  //child_process.execFile(workspace+'/nbif_main_sanity_'+variantname+'_script',function(error,stdout,stderr){
  //  if(error){
  //    sails.log(error);
  //    return;
  //  }
  //  sails.log(stdout);
  //  sails.log(moment().format('hh:mm:ss'));
  //  //To Check Sanity result
  //  sails.log('Check The sanity result');
  //  //check changelist
  //  var R = child_process.execSync('cd '+workspace+'/nbif_main_sanity_'+variantname+' && p4 changes -m1 ...#have',{
  //    encoding  : 'utf8'
  //  }).split(' ');
  //  var changelist = R[1];
  //  sails.log(changelist);
  //  //check result one by one
  //  R = child_process.execSync('cd '+workspace+'/nbif_main_sanity_'+variantname+' && grep "dj exited successfully" demo_test_0.log demo_test_1.log demo_test_2.log -l',{
  //    encoding  : 'utf8'
  //  }).split('\n');
  //  R.pop();
  //  var RR = [];
  //  for(var j=0;j<R.length;j++){
  //    var tmp = R[j].split('.');
  //    RR.push(tmp[0]);
  //  }
  //  var passlist = RR;
  //  sails.log(passlist);
  //  var postData = querystring.stringify({
  //    'passlist'    : passlist,
  //    'projectname' : 'MERO',
  //    'variantname' : variantname,
  //    'changelist'  : changelist
  //  });
  //  
  //  var options = {
  //    hostname: 'amdnbif.thehunters.club',
  //    port: 80,
  //    path: '/sanitys/statusupload',
  //    method: 'POST',
  //    headers: {
  //      'Content-Type': 'application/x-www-form-urlencoded',
  //      'Content-Length': Buffer.byteLength(postData)
  //    }
  //  };
  //  
  //  var req = http.request(options, (res) => {
  //    sails.log(`STATUS: ${res.statusCode}`);
  //    sails.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  //    res.setEncoding('utf8');
  //    res.on('data', (chunk) => {
  //      sails.log(`BODY: ${chunk}`);
  //    });
  //    res.on('end', () => {
  //      sails.log('No more data in response.');
  //    });
  //  });
  //  
  //  req.on('error', (e) => {
  //    sails.error(`problem with request: ${e.message}`);
  //  });
  //  
  //  // write data to request body
  //  req.write(postData);
  //  req.end();
  //});
},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Regression control',


  description: '',


  inputs: {
    kind  : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('nbif_al_gpu-control');
    if(inputs.kind  ==  'start'){
      if(jobid_sanityrun_nbif_al_gpu_status == 'stopped'){
        jobid_sanityrun_nbif_al_gpu.start();
        jobid_sanityrun_nbif_al_gpu_status = 'started';
        sails.log('Sanity of nbif_al_gpu started');
      }
      else if(jobid_sanityrun_nbif_al_gpu_status == 'started'){
        sails.log('Sanity of nbif_al_gpu already started');
      }
    }
    else if(inputs.kind == 'stop'){
      jobid_sanityrun_nbif_al_gpu.stop();
      jobid_sanityrun_nbif_al_gpu_status  = 'stopped';
      sails.log('Sanity of nbif_al_gpu stopped');
    }
    // All done.
    return exits.success({
      ok  : 'ok'
    });

  }


};
