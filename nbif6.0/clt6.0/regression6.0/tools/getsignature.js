#!/home/benpeng/nbifweb_client/software/node/bin/node
let querystring     = require('querystring');
let child_process   = require('child_process');
let fs              = require('fs');
let process         = require('process');
let log             = process.argv[2];
//console.log('processing log : '+log);
let lines = fs.readFileSync(log,'utf8').split('\n');
lines.pop();
let regx001 = /^error/i;
let regx002 = /^UVM_ERROR/;
let regx003 = /^UVM_FATAL/;
let signature = 'UNKNOWN';
for(let l=0;l<lines.length;l++){
  if((regx001.test(lines[l])) || (regx002.test(lines[l])) || (regx003.test(lines[l]))){
    signature = lines[l];
    break;
  }
}
console.log(signature);