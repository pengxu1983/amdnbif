let querystring     = require('querystring');
let http            = require('http');
let moment          = require('moment');
let process         = require('process');
let cronJob         = require("cron").CronJob;
let child_process   = require('child_process');
let fs              = require('fs');
let loginit         = function(){
  return '[LOG]['+moment().format('YYYY-MM-DD HH:mm:ss')+'] ';
};
let PS              = {};
module.exports = {


  friendlyName: 'Cleanworkspace',


  description: 'Cleanworkspace something.',


  inputs: {
    tasktype  : {
      type  : 'string'
    },
    params  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/cleanworkspace');
    sails.log(inputs);
    
    if(!PS.hasOwnProperty(inputs.tasktype)){
      PS[inputs.tasktype]={};
    }
    switch  (inputs.tasktype){
      case  'shelvesanitycheckstart':
        if(!PS[inputs.tasktype].hasOwnProperty(inputs.params.codeline+'_'+inputs.params.branch_name+'_SH_'+inputs.params.shelve)){
          PS[inputs.tasktype][inputs.params.codeline+'_'+inputs.params.branch_name+'_'+inputs.params.shelve] = [];
        }
        console.log(loginit()+inputs.params.treeRoot+'.rm is being cleaned');
        child_process.execSync('mv '+inputs.params.treeRoot+' '+inputs.params.treeRoot+'.rm');
        child_process.exec('rm -rf '+inputs.params.treeRoot+'.rm',function(err1,stdout1,stderr1){
          console.log(loginit()+inputs.params.treeRoot+'.rm clean done');
          if(err1){
            console.log(loginit()+inputs.params.treeRoot+'.rm clean err '+err1);
          }
          delete PS[inputs.tasktype][inputs.params.codeline+'_'+inputs.params.branch_name+'_'+inputs.params.shelve];
        });
        break;
      case  'shelvesanitycheckstop':
        if(PS.hasOwnProperty('shelvesanitycheckstart')){
          if(PS['shelvesanitycheckstart'].hasOwnProperty(inputs.params.codeline+'_'+inputs.params.branch_name+'_'+inputs.params.shelve)){
            for(let p=0;p<PS['shelvesanitycheckstart'][inputs.params.codeline+'_'+inputs.params.branch_name+'_'+inputs.params.shelve].length;p++){
              PS['shelvesanitycheckstart'][inputs.params.codeline+'_'+inputs.params.branch_name+'_'+inputs.params.shelve][p].kill();
            }
            delete PS['shelvesanitycheckstart'][inputs.params.codeline+'_'+inputs.params.branch_name+'_'+inputs.params.shelve];
          }
        }
        break;

    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
