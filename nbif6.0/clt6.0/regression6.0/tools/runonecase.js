#!/home/benpeng/nbifweb_client/software/node/bin/node
let querystring     = require('querystring');
let http            = require('http');
let process         = require('process');
let child_process   = require('child_process');
let fs              = require('fs');
let djregxfail      = /dj exited with errors/;
let djregxpass      = /dj exited successfully/;
let djregxruntime   = /Elapsed Time:\s+(\S+)/;
let djregxbsubq     = /lsf jobid (\d+)/;
//program.parse(process.argv);

console.log('codeline     '+process.argv[2]);
let codeline      =         process.argv[2];
console.log('branch_name  '+process.argv[3]);
let branch_name   =         process.argv[3];
console.log('changelist   '+process.argv[4]);
let changelist    =         process.argv[4];
console.log('shelve       '+process.argv[5]);
let shelve        =         process.argv[5];
console.log('variantname  '+process.argv[6]);
let variantname   =         process.argv[6];
console.log('projectname  '+process.argv[7]);
let projectname   =         process.argv[7];
console.log('isOfficial   '+process.argv[8]);
let isOfficial    =         process.argv[8];
console.log('isBAPU       '+process.argv[9]);
let isBAPU        =         process.argv[9];
console.log('describe     '+process.argv[10]);
let describe      =         process.argv[10];
console.log('casename     '+process.argv[11]);
let casename      =         process.argv[11];
console.log('seed         '+process.argv[12]);
let seed          =         process.argv[12];
console.log('suite        '+process.argv[13]);
let suite         =         process.argv[13];
console.log('config       '+process.argv[14]);
let config        =         process.argv[14];
console.log('kickoffdate  '+process.argv[15]);
let kickoffdate   =         process.argv[15];
console.log('username     '+process.argv[16]);
let username      =         process.argv[16];
console.log('group        '+process.argv[17]);
let group         =         process.argv[17];
console.log('treeRoot     '+process.argv[18]);
let treeRoot      =         process.argv[18];
console.log('out_anchor   '+process.argv[19]);
let out_anchor    =         process.argv[19];
console.log('vcslogdir    '+process.argv[20]);
let vcslogdir     =         process.argv[20];
let signature     = 'NA'  ;
let result        = 'RUNNING';
let runtime       ;
let bsubQ         ;
//status before start
let postData_start = querystring.stringify({
  'codeline'      : codeline,
  'branch_name'   : branch_name,
  'changelist'    : changelist,
  'shelve'        : shelve,
  'kickoffdate'   : kickoffdate,
  'variantname'   : variantname,
  'describe'      : describe,
  'username'      : username,
  'projectname'   : projectname,
  'isOfficial'    : isOfficial,
  'isBAPU'        : isBAPU,
  'casename'      : casename,
  'suite'         : suite,
  'config'        : config,
  'seed'          : seed
});

let options_start = {
  hostname: 'atletx7-neu003',
  port: 7001,
  path: '/casestart',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData_start)
  }
};

let req_start = http.request(options_start, (res_start) => {
  //console.log(`STATUS: ${res_start.statusCode}`);
  //console.log(`HEADERS: ${JSON.stringify(res_start.headers)}`);
  res_start.setEncoding('utf8');
  res_start.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res_start.on('end', () => {
    console.log('No more data in response.');
  });
});

req_start.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req_start.write(postData_start);
req_start.end();
console.log('case start ');
//start
child_process.execSync(__dirname+'/runonecase.csh --treeRoot '+treeRoot+' --variantname '+variantname+' --tasktype test --runopt runonly --suite '+suite+' --casename  '+casename+' --out_anchor '+out_anchor,{
  maxBuffer : 4*1024*1024*1024,
});//,function(err,stdout,stderr){
  console.log('case done');
  if(!fs.existsSync(treeRoot+'/nb__.'+variantname+'.test.'+casename+'.log')){
    fs.writeFileSync(treeRoot+'/result.'+variantname+'.'+casename+'.FAIL','',{
      encoding  : 'utf8',
      mode      : '0600',
      flag      : 'w'
    });
    result  = 'FAIL';
    signature = 'NO DJ LOG'
  }
  else if(!fs.existsSync(vcslogdir+'/vcs_run.log')){
    result  = 'FAIL';
    signature = 'NO VCS LOG';
  }
  else{
    //check size
    let size;
    let R = child_process.execSync('du '+vcslogdir+'/vcs_run.log',{
      encoding  : 'utf8',
    });
    let regx  = /^(\d\+) vcs_run.log/;
    R.replace(regx,function(rs,$1){
      size  = $1;
    });
    if(size >300000){
      result    = 'FAIL';
      signature = 'LOG TOO LARGE';
    }
    else{
      let lines = fs.readFileSync(treeRoot+'/nb__.'+variantname+'.test.'+casename+'.log','utf8').split('\n');
      lines.pop();
      for(let l=0;l<lines.length;l++){
        if(djregxpass.test(lines[l])){
          fs.writeFileSync(treeRoot+'/result.'+variantname+'.'+casename+'.PASS','',{
            encoding  : 'utf8',
            mode      : '0600',
            flag      : 'w'
          });
        }
        if(djregxfail.test(lines[l])){
          fs.writeFileSync(treeRoot+'/result.'+variantname+'.'+casename+'.FAIL','',{
            encoding  : 'utf8',
            mode      : '0600',
            flag      : 'w'
          });
        }
        //runtime
        if(djregxruntime.test(lines[l])){
          lines[l].replace(djregxruntime,function(rs,$1){
            runtime = $1;
          });
        }
        //bsub
        if(djregxbsubq.test(lines[l])){
          lines[l].replace(djregxbsubq,function(rs,$1){
            bsubQ = $1;
          });
        }
      }
      if(fs.existsSync(treeRoot+'/result.'+variantname+'.'+casename+'.PASS')){
        signature = 'NA';
        result    = 'PASS';
        child_process.exec('cd '+vcslogdir+' && rm -rf *',function(){});
      }
      else if(fs.existsSync(treeRoot+'/result.'+variantname+'.'+casename+'.FAIL')){
        result    = 'FAIL';
        if(fs.existsSync(vcslogdir+'/vcs_run.log')){
          let lines = fs.readFileSync(vcslogdir+'/vcs_run.log','utf8').split('\n');
          lines.pop();
          let regx001 = /^error/i;
          let regx002 = /^UVM_ERROR/;
          let regx003 = /^UVM_FATAL/;
          for(let l=0;l<lines.length;l++){
            if((regx001.test(lines[l])) || (regx002.test(lines[l])) || (regx003.test(lines[l]))){
              signature = lines[l];
              break;
            }
          }
          child_process.execSync('mv '+vcslogdir+'/vcs_run.log '+vcslogdir+'.vcs_run.log');
          child_process.exec('cd '+vcslogdir+' && rm -rf *',function(){
            child_process.execSync('mv '+vcslogdir+'.vcs_run.log '+vcslogdir+'/vcs_run.log');
          });
        }
        else{
          signature = 'NO VCS LOG';
        }
        
      }
      else{
        result    = 'FAIL';
        signature = 'KILLED';
      }
    }
  }
  console.log('signature');
  console.log(signature);
  console.log('result');
  console.log(result);
  let postData_end = querystring.stringify({
    'codeline'      : codeline,
    'branch_name'   : branch_name,
    'changelist'    : changelist,
    'shelve'        : shelve,
    'kickoffdate'   : kickoffdate,
    'variantname'   : variantname,
    'describe'      : describe,
    'username'      : username,
    'projectname'   : projectname,
    'isOfficial'    : isOfficial,
    'isBAPU'        : isBAPU,
    'signature'     : signature,
    'runtime'       : runtime,
    'bsubQ'         : bsubQ,
    'result'        : result,
    'casename'      : casename,
    'suite'         : suite,
    'config'        : config,
    'seed'          : seed
  });
  
  let options_end = {
    hostname: 'atletx7-neu003',
    port: 7001,
    path: '/caseend',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData_end)
    }
  };
  
  let req_end = http.request(options_end, (res_end) => {
    //console.log(`STATUS: ${res_end.statusCode}`);
    //console.log(`HEADERS: ${JSON.stringify(res_end.headers)}`);
    res_end.setEncoding('utf8');
    res_end.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res_end.on('end', () => {
      console.log('No more data in response.');
    });
  });
  
  req_end.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  // Write data to request body
  req_end.write(postData_end);
  req_end.end();
//});
