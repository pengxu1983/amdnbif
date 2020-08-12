#!/home/benpeng/nbifweb_client/software/node/bin/node
let querystring     = require('querystring');
let child_process   = require('child_process');
let fs              = require('fs');
let process         = require('process');
let log             = process.argv[2];
//console.log('processing log : '+log);
let lines = fs.readFileSync(log,'utf8').split('\n');
lines.pop();
let regx001 = /\+seed=(\d+)/;
lines[0].replace(regx001,function(rs,$1){
  console.log($1);
});
