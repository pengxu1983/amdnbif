let querystring     = require('querystring');
let http            = require('http');
let moment          = require('moment');
let process         = require('process');
let cronJob         = require("cron").CronJob;
let child_process   = require('child_process');
let fs              = require('fs');
let YAML            = require('yamljs');
let runtimeout      = 6*60;
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
let djregxfail      = /dj exited with errors/;
let djregxpass      = /dj exited successfully/;
module.exports = {


  friendlyName: 'Regressionstart',


  description: 'Regressionstart something.',


  inputs: {
    codeline    : {
      type          : 'string'
    },
    branch_name : {
      type          : 'string'
    },
    changelist  : {
      type          : 'string'
    },
    shelve      : {
      type          : 'string'
    },
    projectname : {
      type          : 'string'
    },
    variantname : {
      type          : 'string'
    },
    describe    : {
      type          : 'string'
    },
    isOfficial  : {
      type          : 'string'
    },
    isBAPU      : {
      type          : 'string'
    },
    treeRoot    : {
      type          : 'string'
    },
    out_home    : {
      type          : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regressionstart');
    sails.log(inputs);
    let inputs_local  = JSON.parse(JSON.stringify(inputs));
    let lines     = fs.readFileSync(inputs_local.treeRoot+'/testlist.log','utf8').split('\n');
    lines.pop();
    let regx00    = /^\[dj \d+:\d+:\d+ I\]:   "testcase": "(.*)"/;
    let regx01    = /^\[dj \d+:\d+:\d+ I\]:   "suite": "(.*)::(\w+)"/;
    let regx02    = /^\[dj \d+:\d+:\d+ I\]:   }/;
    let regx03    = /^\[dj \d+:\d+:\d+ I\]:     "name": "(.*)"/;
    let regx04    = /^\[dj \d+:\d+:\d+ I\]:     "config": "(.*)"/;
    let regx05    = /^\[dj \d+:\d+:\d+ I\]:     "run_seed": "(.*)"/;
    let regx06    = /^\[dj \d+:\d+:\d+ I\]:     "group": "(.*)"/;
    let regx07    = /^\[dj \d+:\d+:\d+ I\]:     "run_start_time": "(.*)"/;
    let regx08    = /^\[dj \d+:\d+:\d+ I\]:     "run_out_path": "(.*)"/;
    let regx09    = /^\[dj \d+:\d+:\d+ I\]:     "fullname": "(.*)"/;
    let flag      = 0;
    let testlist  = [];
    let index = 0;
    for(let l=0;l<lines.length;l++){
      if(regx00.test(lines[l])){
        flag  = 1;
        testlist[index]={};
        testlist[index]['name']='';
        testlist[index]['suite']='';//TODO
        testlist[index]['config']='';
        testlist[index]['group']='';
        testlist[index]['codeline']=inputs_local.codeline;
        testlist[index]['branch_name']=inputs_local.branch_name;
        testlist[index]['changelist']=inputs_local.changelist;
        testlist[index]['shelve']=inputs_local.shelve;
        testlist[index]['isBAPU']=inputs_local.isBAPU;
        testlist[index]['isOfficial']=inputs_local.isOfficial;
        testlist[index]['run_out_path']='';
        testlist[index]['variantname']=inputs_local.variantname;
        //testlist[index]['seed']=Math.floor((Math.random()*999999)+1);//TODO
      }
      if(regx02.test(lines[l])){
        flag  = 0;
        index++;
      }
      if(flag ==  1){
        //kickoffdate
        testlist[index]['kickoffdate']  = inputs_local.kickoffdate;
        //testname 
        if(regx03.test(lines[l])){
          lines[l].replace(regx03,function(rs,$1){
            testlist[index]['name'] = $1;
            //console.log(loginit()+inputs_local.treeRoot+' name '+testlist[index]['name']);
          });
        }
        //run_out_path
        if(regx08.test(lines[l])){
          lines[l].replace(regx08,function(rs,$1){
            let out_home  = inputs_local.out_home;//TODO
            let regxouthome = /\$OUT_HOME/;
            let R = $1;
            R = R.replace(regxouthome,out_home);
            testlist[index]['run_out_path'] = R;
            //console.log(loginit()+inputs_local.treeRoot+' run_out_path '+testlist[index]['run_out_path']);
          });
        }
        //group
        if(regx06.test(lines[l])){
          lines[l].replace(regx06,function(rs,$1){
            testlist[index]['group'] = $1;
            //console.log(loginit()+inputs_local.treeRoot+' group '+testlist[index]['group']);
          });
        }
        //suite 
        if(regx01.test(lines[l])){
          lines[l].replace(regx01,function(rs,$1,$2){
            testlist[index]['suite'] = $2;
            //console.log(loginit()+inputs_local.treeRoot+' suite '+testlist[index]['suite']);
          });
        }
        //config
        if(regx04.test(lines[l])){
          lines[l].replace(regx04,function(rs,$1){
            testlist[index]['config'] = $1;
            //console.log(loginit()+inputs_local.treeRoot+' config '+testlist[index]['config']);
          });
        }
      }
    }
    sails.log(testlist.length+' tests found');
    await Regressionsummary.create({
      codeline      : inputs_local.codeline,
      branch_name   : inputs_local.branch_name,
      changelist    : inputs_local.changelist,
      shelve        : inputs_local.shelve,//should be a list
      kickoffdate   : inputs_local.kickoffdate,
      describe      : inputs_local.describe,
      isOfficial    : inputs_local.isOfficial,
      isBAPU        : inputs_local.isBAPU,
      variantname   : inputs_local.variantname,
      //grouplist     : inputs_local.grouplist,
      username      : 'benpeng',//TODO
      testnumber    : testlist.length,
      passnumber    : 0,
      passrate      : 0.00,
      failnumber    : 0,
      failrate      : 0.00,
      notrunnumber  : testlist.length,
      notrunrate    : 100.00,
      runningnumber : 0,
      runningrate   : 0.00
    });
    let regx  = /(\w+)_nbif_all_rtl/;
    for(let t=0;t<testlist.length;t++){
      let caseshort;
      testlist[t]['name'].replace(regx,function(rs,$1){
        caseshort = $1;
      });
      await Regressiondetails.create({
        codeline    : inputs_local.codeline,
        branch_name : inputs_local.branch_name,
        changelist  : inputs_local.changelist,
        shelve      : inputs_local.shelve,
        variantname : inputs_local.variantname,
        casename    : caseshort,
        isBAPU      : inputs_local.isBAPU,
        isOfficial  : inputs_local.isOfficial,
        seed        : testlist[t]['seed'],
        config      : testlist[t]['config'],
        group       : testlist[t]['group'],
        suite       : testlist[t]['suite'],
        kickoffdate : inputs_local.kickoffdate,
        describe    : inputs_local.describe,
        username    : 'benpeng',
        result      : 'NOTSTARTED',
        projectname : inputs_local.projectname
      });
    }
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
