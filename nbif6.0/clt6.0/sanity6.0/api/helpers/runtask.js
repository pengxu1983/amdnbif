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
      describe    : inputs.describe,
      checktype   : inputs.checktype
    });
    if((DB.result  =='KILLED')||(DB.result  =='TOKILL')||(DB.result  =='KILLING')){
      return;
    }
    console.log(loginit()+treeRoot+' runtask start');
    //get MASK
    let MASK  = YAML.load(treeRoot+'/sanityprofile.yml');
    let MASK_cp  = YAML.load(treeRoot+'/sanityprofile.yml');
    sails.log(MASK);
    await Sanitysummary.update({
      codeline    : inputs.codeline,
      branch_name : inputs.branch_name,
      changelist  : inputs.changelist,
      shelve      : inputs.shelve,
      describe    : inputs.describe,
      checktype   : inputs.checktype
    },{
      MASK        : JSON.stringify(MASK)
    });
    for(let variantname in MASK){
      for(let tasktype  in  MASK[variantname]){
        for(let casename=0;casename<MASK[variantname][tasktype].length;casename++){
          let casestarttime  = new moment();
          child_process.exec('bsub -P GIONB-SRDC -W '+runtimeout+' -q regr_high -Is -J nbif_C_rn -R "rusage[mem=5000] select[type==RHEL7_64]" '+__dirname+'/../../tools/runonecase.csh --treeRoot '+treeRoot+' --variantname '+variantname+' --tasktype '+tasktype+' --casename  '+MASK[variantname][tasktype][casename]+' --out_anchor '+treeRoot+'/out.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename],async function(err_run,stdout_run,stderr_run){
            let caseendtime   = new moment();
            console.log(loginit()+treeRoot+'.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename]+' run done');
            console.log(loginit()+treeRoot+'.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename]+' run cost '+moment.duration(caseendtime.diff(casestarttime)).as('minutes')+' minutes');
            if(!fs.existsSync(treeRoot+'/nb__.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename]+'.log')){
              fs.writeFileSync(treeRoot+'/nb__.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename]+'.FAIL','',{
                encoding  : 'utf8',
                mode      : '0600',
                flag      : 'w'
              });
            }
            else{
              let lines = fs.readFileSync(treeRoot+'/nb__.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename]+'.log','utf8').split('\n');
              lines.pop();
              for(let l=0;l<lines.length;l++){
                if(djregxpass.test(lines[l])){
                  fs.writeFileSync(treeRoot+'/result.run.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename]+'.PASS','',{
                    encoding  : 'utf8',
                    mode      : '0600',
                    flag      : 'w'
                  });
                }
              }
              if(!fs.existsSync(treeRoot+'/result.run.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename]+'.PASS')){
                fs.writeFileSync(treeRoot+'/result.run.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename]+'.FAIL','',{
                  encoding  : 'utf8',
                  mode      : '0600',
                  flag      : 'w'
                });
              }
            }
            if(fs.existsSync(treeRoot+'/result.run.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename]+'.PASS')){
              console.log(loginit()+treeRoot+'.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename]+' run pass');
              await Sanitydetails.create({
                codeline    : inputs.codeline,
                branch_name : inputs.branch_name,
                changelist  : inputs.changelist,
                shelve      : inputs.shelve,
                username    : inputs.username,
                describe    : inputs.describe,
                checktype   : inputs.checktype,
                variantname : variantname,
                tasktype    : tasktype,
                casename    : MASK[variantname][tasktype][casename],
                result      : 'PASS'
              });
              //clean up due to pass
              child_process.execSync('mv '+treeRoot+'/out.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename]+' '+treeRoot+'/out.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename]+'.rm');
              child_process.exec('rm -rf '+treeRoot+'/out.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename]+'.rm',function(err,stdout,stderr){
                console.log(loginit()+treeRoot+'/out.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename]+'.rm is cleaned due to pass');
              });
            }
            if(fs.existsSync(treeRoot+'/result.run.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename]+'.FAIL')){
              console.log(loginit()+treeRoot+'.'+variantname+'.'+tasktype+'.'+MASK[variantname][tasktype][casename]+' run fail');
              await Sanitydetails.create({
                codeline    : inputs.codeline,
                branch_name : inputs.branch_name,
                changelist  : inputs.changelist,
                shelve      : inputs.shelve,
                username    : inputs.username,
                describe    : inputs.describe,
                checktype   : inputs.checktype,
                variantname : variantname,
                tasktype    : tasktype,
                casename    : MASK[variantname][tasktype][casename],
                result      : 'FAIL'
              });
            }
            let passon  = JSON.parse(JSON.stringify(inputs));
            passon.MASK = MASK;
            await sails.helpers.checkifdon.with(passon);
          });
        }
      }
    }
  }


};

