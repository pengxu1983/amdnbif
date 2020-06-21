let resolvefail     = /resolve skipped/;
let querystring     = require('querystring');
let http            = require('http');
let moment          = require('moment');
let process         = require('process');
let cronJob         = require("cron").CronJob;
let child_process   = require('child_process');
let fs              = require('fs');
let YAML            = require('yamljs');
let runtimeout      = 12*60;
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
    },
    projectname     : {
      type          : 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.log('/report');
    let inputs_local  = JSON.parse(JSON.stringify(inputs));
    let testlist  = inputs_local.testlist;
    let regx  = /(\w+)_nbif_all_rtl/;
    let cron_check  = new cronJob('0 */30 * * * *',async function(){
      for(let t=0;t<testlist.length;t++){
        let caseshort;
        inputs_local.testlist[t]['name'].replace(regx,function(rs,$1){
          caseshort = $1;
        });
        //console.log(loginit()+inputs_local.treeRoot+' checking test '+caseshort);
        if(fs.existsSync(inputs_local.treeRoot+'/result.'+inputs_local.variantname+'.'+caseshort+'.PASS')){
        }
        else if(fs.existsSync(inputs_local.treeRoot+'/result.'+inputs_local.variantname+'.'+caseshort+'.FAIL')){
        }
        else if(fs.existsSync(inputs_local.treeRoot+'/nb__.'+inputs_local.variantname+'.test.'+caseshort+'.log')){
          let lines = fs.readFileSync(inputs_local.treeRoot+'/nb__.'+inputs_local.variantname+'.test.'+caseshort+'.log','utf8').split('\n');
          lines.pop();
          for(let l=0;l<lines.length;l++){
            if(djregxpass.test(lines[l])){
              fs.writeFileSync(inputs_local.treeRoot+'/result.'+inputs_local.variantname+'.'+caseshort+'.PASS','',{
                encoding  : 'utf8',
                mode      : '0600',
                flag      : 'w'
              });
              break;
            }
            if(djregxfail.test(lines[l])){
              fs.writeFileSync(inputs_local.treeRoot+'/result.'+inputs_local.variantname+'.'+caseshort+'.FAIL','',{
                encoding  : 'utf8',
                mode      : '0600',
                flag      : 'w'
              });
              break;
            }
          }
          if(fs.existsSync(inputs_local.treeRoot+'/result.'+inputs_local.variantname+'.'+caseshort+'.FAIL')){
            let signature = 'NA';
            if(!fs.existsSync(testlist[t]['run_out_path']+'/vcs_run.log')){
              console.log(loginit()+inputs_local.treeRoot+' vcs_run.log not found');
              console.log(loginit()+inputs_local.treeRoot+' '+testlist[t]['name']);
              console.log(loginit()+inputs_local.treeRoot+' '+testlist[t]['run_out_path']);
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
                  codeline      : inputs_local.codeline,
                  branch_name   : inputs_local.branch_name,
                  changelist    : inputs_local.changelist,
                  shelve        : inputs_local.shelve,
                  describe      : inputs_local.describe,
                  kickoffdate   : inputs_local.kickoffdate,
                  username      : inputs_local.username,
                  isBAPU        : inputs_local.isBAPU,
                  isOfficial    : inputs_local.isOfficial,
                  variantname   : inputs_local.variantname,
                  casename      : caseshort,
                  seed          : testlist[t]['seed'],
                  config        : testlist[t]['config'],
                  group         : testlist[t]['group'],
                  projectname   : inputs_local.projectname,
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
          else if(fs.existsSync(inputs_local.treeRoot+'/result.'+inputs_local.variantname+'.'+caseshort+'.PASS')){
            await Regressiondetails.update({
              codeline      : inputs_local.codeline,
              branch_name   : inputs_local.branch_name,
              changelist    : inputs_local.changelist,
              shelve        : inputs_local.shelve,
              describe      : inputs_local.describe,
              kickoffdate   : inputs_local.kickoffdate,
              username      : inputs_local.username,
              isBAPU        : inputs_local.isBAPU,
              isOfficial    : inputs_local.isOfficial,
              variantname   : inputs_local.variantname,
              casename      : caseshort,
              seed          : testlist[t]['seed'],
              config        : testlist[t]['config'],
              group         : testlist[t]['group'],
              projectname   : inputs_local.projectname
            },{
              result        : 'PASS',
              signature     : 'NA'
            });
            child_process.exec('rm -rf '+testlist[t]['run_out_path']+'/*',function(err,stdout,stderr){});
          }
          else{
            await Regressiondetails.update({
              codeline      : inputs_local.codeline,
              branch_name   : inputs_local.branch_name,
              changelist    : inputs_local.changelist,
              shelve        : inputs_local.shelve,
              describe      : inputs_local.describe,
              kickoffdate   : inputs_local.kickoffdate,
              username      : inputs_local.username,
              isBAPU        : inputs_local.isBAPU,
              isOfficial    : inputs_local.isOfficial,
              variantname   : inputs_local.variantname,
              casename      : caseshort,
              seed          : testlist[t]['seed'],
              config        : testlist[t]['config'],
              group         : testlist[t]['group'],
              projectname   : inputs_local.projectname
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
      let passon  = JSON.parse(JSON.stringify(inputs_local));
      await sails.helpers.calculate.with(passon);
    },null,false,'Asia/Chongqing');
    cron_check.start();
    console.log(loginit()+inputs_local.treeRoot+' checking starts ');
    setTimeout(async function(){
      cron_check.stop();
    },24*3600*1000);//TODO 
  }
};

