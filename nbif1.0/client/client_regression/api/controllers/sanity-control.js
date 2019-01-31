var moment = require('moment');
var querystring = require('querystring');
var http = require('http');
var fs= require('fs');
var cronJob = require("cron").CronJob;
var child_process = require('child_process');
var workspace = '/local_vol1_nobackup/benpeng/';
//var variants = [];
//var jobid_sanityrun_nbif_al_gpu   = new cronJob('0 0 0/3 * * *',function(variantname){
//  var text  = '';
//  //Remove previous tree
//  sails.log(moment().format('HH:mm:ss'));
//  sails.log('Sanity nbif_al_gpu');
//  //Make a new DIR
//  sails.log('Preparing running script');
//  text += '#!/tool/pandora64/bin/tcsh\n';
//  text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
//  if(fs.existsSync(workspace+'/nbif_main_sanity_nbif_al_gpu')){
//    sails.log('TreeDir already exists');
//    text += 'rm -rf '+workspace+'/nbif_main_sanity_nbif_al_gpu\n';
//  }
//  else{
//    sails.log('TreeDir not exists');
//    //Do nothing
//  }
//  text += 'mkdir '+workspace+'/nbif_main_sanity_nbif_al_gpu\n';
//  text += 'cd '+workspace+'/nbif_main_sanity_nbif_al_gpu\n';
//  text += 'p4_mkwa -codeline nbif2_0\n';
//  text += 'source useful_cmd\n';
//  text += 'mdj_l demo_test_0 12345678\n';
//  text += 'mdj_ljt demo_test_1 12345678\n';
//  text += 'mdj_ljt demo_test_2 12345678\n';
//  fs.writeFileSync(workspace+'/nbif_main_sanity_nbif_al_gpu_script',text,{
//    encoding  : 'utf8',
//    mode      : '0700',
//    flag      : 'w'
//  });
//  sails.log('Running script prepared');
//  sails.log('Execute the script');
//  child_process.execFileSync(workspace+'/nbif_main_sanity_nbif_al_gpu_script');
//  sails.log('Execute done');
//  sails.log(moment().format('hh:mm:ss'));
//  //To Check Sanity result
//  sails.log('Check The sanity result');
//  //check changelist
//  var R = child_process.execSync('cd '+workspace+'/nbif_main_sanity_nbif_al_gpu && p4 changes -m1 ...#have',{
//    encoding  : 'utf8'
//  }).split(' ');
//  var changelist = R[1];
//  sails.log(changelist);
//  //check result one by one
//  R = child_process.execSync('cd '+workspace+'/nbif_main_sanity_nbif_al_gpu && grep "dj exited successfully" demo_test_0.log demo_test_1.log demo_test_2.log -l',{
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
//    'variantname' : 'nbif_al_gpu',
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
//
//  
//},null,false,'Asia/Chongqing');
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
    sails.log('sanity-control');
    var variants  = [];
    var variantname;
    var variantname = 'nbif_al_gpu';
    var jobid_sanityrun_nbif_al_gpu   = new cronJob('0 0 0/3 * * *',function(variantname){
      var text  = '';
      //Remove previous tree
      sails.log(moment().format('HH:mm:ss'));
      sails.log('Sanity '+variantname);
      //Make a new DIR
      sails.log('Preparing running script');
      text += '#!/tool/pandora64/bin/tcsh\n';
      text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
      if(fs.existsSync(workspace+'/nbif_main_sanity_'+variantname)){
        sails.log('TreeDir already exists');
        text += 'rm -rf '+workspace+'/nbif_main_sanity_'+variantname+'\n';
      }
      else{
        sails.log('TreeDir not exists');
        //Do nothing
      }
      text += 'mkdir '+workspace+'/nbif_main_sanity_'+variantname+'\n';
      text += 'cd '+workspace+'/nbif_main_sanity_'+variantname+'\n';
      text += 'p4_mkwa -codeline nbif2_0\n';
      text += 'source useful_cmd\n';
      text += 'mdj_l demo_test_0 12345678\n';
      text += 'mdj_ljt demo_test_1 12345678\n';
      text += 'mdj_ljt demo_test_2 12345678\n';
      fs.writeFileSync(workspace+'/nbif_main_sanity_'+variantname+'_script',text,{
        encoding  : 'utf8',
        mode      : '0700',
        flag      : 'w'
      });
      sails.log('Running script prepared');
      sails.log('Execute the script');
      child_process.execFile(workspace+'/nbif_main_sanity_'+variantname+'_script',function(error,stdout,stderr){
        if(error){
          sails.log(error);
          return;
        }
        sails.log(stdout);
        sails.log(moment().format('hh:mm:ss'));
        //To Check Sanity result
        sails.log('Check The sanity result');
        //check changelist
        var R = child_process.execSync('cd '+workspace+'/nbif_main_sanity_'+variantname+' && p4 changes -m1 ...#have',{
          encoding  : 'utf8'
        }).split(' ');
        var changelist = R[1];
        sails.log(changelist);
        //check result one by one
        R = child_process.execSync('cd '+workspace+'/nbif_main_sanity_'+variantname+' && grep "dj exited successfully" demo_test_0.log demo_test_1.log demo_test_2.log -l',{
          encoding  : 'utf8'
        }).split('\n');
        R.pop();
        var RR = [];
        for(var j=0;j<R.length;j++){
          var tmp = R[j].split('.');
          RR.push(tmp[0]);
        }
        var passlist = RR;
        sails.log(passlist);
        var postData = querystring.stringify({
          'passlist'    : passlist,
          'projectname' : 'MERO',
          'variantname' : variantname,
          'changelist'  : changelist
        });
        
        var options = {
          hostname: 'amdnbif.thehunters.club',
          port: 80,
          path: '/sanitys/statusupload',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData)
          }
        };
        
        var req = http.request(options, (res) => {
          sails.log(`STATUS: ${res.statusCode}`);
          sails.log(`HEADERS: ${JSON.stringify(res.headers)}`);
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            sails.log(`BODY: ${chunk}`);
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
    },null,false,'Asia/Chongqing')
    if(inputs.kind  ==  'nbif_al_gpu'){
      jobid_sanityrun_nbif_al_gpu.start();
      sails.log('Sanity of nbif_al_gpu started');
    }
    else if(inputs.kind == 'stop'){
      jobid_sanityrun_nbif_al_gpu.start();
      sails.log('Sanity of nbif_al_gpu stopped');
    }
    // All done.
    return exits.success({
      ok  : 'ok'
    });

  }


};
