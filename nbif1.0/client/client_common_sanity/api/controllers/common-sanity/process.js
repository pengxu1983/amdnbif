var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
var workspace     = '/local_vol1_nobackup/benpeng/';
let tree          = 'MAIN';
let enable        = true;
var jobid_common_sanity_getChangelistToRun  = new cronJob('0 */5 * * * *',function(){
  //console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
  console.log('jobid_common_sanity_getChangelistToRun start at'+moment().format('YYYY-MM-DD HH:mm:ss'));
  let earliestchangelist;
  let owner;
  let postData = querystring.stringify({
    'kind': 'popearliest',
    'tree': tree
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
        console.log('earliestchangelist :');
        console.log(earliestchangelist);
        console.log(owner);
        if(earliestchangelist == 'NA'){
          //do nothing
        }
        else{
          console.log('get tests and variants info');
          // Get info from DB
          jobid_common_sanity_getChangelistToRun.stop();
          console.log('jobid_common_sanity_getChangelistToRun stop at '+moment().format('YYYY-MM-DD HH:mm:ss'));
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
              console.log('variants and tests :');
              console.log(JSON.parse(chunk).variants);
              console.log(JSON.parse(chunk).tests);
              let variants  = JSON.parse(chunk).variants;
              let tests     = JSON.parse(chunk).tests;
              //clean up disk
              //child_process.execSync('mkdir '+workspace+'/nbif.'+tree+'.sanity.zombie');
              //let toRemove = child_process.execSync('ls -d '+workspace+'/nbif.'+tree+'.sanity.*',{
              //  encoding  : 'utf8'
              //}).split('\n');
              //toRemove.pop();
              //for(let i=0;i<toRemove.length;i++){
              //  console.log('Remove '+toRemove[i]);
              //  child_process.exec('rm -rf '+toRemove[i]);
              //}
              let donevariant = [];
              let resultbychangelist = [];
              let results = {};
              for(let i=0;i<variants.length;i++){
                let treeRoot = workspace+'/nbif.'+tree+'.sanity.'+variants[i].variantname;
                results[variants[i].variantname]={};
                let text  = '';
                text += '#!/tool/pandora64/bin/tcsh\n';
                text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
                text += 'cd '+treeRoot+'\n';
                if(fs.existsSync(treeRoot)){
                  text += 'p4w sync_all @'+earliestchangelist+'\n';
                  if(fs.existsSync(treeRoot+'/out')){
                    text += 'rm -rf '+treeRoot+'/out\n';
                  }
                }
                else{
                  fs.mkdirSync(treeRoot);
                  text += 'p4_mkwa -codeline nbif2_0 -cl '+earliestchangelist+'\n';
                }
                text += 'bootenv -v '+variants[i].variantname+'\n';
                for(let k=0;k<tests.length;k++){
                  if(fs.existsSync(treeRoot+'/'+tests[k].testname+'.'+variants[i].variantname+'.log')){
                    text += 'rm -rf '+treeRoot+'/'+tests[k].testname+'.'+variants[i].variantname+'.log';
                  }
                  if(fs.existsSync(treeRoot+'/'+tests[k].testname+'.'+variants[i].variantname+'.log.bak')){
                    text += 'rm -rf '+treeRoot+'/'+tests[k].testname+'.'+variants[i].variantname+'.log.bak';
                  }
                  if(k==0){
                    text  += 'dj -l '+tests[k].testname+'.'+variants[i].variantname+'.log -DUVM_VERBOSITY=UVM_LOW -m4 -DUSE_VRQ -DCGM -DSEED=12345678  run_test -s nbiftdl '+tests[k].testname+'_nbif_all_rtl\n'
                  }
                  else {
                    text  += 'dj -l '+tests[k].testname+'.'+variants[i].variantname+'.log -DUVM_VERBOSITY=UVM_LOW -m4 -DUSE_VRQ -DCGM -DSEED=12345678  run_test -s nbiftdl '+tests[k].testname+'_nbif_all_rtl -a run=only\n'
                  }
                }
                fs.writeFileSync(treeRoot+'.script',text,{
                  encoding  : 'utf8',
                  mode      : '0700',
                  flag      : 'w'
                });
                child_process.execFile(treeRoot+'.script',{
                  encoding  : 'utf8',
                  maxBuffer : 1024*1000
                },function(error){
                  //check
                  let donetest = [];
                  for(let j=0;j<tests.length;j++){
                    let testResult ='FAIL';
                    if(fs.existsSync(treeRoot+'/'+tests[j].testname+'.'+variants[i].variantname+'.log')){
                      fs.readFile(treeRoot+'/'+tests[j].testname+'.'+variants[i].variantname+'.log',{
                        encoding : 'utf8'
                      },(err,data) => {
                        let R = data.split('\n');
                        R.pop();
                        for(let ii=0;ii<R.length;ii++){
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
                        console.log(tests[j].testname);
                        console.log(testResult);
                        console.log(earliestchangelist);
                        console.log(variants[i].variantname);
                        console.log('push test '+tests[j].testname);
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
                          console.log('jobid_common_sanity_getChangelistToRun start after done previous at '+moment().format('YYYY-MM-DD HH:mm:ss'));
                          let postData = querystring.stringify({
                            'kind': 'singlechangelist',
                            'changelist'  : earliestchangelist,
                            'tree'        : tree,
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
//========================
//push new change lists
//========================
var jobid_common_sanity_pushNewChangelists  = new cronJob('0 */5 * * * *',function(){
  console.log('jobid_common_sanity_pushNewChangelists start at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  //////////////////////////////////////////////
  //Get changelist to push to DB
  //////////////////////////////////////////////
  //Step 1 pop current CL 
  let postData = querystring.stringify({
    'kind': 'poplatest',
    'tree': tree
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
      //console.log(JSON.parse(chunk));
      if(JSON.parse(chunk).ok == 'ok'){
        //Step 2 get TOT latest Changelist till db one
        let changelists = [];
        if(JSON.parse(chunk).changelist =='NA'){
          console.log('DB is empty');
          //let R = child_process.execSync('cd '+workspace+'/nbif.'+tree+' && p4 changes -m1 ...#head',{
          //  encoding  : 'utf8'
          //}).split(' ');
          let trytimes = 5;
          let tmp ;
          let R ;
          while(trytimes > 0){
            tmp = child_process.spawnSync('cd '+workspace+'/nbif.'+tree+' && p4 changes -m1 ...#head',{
              encoding  : 'utf8',
              shell : 'tcsh'
            });
            if(tmp.error){
              trytimes--;
            }
            else{
              trytimes = 0;
              R = tmp.stdout.split(' ');
              console.log('p4 stdout');
              console.log(R);
            }
          }
          let RR = R[5].split('@');
          changelists.push({
            changelist  : R[1],
            owner       : RR[0]
          });
          console.log(changelists);
        }
        else{
          let dbLatestChangelist = JSON.parse(chunk).changelist;
          let trytimes = 5;
          let tmp ;
          let R ;
          while(trytimes > 0){
            tmp = child_process.spawnSync('cd '+workspace+'/nbif.'+tree+' && p4 changes -m10 ...#head',{
              encoding  : 'utf8',
              shell : 'tcsh'
            });
            if(tmp.error){
              trytimes--;
            }
            else{
              trytimes = 0;
              R = tmp.stdout.split('\n');
            }
          }
          //let R = child_process.execSync('cd '+workspace+'/nbif.'+tree+' && p4 changes -m10 ...#head',{
          //  encoding  : 'utf8'
          //}).split('\n');
          R.pop();
          console.log(R);
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
          'tree': tree,
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
},null,true,'Asia/Chongqing');
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
    console.log('/common-sanity/process');
    console.log(inputs);
    if(inputs.kind  ==  'start'){
      console.log('starting');
      jobid_common_sanity_pushNewChangelists.start();
    }
    else if(inputs.kind == 'stop'){
      console.log('stopping');
      jobid_common_sanity_pushNewChangelists.stop();
    }
    // All done.
    return exits.success({
      ok  : 'ok'
    });

  }


};
