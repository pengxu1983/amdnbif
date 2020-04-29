#!/home/benpeng/nbifweb_client/software/node/bin/node

let child_process   = require('child_process');
let pro={};
var moment          = require('moment');

console.log('start '+moment().format('HH:mm:ss'));
pro['123'] = child_process.exec('sleep 100',function(){
  console.log('end '+moment().format('HH:mm:ss'));
});


setTimeout(function(){
  console.log(pro['123'].pid);
},5*1000);
