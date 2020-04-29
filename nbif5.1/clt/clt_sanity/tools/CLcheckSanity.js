#!/home/benpeng/nbifweb_client/software/node/bin/node
var mysql           = require('mysql');
let querystring     = require('querystring');
let http            = require('http');
var moment          = require('moment');
let process         = require('process');
let cronJob         = require("cron").CronJob;
let child_process   = require('child_process');
let fs              = require('fs');
let bsub1Gcln       = 'bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_cln -R "rusage[mem=1000] select[type==RHEL7_64]" ';
let bsub1Gsy        = 'bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_sy -R "rusage[mem=1000] select[type==RHEL7_64]" ';
let bsub5Grn        = 'bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_rn -R "rusage[mem=5000] select[type==RHEL7_64]" ';
let bsub30Grn       = 'bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_rn -R "rusage[mem=30000] select[type==RHEL7_64]" ';
let loginit         = function(){
  return '[LOG]['+moment().format('YYYY-MM-DD HH:mm:ss')+'] ';
};
let variants        = ['nbif_nv10_gpu','nbif_draco_gpu','nbif_et_0','nbif_et_1','nbif_et_2'];
let kinds           = ['test','task'];
let tests           = ['demo_test_0','demo_test_1','demo_test_2'];
let tasks           = ['dcelab'];
let MASK            = {};
for(let v=0;v<variants.length;v++){
  MASK[variants[v]]={};
  for(let k=0;k<kinds.length;k++){
    MASK[variants[v]][kinds[k]]={};
    if(kinds[k]=='test'){
      for(let t=0;t<tests.length;t++){
        MASK[variants[v]][kinds[k]][tests[t]]='yes';
      }
    }
    if(kinds[k]=='task'){
      for(let t=0;t<tasks.length;t++){
        MASK[variants[v]][kinds[k]][tasks[t]]='yes';
      }
    }
  }
}
let djregxfail      = /dj exited with errors/;
let djregxpass      = /dj exited successfully/;
let syncregxpass    = /All syncs OK/;
console.log(loginit()+JSON.stringify(MASK));

let httpreq = function(hostname,port,path,method,data){
  let postData = querystring.stringify(data);
  
  let options = {
    hostname: hostname,
    port: port,
    path: path,
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  let req = http.request(options, (res) => {
    //console.log(`STATUS: ${res.statusCode}`);
    //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      //console.log(loginit()+'response data received');
      //console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      //console.log(loginit()+'response end');
      //console.log('No more data in response.');
    });
  });
  
  req.on('error', (e) => {
    console.log(loginit()+'http error');
    console.error(`problem with request: ${e.message}`);
  });
  
  // Write data to request body
  req.write(postData);
  req.end();
};
let R = child_process.execSync('whoami',{
  encoding  : 'utf8'
}).split('\n');
let whoami=R[0];
console.log(loginit()+'whoami : '+R[0]);
let HOME            = '/proj/cip_nbif_regress1/sanitychangelistcheck';
let checknumber     = 3;
let maxPS_CL        = 20;
let runningtasks    = 0;
//let branchs         = ['nbif2_0_main'];
let refTrees        = [HOME+'/nbif.ref.main'];
let checkifdone     = function(resultlocation,stat,changelistobj){
  let overallstatus = 'PASS';
  let regx  = /FAIL/;
  for(let variantname in MASK){
    for(let kind  in  MASK[variantname]){
      for(let taskname in MASK[variantname][kind]){
        if(stat[variantname][taskname]  ==  ''){
          overallstatus = 'NOTDONE';
          break;
        }
      }
    }
  }
  if(overallstatus  ==  'NOTDONE'){
    return;
  }
  else{
    //all tasks done
    for(let variantname in MASK){
      for(let kind  in  MASK[variantname]){
        for(let taskname in MASK[variantname][kind]){
          if(regx.test(stat[variantname][taskname])){
            overallstatus = 'FAIL';
          }
        }
      }
    }
    //send email
    let mailbody  = '';
    for(let variantname in MASK){
    mailbody  +=  'variant : '+variantname+'\n';
      for(let kind  in  MASK[variantname]){
        for(let taskname in MASK[variantname][kind]){
          mailbody  +=  '  '+taskname+' is '+stat[variantname][taskname]+'\n';
        }
      }
    }
    child_process.exec('mutt Benny.Peng@amd.com -s [NBIF][SanityCheck]['+overallstat+'][codeline:'+changelistobj.codeline+'][branch_name:'+changelistobj.branch_name+'][changelist:'+changelistobj.changelist+'] < '+resultlocation+'/report',function(err,stdout,stderr){
    });
    httpreq('localhost','9001','/sanity/updatechangelist','POST',{
      codeline    : changelistobj.codeline,
      branch_name : changelistobj.branch_name,
      changelist  : changelistobj.changelistobj,
      resultlocation  : resultlocation,
      result      : overallstat,
      details     : JSON.stringify(stat)
    });
    if(overallstat=='PASS'){
      child_process.exec('bsub -P bif-shub2 -q regr_high -Is -J nbif_C_cln -R "rusage[mem=2000] select[type==RHEL7_64]" rm -rf '+resultlocation,function(err2,stdout2,stderr2){
        console.log(loginit()+resultlocation+' cleaned up');
      });
    }
    if(overallstat=='FAIL'){
      setTimeout(function(){
        child_process.exec('bsub -P bif-shub2 -q regr_high -Is -J nbif_C_cln -R "rusage[mem=2000] select[type==RHEL7_64]" rm -rf '+resultlocation,function(err2,stdout2,stderr2){
          console.log(loginit()+resultlocation+' cleaned up');
        });
      },24*3600*1000);
    }
  }
};
let cron_sync = new cronJob('0 */10 * * * *',function(){
  for(let treeId  =0;treeId < refTrees.length;treeId++){
    let synctext  = '';
    synctext  +=  '#!/tool/pandora64/bin/tcsh\n';
    synctext  +=  'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
    synctext  +=  'cd '+refTrees[treeId]+'\n';
    synctext  +=  'bootenv\n';
    synctext  +=  'p4w sync_all\n';
    fs.writeFileSync(refTrees[treeId]+'.sync.script',synctext,{
      encoding  : 'utf8',
      mode      : '0700',
      flag      : 'w'
    });
    child_process.exec(refTrees[treeId]+'.sync.script',function(err1,stdout1,stderr1){
      if(err1){
        console.log(loginit()+err1);
      }
    });
  }
},null,true,'Asia/Chongqing');
let cron_clupdate = new cronJob('0 * * * * *',function(){
  //Get changelists
  for(let treeId  =0;treeId < refTrees.length;treeId++){
    //one tree
    //changelist get
    

    let text  ='';
    text += '#!/tool/pandora64/bin/tcsh\n';
    text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
    text += 'cd '+refTrees[treeId]+'\n';
    text += 'p4 changes -m'+checknumber+' ...#head\n';
    fs.writeFileSync(refTrees[treeId]+'.catchCL.script',text,{
      encoding  : 'utf8',
      mode      : '0700',
      flag      : 'w'
    });
    let changelists =[];
    let R = child_process.execSync(refTrees[treeId]+'.catchCL.script',{
      encoding  : 'utf8',
    }).split('\n');
    //delete
    R.pop();
    let regx1   = /Change (\d+) on (\d+\/\d+\/\d+) by (\w+)@.*/;
    let regx2   = /(\w+)\/(\w+)@(\d+)/;
    let codeline ;
    let branch_name;
    if(fs.existsSync(refTrees[treeId]+'/configuration_id')){
      let lines = fs.readFileSync(refTrees[treeId]+'/configuration_id','utf8').split('\n');
      lines[0].replace(regx2,function(rs,$1,$2,$3){
        codeline  = $1;
        branch_name = $2;
      });
    }
    else{
      throw "no configuration_id";
    }
    for(let cl=0;cl<R.length;cl++){
      R[cl].replace(regx1,function(rs,$1,$2,$3){
        let oneCL = {
          changelist  : $1,
          submitdate  : $2,
          username    : $3,
          codeline    : codeline,
          branch_name : branch_name
        };
        //changelists.push(oneCL);
        httpreq('localhost','9001','/sanity/uploadchangelist','POST',oneCL);
      });
    }
    //console.log(changelists);
  }
},null,true,'Asia/Chongqing');
let cron_check  = new cronJob('*/5 * * * * *',function(){
  httpreq('localhost','9001','/sanity/runsanity','POST',{
    'kind'        : 'changelistcheck',
  });
},null,true,'Asia/Chongqing');
