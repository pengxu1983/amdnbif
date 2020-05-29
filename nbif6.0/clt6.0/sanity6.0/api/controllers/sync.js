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
let variants        = ['nbif_nv10_gpu','nbif_draco_gpu','nbif_et_0','nbif_et_1','nbif_et_2'];//TODO
let kinds           = ['test','task'];//TODO
let tests           = ['demo_test_0','demo_test_1','demo_test_2'];//TODO
let tasks           = ['dcelab'];//TODO
let djregxfail      = /dj exited with errors/;
let djregxpass      = /dj exited successfully/;
let syncregxpass    = /All syncs OK/;
let resolvefail     = /resolve skipped/;
let HOME            = '/proj/cip_nbif_regress1/sanitycheck';
let refTrees        = [HOME+'/nbif.ref.main'];
let maxPS_CL        = 20;
let maxPS_SH        = 20;//TODO
let maxPSperson_SH  = 3;//TODO
let runningtasks_CL = 0;
let runningtasks_SH = 0;
let tasktype;
let params;
let act;
let runtimeout      = 60*6;//6 hrs
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


  friendlyName: 'Sync',


  description: 'Sync something.',


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
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sync');
    sails.log(inputs);
    let treeID  = inputs.checktype+'.'+inputs.codeline+'.'+inputs.branch_name+'.'+inputs.changelist+'.'+inputs.shelve+'.'+inputs.describe
    let treeRoot;
    treeRoot  = HOME+'/'+treeID;
    //check if killed
    let DB  = await Sanitysummary.find({
      codeline    : inputs.codeline,
      branch_name : inputs.branch_name,
      changelist  : inputs.changelist,
      shelve      : inputs.shelve,
      describe    : inputs.describe,
      result      : 'NOTSTARTED'
    });
    if(DB.length  >1){
      //abnormal
      console.log(loginit()+treeRoot+' has multiple record');
      child_process.exec('echo '+treeRoot+' has multiple record | mutt  Benny.Peng@amd.com -s [NBIF]['+checktype+'][treeRoot:'+treeRoot+']' );
    }
    else if(DB.length ==  1){
      console.log(loginit()+treeRoot+' already exists');
      child_process.exec('echo '+treeRoot+' already exists | mutt  Benny.Peng@amd.com -s [NBIF]['+checktype+'][treeRoot:'+treeRoot+']' );
    }
    //clean up workspace
    else if(fs.existsSync(treeRoot)){
      console.log(loginit()+treeRoot+' exists. cleaning up');
      console.log(__dirname);
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
