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


  friendlyName: 'Updatestatus',


  description: 'Updatestatus regression.',


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
    },
    kickoffdate   : {
      type          : 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.log('/regression/updatestatus');
    sails.log(inputs);
    let cron_update = new cronJob('0 0 * * * *',async function(){
      sails.log('start');
      if(!fs.existsSync(inputs.treeRoot+'/NBIF_TREE_INFO')){
        sails.log('no NBIF_TREE_INFO');
        cron_update.stop();
        return;
      }
      else{
        let kickedoffstatus = await Regressionsummary.find({
          codeline      : inputs.codeline,
          branch_name   : inputs.branch_name,
          changelist    : inputs.changelist,
          shelve        : inputs.shelve,//should be a list
          kickoffdate   : inputs.kickoffdate,
          describe      : inputs.describe,
          isOfficial    : inputs.isOfficial,
          isBAPU        : inputs.isBAPU,
          variantname   : inputs.variantname,
          //grouplist     : inputs_local.grouplist,
          username      : 'benpeng',//TODO
          //testnumber    : testlist.length,
          //passnumber    : 0,
          //passrate      : 0.00,
          //failnumber    : 0,
          //failrate      : 0.00,
          //notrunnumber  : testlist.length,
          //notrunrate    : 100.00,
          //runningnumber : 0,
          //runningrate   : 0.00
        });
        if(kickedoffstatus.length !=  1){
          cron_update.stop();
          return;
        }
        else{
          let nostatuscases = await Regressiondetails.find({
            codeline    : inputs.codeline,
            branch_name : inputs.branch_name,
            changelist  : inputs.changelist,
            shelve      : inputs.shelve,
            variantname : inputs.variantname,
            //casename    : caseshort,
            isBAPU      : inputs.isBAPU,
            isOfficial  : inputs.isOfficial,
            //seed        : testlist[t]['seed'],
            //config      : testlist[t]['config'],
            //group       : testlist[t]['group'],
            //suite       : testlist[t]['suite'],
            kickoffdate : inputs.kickoffdate,
            describe    : inputs.describe,
            username    : 'benpeng',
            result      : 'NOTSTARTED',
            projectname : inputs.projectname
          });
          if(nostatuscases.length ==  0){
            cron_update.stop();
            return;
          }
          else{
            for(let c=0;c<nostatuscases.length;c++){
              if(!fs.existsSync(inputs.treeRoot+'/NBIF_TREE_INFO')){
                break;
              }
              let result;
              let signature;
              let seed;
              if(fs.existsSync(nostatuscases[c].run_out_path+'/REGRESS_PASS')){
                result  = 'PASS';
                seed    = 'NA';
                signature = 'NA';
                console.log(loginit()+inputs.treeRoot+' signature is '+signature);
                console.log(loginit()+inputs.treeRoot+' seed  is '+seed);
                console.log(loginit()+inputs.treeRoot+' result  is '+result);
              }
              else if(!fs.existsSync(nostatuscases[c].run_out_path+'/vcs_run.log')){
                result  = 'NOTSTARTED';
                seed    = 'NA';
                signature = 'NA';
                console.log(loginit()+inputs.treeRoot+' signature is '+signature);
                console.log(loginit()+inputs.treeRoot+' seed  is '+seed);
                console.log(loginit()+inputs.treeRoot+' result  is '+result);
              }
              else{
                let size  ;
                await child_process.exec('du '+nostatuscases[c].run_out_path+'/vcs_run.log',async function(err,stdout,stderr){
                  let regx  = /^(\d\+) vcs_run.log/;
                  stdout.replace(regx,function(rs,$1){
                    size  = $1;
                  });
                  if(size >500000){
                    result  = 'FAIL';
                    signature = 'LOG TOO LARGE';
                    seed  = child_process.execSync(__dirname+'/../../../tools/getseed.js '+nostatuscases[c].run_out_path+'/vcs_run.log',{
                      encoding  : 'utf8'
                    });
                  }
                  else{
                    result  = child_process.execSync(__dirname+'/../../../tools/getresult.js '+nostatuscases[c].run_out_path+'/vcs_run.log',{
                      encoding  : 'utf8'
                    });
                    signature = child_process.execSync(__dirname+'/../../../tools/getsignature.js '+nostatuscases[c].run_out_path+'/vcs_run.log',{
                      encoding  : 'utf8'
                    });//TODO
                    seed  = child_process.execSync(__dirname+'/../../../tools/getseed.js '+nostatuscases[c].run_out_path+'/vcs_run.log',{
                      encoding  : 'utf8'
                    });
                  }
                  console.log(loginit()+inputs.treeRoot+' signature is '+signature);
                  console.log(loginit()+inputs.treeRoot+' seed  is '+seed);
                  console.log(loginit()+inputs.treeRoot+' result  is '+result);
                });
              }
            }
          }
        }
      }
    },null,true,'Asia/Chongqing');
  }


};

