let resolvefail     = /resolve skipped/;
let querystring     = require('querystring');
let http            = require('http');
let moment          = require('moment');
let process         = require('process');
let cronJob         = require("cron").CronJob;
let child_process   = require('child_process');
let fs              = require('fs');
let YAML            = require('yamljs');
let loginit         = function(){
  return '[LOG]['+moment().format('YYYY-MM-DD HH:mm:ss')+'] ';
};
let getemail        = function(username){
  let email;
  let lines = fs.readFileSync('/home/benpeng/p4users','utf8').split('\n');
  lines.pop();
  let regx  = /^(\w+) <(\S+)>.*accessed/;
  for(let l=0;l<lines.length;l++){
    if(regx.test(lines[l])){
      lines[l].replace(regx,function(rs,$1,$2){
        if($1==username){
          email = $2;
        }
      })
    }
  }
  return email;
}
module.exports = {


  friendlyName: 'Runtask',


  description: 'Runtask something.',


  inputs: {
    codeline    : {
      type      : 'string'
    },
    branch_name : {
      type      : 'string'
    },
    changelist  : {
      type      : 'string'
    },
    shelve      : {
      type      : 'string'
    },
    describe    : {
      type      : 'string'
    },
    username    : {
      type      : 'string'
    },
    hostname    : {
      type      : 'string'
    },
    checktype   : {
      type      : 'string'
    },
    treeRoot    : {
      type      : 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {
    sails.log('/runtask');
    sails.log(inputs);
    let treeRoot  = inputs.treeRoot;
    let DB  = await Sanitysummary.findOne({
      codeline    : inputs.codeline,
      branch_name : inputs.branch_name,
      changelist  : inputs.changelist,
      shelve      : inputs.shelve,
      describe    : inputs.describe
    });
    if((DB.result  =='KILLED')||(DB.result  =='TOKILL')||(DB.result  =='KILLING')){
      return;
    }
    console.log(loginit()+treeRoot+' runtask start');
    //get MASK

  }


};

