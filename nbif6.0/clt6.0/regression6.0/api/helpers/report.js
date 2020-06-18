let resolvefail     = /resolve skipped/;
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


  friendlyName: 'Report',


  description: 'Report something.',


  inputs: {
    act             : {
      type          : 'string'
    },
    codeline        : {
      type          : 'string'
    },
    branch_name     : {
      type          : 'string'
    },
    changelist      : {
      type          : 'string'
    },
    shelve          : {
      type          : 'string'
    },
    describe        : {
      type          : 'string'
    },
    isBAPU          : {
      type          : 'string'
    },
    isOfficial      : {
      type          : 'string'
    },
    variantname     : {
      type          : 'string'
    },
    username        : {
      type          : 'string'
    },
    grouplist       : {
      type          : 'string'
    },
    kickoffdate     : {
      type          : 'string'
    },
    treeRoot        : {
      type          : 'string'
    },
    out_anchor      : {
      type          : 'string'
    },
    testlist        : {
      type          : 'json'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.log('/report');
    let testlist  = inputs.testlist;
    let regx  = /(\w+)_nbif_all_rtl/;
    let cron_check  = new cronJob('0 */30 * * * *',async function(){
      for(let t=0;t<testlist.length;t++){
        let caseshort;
        inputs.testlist[t]['name'].replace(regx,function(rs,$1){
          caseshort = $1;
        });
        console.log(loginit()+treeRoot+' checking test '+caseshort);
        if(fs.existsSync(inputs.treeRoot+'/result.'+inputs.variantname+'.'+caseshort+'.PASS')){
        }
        else if(fs.existsSync(inputs.treeRoot+'/result.'+inputs.variantname+'.'+caseshort+'.FAIL')){
        }
        else if(fs.existsSync(inputs.treeRoot+'/nb__.'+inputs.variantname+'.test.'+caseshort+'.log')){
          let lines = fs.readFileSync(inputs.treeRoot+'/nb__.'+inputs.variantname+'.test.'+caseshort+'.log','utf8').split('\n');
          lines.pop();
          for(let l=0;l<lines.length;l++){
            if(djregxpass.test(lines[l])){
              fs.writeFileSync(inputs.treeRoot+'/result.'+inputs.variantname+'.'+caseshort+'.PASS','',{
                encoding  : 'utf8',
                mode      : '0600',
                flag      : 'w'
              });
              break;
            }
            if(djregxfail.test(lines[l])){
              fs.writeFileSync(inputs.treeRoot+'/result.'+inputs.variantname+'.'+caseshort+'.FAIL','',{
                encoding  : 'utf8',
                mode      : '0600',
                flag      : 'w'
              });
              break;
            }
          }
          if(fs.existsSync(inputs.treeRoot+'/result.'+inputs.variantname+'.'+caseshort+'.FAIL')){
            let signature = 'NA';
            if(!fs.existsSync(testlist[t]['run_out_path'])){
              console.log(loginit()+treeRoot+' logdir not found');
              console.log(loginit()+treeRoot+' '+testlist[t]['name']);
              console.log(loginit()+treeRoot+' '+testlist[t]['run_out_path']);
            }
            else{
              let size  ;
              child_process.exec('du '+testlist[t]['run_out_path']+'/vcs_run.log',async function(err,stdout,stderr){
                let regx  = /^(\d\+) vcs_run.log/;
                stdout.replace(regx,function(rs,$1){
                  size  = $1;
                });
                if(size >500000){
                  signature = 'LOG TOO LARGE';
                }
                else{
                  signature = child_process.execSync(__dirname+'/../../tools/getsignature.js '+testlist[t]['run_out_path']+'/vcs_run.log',{
                    maxBuffer : 500*1024*1024,
                    encoding  : 'utf8'
                  });
                }
                await Regressiondetails.update({
                  codeline      : inputs.codeline,
                  branch_name   : inputs.branch_name,
                  changelist    : inputs.changelist,
                  shelve        : inputs.shelve,
                  describe      : inputs.describe,
                  kickoffdate   : inputs.kickoffdate,
                  username      : inputs.username,
                  isBAPU        : inputs.isBAPU,
                  isOfficial    : inputs.isOfficial,
                  variantname   : inputs.variantname,
                  casename      : caseshort,
                  seed          : testlist[t]['seed'],
                  config        : testlist[t]['config'],
                  group         : testlist[t]['group'],
                  projectname   : inputs.projectname,
                },{
                  result        : 'FAIL',
                  signature     : signature
                });
                child_process.execSync('mv '+testlist[t]['run_out_path']+'/vcs_run.log '+testlist[t]['run_out_path']+'/.vcs_run.log');
                child_process.exec('rm -rf '+testlist[t]['run_out_path']+'/*',function(err,stdout,stderr){
                  child_process.execSync('mv '+testlist[t]['run_out_path']+'/.vcs_run.log '+testlist[t]['run_out_path']+'/vcs_run.log');
                });
              });
            }
          }
          else if(fs.existsSync(inputs.treeRoot+'/result.'+inputs.variantname+'.'+caseshort+'.PASS')){
            await Regressiondetails.update({
              codeline      : inputs.codeline,
              branch_name   : inputs.branch_name,
              changelist    : inputs.changelist,
              shelve        : inputs.shelve,
              describe      : inputs.describe,
              kickoffdate   : inputs.kickoffdate,
              username      : inputs.username,
              isBAPU        : inputs.isBAPU,
              isOfficial    : inputs.isOfficial,
              variantname   : inputs.variantname,
              casename      : caseshort,
              seed          : testlist[t]['seed'],
              config        : testlist[t]['config'],
              group         : testlist[t]['group'],
              projectname   : inputs.projectname
            },{
              result        : 'PASS',
              signature     : 'NA'
            });
            child_process.exec('rm -rf '+testlist[t]['run_out_path']+'/*',function(err,stdout,stderr){});
          }
          else{
            await Regressiondetails.update({
              codeline      : inputs.codeline,
              branch_name   : inputs.branch_name,
              changelist    : inputs.changelist,
              shelve        : inputs.shelve,
              describe      : inputs.describe,
              kickoffdate   : inputs.kickoffdate,
              username      : inputs.username,
              isBAPU        : inputs.isBAPU,
              isOfficial    : inputs.isOfficial,
              variantname   : inputs.variantname,
              casename      : caseshort,
              seed          : testlist[t]['seed'],
              config        : testlist[t]['config'],
              group         : testlist[t]['group'],
              projectname   : inputs.projectname
            },{
              result        : 'RUNNING',
              //signature   : ''//TODO
            });
          }
        }
        else {
          //NOTSTARTED
        }
      }
    },null,false,'Asia/Chongqing');
    cron_check.start();
    setTimeout(async function(){
      cron_check.stop();
    },5*3600*1000);//TODO 
  }
};

