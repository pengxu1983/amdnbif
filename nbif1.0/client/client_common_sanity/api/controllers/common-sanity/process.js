var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
var workspace     = '/local_vol1_nobackup/benpeng/';
var jobid_common_sanity_getChangelistToRun  = new cronJob('*/5 * * * * *',function(){
  sails.log(moment().format('YYYY-MM-DD HH:mm:ss'));
  sails.log('jobid_common_sanity_getChangelistToRun start');
  let earliestchangelist;
  let owner;
  let postData = querystring.stringify({
    'kind': 'popearliest'
  });
  
  let options = {
    hostname: 'amdnbif.thehunters.club',
    port: 80,
    path: '/sanitys/common-sanity/popchangelist',
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
      if(JSON.parse(chunk).ok == 'ok'){
        earliestchangelist  = JSON.parse(chunk).changelist;
        owner               = JSON.parse(chunk).owner;
        sails.log('aaaa');
        sails.log(earliestchangelist);
        sails.log(owner);
        if(earliestchangelist == 'NA'){
          //do nothing
        }
        else{
          sails.log('bbb');
          // Get info from DB
          jobid_common_sanity_getChangelistToRun.stop();
          sails.log(moment().format('YYYY-MM-DD HH:mm:ss'));
          sails.log('jobid_common_sanity_getChangelistToRun stop');
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
              console.log(`BODY: ${chunk}`);
              sails.log('DBG');
              sails.log(JSON.parse(chunk).ok);
              sails.log(JSON.parse(chunk).variants);
              sails.log(JSON.parse(chunk).tests);
              let variants  = JSON.parse(chunk).variants;
              let tests     = JSON.parse(chunk).tests;
              //clean up disk
              child_process.execSync('mkdir '+workspace+'/nbif_main.sanity.zombie');
              let toRemove = child_process.execSync('ls -d '+workspace+'/nbif_main.sanity.*',{
                encoding  : 'utf8'
              }).split('\n');
              toRemove.pop();
              for(let i=0;i<toRemove.length;i++){
                sails.log('Remove '+toRemove[i]);
                child_process.exec('rm -rf '+toRemove[i]);
              }
              let donevariant = [];
              let resultbychangelist = [];
              let results = {};
              for(let i=0;i<variants.length;i++){
                results[variants[i].variantname]={};
                child_process.execSync('mkdir '+workspace+'/nbif_main.sanity.'+variants[i].variantname+'.'+earliestchangelist);
                let text  = '';
                text += '#!/tool/pandora64/bin/tcsh\n';
                text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
                //text += 'mkdir '+workspace+'/nbif_main.sanity.'+variants[i].variantname+'.'+earliestchangelist+'\n';
                text += 'cd '+workspace+'/nbif_main.sanity.'+variants[i].variantname+'.'+earliestchangelist+'\n';
                text += 'p4_mkwa -codeline nbif2_0 -cl '+earliestchangelist+'\n';
                text += 'bootenv -v '+variants[i].variantname+'\n';
                for(let k=0;k<tests.length;k++){
                  if(k==0){
                    text  += 'dj -l '+tests[k].testname+'.'+variants[i].variantname+'.'+earliestchangelist+'.log -DUVM_VERBOSITY=UVM_LOW -m4 -DUSE_VRQ -DCGM -DSEED=12345678  run_test -s nbiftdl '+tests[k].testname+'_nbif_all_rtl\n'
                  }
                  else {
                    text  += 'dj -l '+tests[k].testname+'.'+variants[i].variantname+'.'+earliestchangelist+'.log -DUVM_VERBOSITY=UVM_LOW -m4 -DUSE_VRQ -DCGM -DSEED=12345678  run_test -s nbiftdl '+tests[k].testname+'_nbif_all_rtl -a run=only\n'
                  }
                }
                fs.writeFileSync(workspace+'/nbif_main.sanity.'+variants[i].variantname+'.'+earliestchangelist+'.script',text,{
                  encoding  : 'utf8',
                  mode      : '0700',
                  flag      : 'w'
                });
                child_process.execFile(workspace+'/nbif_main.sanity.'+variants[i].variantname+'.'+earliestchangelist+'.script',{
                  encoding  : 'utf8',
                  maxBuffer : 1024*1000
                },function(error){
                  //if(error){
                  //  sails.log(error);
                  //}
                  //check
                  let donetest = [];
                  for(let j=0;j<tests.length;j++){
                    let testResult ='FAIL';
                    if(fs.existsSync(workspace+'/nbif_main.sanity.'+variants[i].variantname+'.'+earliestchangelist+'/'+tests[j].testname+'.'+variants[i].variantname+'.'+earliestchangelist+'.log')){
                      fs.readFile(workspace+'/nbif_main.sanity.'+variants[i].variantname+'.'+earliestchangelist+'/'+tests[j].testname+'.'+variants[i].variantname+'.'+earliestchangelist+'.log',{
                        encoding : 'utf8'
                      },(err,data) => {
                        let R = data.split('\n');
                        R.pop();
                        for(let ii=0;ii<R.length;ii++){
                          //sails.log(ii);
                          //sails.log(R[ii]);
                          let reg=/dj exited successfully/;
                          if(reg.test(R[ii])){
                            testResult  = 'PASS';
                          }
                          //reg=/dj exited with errors/;
                          //if(reg.test(RR[ii])){
                          //  testResult  = 'FAIL';
                          //  break;
                          //}
                        }
                        sails.log(tests[j].testname);
                        sails.log(testResult);
                        sails.log(earliestchangelist);
                        sails.log(variants[i].variantname);
                        sails.log('push test '+tests[j].testname);
                        resultbychangelist.push({
                          'kind'        : 'singletest',
                          'testname'    : tests[j].testname,
                          'result'      : testResult,
                          'changelist'  : earliestchangelist,
                          'variantname' : variants[i].variantname
                        });
                        results[variants[i].variantname][tests[j].testname]=testResult;
                        if(resultbychangelist.length == (variants.length * tests.length)){
                          jobid_common_sanity_getChangelistToRun.start();
                          sails.log(moment().format('YYYY-MM-DD HH:mm:ss'));
                          sails.log('jobid_common_sanity_getChangelistToRun start after done previous');
                          //if(donetest.indexOf(tests[j].testname) == -1){
                          //  donetest.push(tests[j].testname);
                          //}
                          //else{
                          //  sails.log('ERROR : dup test : '+tests[j].testname);
                          //}
                          //if(donetest.length == tests.length){
                          //  sails.log('push variant '+variants[i].variantname);
                          //  if(donevariant.indexOf(variants[i].variantname) == -1){
                          //    donevariant.push(variants[i].variantname);
                          //  }
                          //  else{
                          //    sails.log('ERROR : dup variant : '+variants[i].variantname);
                          //  }
                          //  donetest=[];
                          //  if(donevariant.length == variants.length){
                          //    jobid_common_sanity_getChangelistToRun.start();
                          //    sails.log(moment().format('YYYY-MM-DD HH:mm:ss'));
                          //    sails.log('jobid_common_sanity_getChangelistToRun start after done previous');
                          //  }
                          //}
                          //send result
                          //let postData = querystring.stringify({
                          //  'kind':'singletest',
                          //  'testname': tests[j].testname,
                          //  'result'  : testResult,
                          //  'changelist': earliestchangelist,
                          //  'variantname' : variants[i].variantname
                          //});
                          let postData = querystring.stringify({
                            'kind': 'singlechangelist',
                            'changelist'  : earliestchangelist,
                            'results'     : JSON.stringify(results)
                          });
                          
                          let options = {
                            hostname: 'amdnbif.thehunters.club',
                            port: 80,
                            path: '/sanitys/common-sanity/uploadstatus',
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
                      });

                    }
                  }
                });
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
          
          // end
        }
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
  
},null,true,'Asia/Chongqing');
var jobid_common_sanity_pushNewChangelists  = new cronJob('*/5 * * * * *',function(){
  sails.log(moment().format('YYYY-MM-DD HH:mm:ss'));
  sails.log('jobid_common_sanity_pushNewChangelists start');
  //////////////////////////////////////////////
  //Get changelist to push to DB
  //////////////////////////////////////////////
  //Step 1 pop current CL 
  let postData = querystring.stringify({
    'kind': 'poplatest',
  });
  
  let options = {
    hostname: 'amdnbif.thehunters.club',
    port: 80,
    path: '/sanitys/common-sanity/popchangelist',
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
      sails.log(JSON.parse(chunk));
      if(JSON.parse(chunk).ok == 'ok'){
        //Step 2 get TOT latest Changelist till db one
        let changelists = [];
        if(JSON.parse(chunk).changelist =='NA'){
          sails.log('DB is empty');
          let R = child_process.execSync('cd '+workspace+'/nbif_main && p4 changes -m1 ...#head',{
            encoding  : 'utf8'
          }).split(' ');
          let RR = R[5].split('@');
          changelists.push({
            changelist  : R[1],
            owner       : RR[0]
          });
          sails.log(changelists);
        }
        else{
          let dbLatestChangelist = JSON.parse(chunk).changelist;
          let R = child_process.execSync('cd '+workspace+'/nbif_main && p4 changes -m10 ...#head',{
            encoding  : 'utf8'
          }).split('\n');
          R.pop();
          for(let i=0;i<R.length;i++){
            let RR = R[i].split(' ');
            let RRR = RR[5].split('@');
            if(RR[1]  == dbLatestChangelist){
              break;
            }
            else{
              changelists.push({
                changelist  : RR[1],
                owner       : RRR[0]
              });
            }
          }
        }
        //Step 3 send the new changelists to db
        let postData = querystring.stringify({
          'kind': 'newchangelists',
          'changelists' : JSON.stringify(changelists)
        });
        
        let options = {
          hostname: 'amdnbif.thehunters.club',
          port: 80,
          path: '/sanitys/common-sanity/pushchangelist',
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
  //Step 1 end
  //////////////////////////////////////////////
  //END 
  //////////////////////////////////////////////
},null,false,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Process',


  description: 'Process common sanity.',


  inputs: {
    kind  : {
      type  : 'string'
    },
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/common-sanity/process');
    sails.log(inputs);
    if(inputs.kind  ==  'start'){
      sails.log('starting');
      jobid_common_sanity_pushNewChangelists.start();
    }
    else if(inputs.kind == 'stop'){
      sails.log('stopping');
      jobid_common_sanity_pushNewChangelists.stop();
    }
    // All done.
    return exits.success({
      ok  : 'ok'
    });

  }


};
