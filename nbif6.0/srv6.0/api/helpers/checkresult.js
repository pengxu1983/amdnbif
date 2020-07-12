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


  friendlyName: 'Checkresult',


  description: 'Checkresult something.',


  inputs: {
    action  : {
      type  : 'string'
    },
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
    },
    kickoffdate : {
      type          : 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.log('/checkresult');
    sails.log(inputs);
    let check = new cronJob('0 */30 * * * *', function () {
      if(fs.existsSync(treeRoot+'/NBIF_TREE_INFO')){
        let listtocheck = await Regressiondetails.find({
          codeline    : inputs.codeline,
          branch_name : inputs.branch_name,
          changelist  : inputs.changelist,
          shelve      : inputs.shelve,
          variantname : inputs.variantname,
          isBAPU      : inputs.isBAPU,
          isOfficial  : inputs.isOfficial,
          kickoffdate : inputs.kickoffdate,
          describe    : inputs.describe,
          username    : 'benpeng',
          result      : 'NOTSTARTED',
          projectname : inputs.projectname
        });
        if(listtocheck.length  ==  0){
          check.stop();
        }
        else{
          for(let t=0;t<listtocheck.length;t++){
            if(fs.existsSync(listtocheck[t]['run_out_path']+'/REGRESSPASS')){
              await Regressiondetails.update({
                codeline    : inputs.codeline,
                branch_name : inputs.branch_name,
                changelist  : inputs.changelist,
                shelve      : inputs.shelve,
                variantname : inputs.variantname,
                isBAPU      : inputs.isBAPU,
                isOfficial  : inputs.isOfficial,
                kickoffdate : inputs.kickoffdate,
                describe    : inputs.describe,
                username    : 'benpeng',
                projectname : inputs.projectname,
                casename    : listtocheck[t]['casename'],
                suite       : listtocheck[t]['suite'],
                config      : listtocheck[t]['config'],
              },{
                result      : 'PASS',
                signature   : 'NA'
              });
            }
            else{
              if(!fs.existsSync(listtocheck[t]['run_out_path']+'/vcs_run.log')){
              }
              else{
                let seed      = child_process.execSync(__dirname+'/../../../common6.0/VCS_LOG_seed.js',{
                  maxBuffer : 300*1024*1024,
                  encoding  : 'utf8'
                });
                let signature = child_process.execSync(__dirname+'/../../../common6.0/VCS_LOG_parse.js',{
                  maxBuffer : 300*1024*1024,
                  encoding  : 'utf8'
                });
                if(signature  ==  'PASS'){
                  await Regressiondetails.update({
                    codeline    : inputs.codeline,
                    branch_name : inputs.branch_name,
                    changelist  : inputs.changelist,
                    shelve      : inputs.shelve,
                    variantname : inputs.variantname,
                    isBAPU      : inputs.isBAPU,
                    isOfficial  : inputs.isOfficial,
                    kickoffdate : inputs.kickoffdate,
                    describe    : inputs.describe,
                    username    : 'benpeng',
                    projectname : inputs.projectname,
                    casename    : listtocheck[t]['casename'],
                    suite       : listtocheck[t]['suite'],
                    config      : listtocheck[t]['config'],
                  },{
                    result      : 'PASS',
                    signature   : 'NA'
                  });
                }
                else if(signature ==  'RUNNING'){
                  await Regressiondetails.update({
                    codeline    : inputs.codeline,
                    branch_name : inputs.branch_name,
                    changelist  : inputs.changelist,
                    shelve      : inputs.shelve,
                    variantname : inputs.variantname,
                    isBAPU      : inputs.isBAPU,
                    isOfficial  : inputs.isOfficial,
                    kickoffdate : inputs.kickoffdate,
                    describe    : inputs.describe,
                    username    : 'benpeng',
                    projectname : inputs.projectname,
                    casename    : listtocheck[t]['casename'],
                    suite       : listtocheck[t]['suite'],
                    config      : listtocheck[t]['config'],
                  },{
                    result      : 'RUNNING',
                    //signature   : 'NA',
                  });
                }
              }
            }
          }
        }
      }
    }, null,false, 'Asia/Chongqing');
    if(inputs.action  ==  'start'){
      check.start();
    }
    if(inputs.action  ==  'stop'){
      check.stop();
    }
  }


};

