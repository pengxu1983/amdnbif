let moment          = require('moment');
let querystring     = require('querystring');
let http            = require('http');
let fs              = require('fs');
let child_process   = require('child_process');
let cronJob         = require("cron").CronJob;
module.exports = {


  friendlyName: 'Start',


  description: 'Start general.',


  inputs: {
    step  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    let regressionid  = {
      projectname : 'mi200',
      variantname : 'nbif_nv10_gpu',
      branchname  : 'main',
      changelist  : 'latest',
      workspace   : '/proj/cip_nbif_regress1/nbif_regression/try1',
    };
    await sails.helpers.sync.with(regressionid);
    await sails.helpers.prebuild.with(regressionid);
    await sails.helpers.build.with(regressionid);
    let treeRoot = regressionid.workspace+'/'+regressionid.projectname+'.'+regressionid.variantname;
    child_process.exec('bsub -P bif-shub1 -q normal -Is -J NBIFrg -R \'rusage[mem=1000] select[type==RHEL7_64]\' '+treeRoot+'.sync',(error,stdout,stderr)=>{
      if(error){
        sails.log(error);
        return;
      }
      sails.log(stdout);
      sails.log(stderr);
      fs.writeFileSync(regressionid.workspace+'/SYNCPASS','',{
        encoding  : 'utf8',
        mode      : '0600',
        flag      : 'w'
      });
      ///////////////
      child_process.exec('bsub -P bif-shub1 -q normal -Is -J NBIFrg -R \'rusage[mem=5000] select[type==RHEL7_64]\' '+treeRoot+'.prebuild',{
        maxBuffer : 100*1024*1024
      },(error,stdout,stderr)=>{
        if(error){
          sails.log(error);
          return;
        }
        sails.log(stdout);
        sails.log(stderr);
        fs.writeFileSync(regressionid.workspace+'/PREBUILDPASS','',{
          encoding  : 'utf8',
          mode      : '0600',
          flag      : 'w'
        });
        ///////////////
        child_process.exec('bsub -P bif-shub1 -q normal -Is -J NBIFrg -R \'rusage[mem=10000] select[type==RHEL7_64]\' '+treeRoot+'.build',{
          maxBuffer : 100*1024*1024
        },(error,stdout,stderr)=>{
          if(error){
            sails.log(error);
            return;
          }
          sails.log(stdout);
          sails.log(stderr);
          fs.writeFileSync(regressionid.workspace+'/BUILDPASS','',{
            encoding  : 'utf8',
            mode      : '0600',
            flag      : 'w'
          });
          ///////////////
        });
      });
    });
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
