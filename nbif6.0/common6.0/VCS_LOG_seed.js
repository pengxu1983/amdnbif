#!/home/benpeng/nbifweb_client/software/node/bin/node
let querystring     = require('querystring');
let child_process   = require('child_process');
let fs              = require('fs');
let process         = require('process');
let log             = process.argv[2];
let seed  = 'NA';
//console.log('processing log : '+log);
if(!fs.existsSync(log)){
}
else{
  let R = child_process.execSync('du '+log,{
    encoding  :'utf8'
  });
  let size;
  let regx  = /^(\d+) vcs_run.log/;
  R.replace(regx,function(rs,$1){
    size  = $1;
  });
  if(size >300000){
    signature = 'LOG TOO LARGE';
  }
  else{
    //SvtTestEpilog: Failed
    //SvtTestEpilog: Passed
    let lines = fs.readFileSync(log,'utf8').split('\n');
    lines.pop();
    let regx001 = /\+seed=(\d+)/;
    lines[0].replace(regx001,function(rs,$1){
      seed  = $1;
    });
  }
}
console.log(seed);
