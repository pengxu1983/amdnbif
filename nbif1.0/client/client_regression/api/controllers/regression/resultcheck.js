var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
var workspace     = '/proj/bif_nbio_vol3_backup/benpeng/';
let testlist = [];
var jobid_regression_check = new cronJob('* * * * * *',function(){
  console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
  console.log('jobid_regression_newkickoff_check start');
  let dir = ['/proj/nbif_mero_regress1/ip_regress/anttili/branch_nv21_normal_split1/'];
  let mode = 'normal';
  let projectname = 'NV21';
},null,false,'Asia/Chongqing');
var jobid_regression_newkickoff = new cronJob('*/5 * * * * *',function(){
  console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
  console.log('jobid_regression_newkickoff start');
  //get info from DB //TODO
  //Projects 
  //Dirs per project
  let dir = ['/proj/nbif_mero_regress1/ip_regress/anttili/branch_nv21_normal_split1/','/proj/nbif_mero_regress1/ip_regress/anttili/branch_nv21_normal_split2/'];
  let mode = 'normal';
  let projectname = 'NV21';
  let variantname = 'nbif_nv10_gpu';
  let changelist ;
  //get changelist that regression pick
  let R = child_process.execSync('cd '+dir[0]+' && p4 changes -m1 ...#have',{
    encoding : 'utf8'
  }).split(' ');
  R.pop();
  changelist = R[1];
  let date = R[3];
  console.log('changelist : '+changelist);
  console.log('date : '+date);
  
  //Send to DB
  let postData = querystring.stringify({
    'kind'        : 'newkickoff',
    'changelist'  : changelist,
    'mode'        : 'normal',
    'date'        : date,
    'projectname' : projectname,
    'variantname' : variantname
  });
  
  let options = {
    hostname: 'amdnbif.thehunters.club',
    port: 80,
    path: '/regression/pushchangelist',
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
        let text='';
        text += '#!/tool/pandora64/bin/tcsh\n';
        text += 'cd '+dir[0]+'\n';
        text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
        text += 'bootenv -v '+variantname+'\n'
        text += 'dj -l '+workspace+'/testlist.'+variantname+'.'+projectname+'.log -DDEBUG -m run_test -s nbiftdl all -a print -w "group!=sanity && config==nbif_all_rtl && when=~/nbif_nightly/"\n';
        fs.writeFileSync(workspace+'/nbif_main.script',text,{
          encoding  : 'utf8',
          mode      : '0700',
          flag      : 'w'
        });
        child_process.execFile(workspace+'/nbif_main.script',{
          encoding  : 'utf8',
          maxBuffer : 1024*1024*200
        },function(error){
          if(error){
            console.log(error);
            return;
          }
          fs.readFile(workspace+'/testlist.'+variantname+'.'+projectname+'.log',{
            encoding  : 'utf8',
          },(err,data) => {
            let L = data.split('\n');
            L.pop();
            for(let l=0;l<L.length;l++){
              let regx = /evaluation of 'testcase/;
              if(regx.test(L[l])){
                console.log(L[l]);
                let R = L[l].split('::');
                let RR = R[1].split('/');
                let RRR = RR[1].split('_nbif_all_rtl');
                //console.log('testname:');
                //console.log(RRR[0]);
                testlist.push(RRR[0]);
              }
            }
            for(let t=0;t<testlist.length;t++){
              if(fs.existsSync(dir[0]+'/out/linux_2.6.32_64.VCS/nbif_nv10_gpu/config/nbif_all_rtl/run/nbif-nv10_gpu-navi21/nbiftdl/'testlist[t]+'/REGRESS_PASS')){
                //this test is passing
                console.log(testlist[t]);
                console.log('PASS');
              }
              else{
                if(fs.existsSync(dir[0]+'/out/linux_2.6.32_64.VCS/nbif_nv10_gpu/config/nbif_all_rtl/run/nbif-nv10_gpu-navi21/nbiftdl/'testlist[t]+'/vcs_run.log')){
                  console.log(testlist[t]);
                  fs.readFile(dir[0]+'/out/linux_2.6.32_64.VCS/nbif_nv10_gpu/config/nbif_all_rtl/run/nbif-nv10_gpu-navi21/nbiftdl/'testlist[t]+'/vcs_run.log',{
                    encoding  : 'utf8',
                    maxBuffer : 1024*1024*100
                  },(err,data) => {
                    if(err){
                      console.log(err);
                    }
                    else{
                      let regx = /^UVM_ERROR\s+:\s+(\d+)/;
                      let lines = data.split('\n');
                      lines.pop();
                        
                    }
                  });
                }
              }
            }
          });
        });
      }
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });
  
  req.on('error', (e) => {
    //console.error(`problem with request: ${e.message}`);
  });
  
  // write data to request body
  req.write(postData);
  req.end();
  jobid_regression_newkickoff.stop();
  console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
  console.log('jobid_regression_newkickoff stop');
},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Resultcheck',


  description: 'Resultcheck regression.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
