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
      projectname : 'rmb',
      variantname : 'nbif_draco_gpu',
      branchname  : 'main',
      changelist  : 'latest',
      //workspace   : '/proj/cip_nbif_regress2/nbif_regression/',
      treeRoot    : '/proj/cip_nbif_regress2/nbif_regression/nbif.regression.main.nbif_draco_gpu.1'
    };
    await sails.helpers.sync.with(regressionid);
    await sails.helpers.prebuild.with(regressionid);
    await sails.helpers.build.with(regressionid);
    await sails.helpers.kickoff.with(regressionid);
    child_process.exec('bsub -P bif-shub1 -q normal -Is -J NBIFrg -R \'rusage[mem=1000] select[type==RHEL7_64]\' '+regressionid.treeRoot+'.sync',(error,stdout,stderr)=>{
      if(error){
        sails.log(error);
        return;
      }
      sails.log(stdout);
      sails.log(stderr);
      if(fs.existsSync(regressionid.treeRoot+'/SYNCPASS')){
        fs.unlinkSync(regressionid.treeRoot+'/SYNCPASS');
      }
      fs.writeFileSync(regressionid.treeRoot+'/SYNCPASS','',{
        encoding  : 'utf8',
        mode      : '0600',
        flag      : 'w'
      });
      ///////////////
      child_process.exec('bsub -P bif-shub1 -q normal -Is -J NBIFrg -R \'rusage[mem=5000] select[type==RHEL7_64]\' '+regressionid.treeRoot+'.prebuild',{
        maxBuffer : 200*1024*1024
      },(error,stdout,stderr)=>{
        if(error){
          sails.log(error);
          return;
        }
        sails.log(stdout);
        sails.log(stderr);
        if(fs.existsSync(regressionid.treeRoot+'/PREBUILDPASS')){
          fs.unlinkSync(regressionid.treeRoot+'/PREBUILDPASS');
        }
        fs.writeFileSync(regressionid.treeRoot+'/PREBUILDPASS','',{
          encoding  : 'utf8',
          mode      : '0600',
          flag      : 'w'
        });
        ///////////////
        child_process.exec('bsub -P bif-shub1 -q normal -Is -J NBIFrg -R \'rusage[mem=10000] select[type==RHEL7_64]\' '+regressionid.treeRoot+'.build',{
          maxBuffer : 100*1024*1024
        },(error,stdout,stderr)=>{
          if(error){
            sails.log(error);
            return;
          }
          sails.log(stdout);
          sails.log(stderr);
          if(fs.existsSync(regressionid.treeRoot+'/BUILDPASS')){
            fs.unlinkSync(regressionid.treeRoot+'/BUILDPASS');
          }
          fs.writeFileSync(regressionid.treeRoot+'/BUILDPASS','',{
            encoding  : 'utf8',
            mode      : '0600',
            flag      : 'w'
          });
          ///////////////
          child_process.exec('bsub -P bif-shub1 -q normal -Is -J NBIFrg -R \'rusage[mem=10000] select[type==RHEL7_64]\' '+regressionid.treeRoot+'.kickoff',{
            maxBuffer : 200*1024*1024
          },(error,stdout,stderr)=>{
            if(error){
              sails.log(error);
              return;
            }
            sails.log(stdout);
            sails.log(stderr);
            if(fs.existsSync(regressionid.treeRoot+'/KICKOFFPASS')){
              fs.unlinkSync(regressionid.treeRoot+'/KICKOFFPASS');
            }
            fs.writeFileSync(regressionid.treeRoot+'/KICKOFFPASS','',{
              encoding  : 'utf8',
              mode      : '0600',
              flag      : 'w'
            });
            ///////////////
          });
        });
      });
    });
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
