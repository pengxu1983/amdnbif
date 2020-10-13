#!/home/benpeng/nbifweb_client/software/node/bin/node
let querystring     = require('querystring');
let child_process   = require('child_process');
let fs              = require('fs');
let process         = require('process');
let treeRoot        = process.argv[2];
let seed;
let projectname ;
let variantname ;
let isBAPU ;
let isOfficial;
let isBACO ;
let 
//parse NBIF_TREE_INFO

//parse testlist.log

//all cases


//if(!fs.existsSync(log)){
//  signature = 'NO VCS LOG';
//}
//else{
//  let R = child_process.execSync('du '+log,{
//    encoding  :'utf8'
//  });
//  let size;
//  let regx  = /^(\d+) vcs_run.log/;
//  R.replace(regx,function(rs,$1){
//    size  = $1;
//  });
//  if(size >300000){
//    signature = 'LOG TOO LARGE';
//  }
//  else{
//    let lines = fs.readFileSync(log,'utf8').split('\n');
//    lines.pop();
//    let regx001 = /^error/i;
//    let regx002 = /^UVM_ERROR/;
//    let regx003 = /^UVM_FATAL/;
//    let regx004 = /SvtTestEpilog: Failed/;
//    let regx005 = /SvtTestEpilog: Passed/;
//    let regx006 = /\+seed=(\d+)/;
//    let result  = 'RUNNING';
//    signature = 'RUNNING';
//    for(let l=0;l<lines.length;l++){
//      if(regx004.test(lines[l])){//FAIL
//        result  = 'FAIL';
//        break;
//      }
//      if(regx005.test(lines[l])){//PASS
//        result  = 'PASS';
//        break;
//      }
//    }
//    if(result ==  'FAIL'){
//      for(let l=0;l<lines.length;l++){
//        if((regx001.test(lines[l])) || (regx002.test(lines[l])) || (regx003.test(lines[l]))){
//          signature = lines[l];
//          break;
//        }
//      }
//    }
//  }
//}
