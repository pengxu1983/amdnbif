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


  friendlyName: 'Compile',


  description: 'Compile something.',


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
    projectname     : {
      type          : 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs,exits) {
    sails.log('/compile');
    sails.log(inputs);
    let inputs_local  = JSON.parse(JSON.stringify(inputs));
    sails.log(inputs_local);
    let DB  = await Regressionsummary.findOne({
      codeline    : inputs_local.codeline,
      branch_name : inputs_local.branch_name,
      changelist  : inputs_local.changelist,
      shelve      : inputs_local.shelve,
      describe    : inputs_local.describe,
      isOfficial  : inputs_local.isOfficial,
      isBAPU      : inputs_local.isBAPU,
      kickoffdate : inputs_local.kickoffdate,
      username    : inputs_local.username
    });
    if((DB.result  =='KILLED')||(DB.result  =='TOKILL')||(DB.result  =='KILLING')){
      return;
    }
    console.log(loginit()+inputs_local.treeRoot+' compile start');
    child_process.execSync('echo "<html><body><h3>Hi benpeng</h3><h4>Regression start to compile.</h4><h4><a href="http://logviewer-atl/'+inputs_local.treeRoot+'">Find Details here</a></h4></body></html>" | mutt  Benny.Peng@amd.com  -e \'set content_type="text/html"\' -s [NBIF][regression][isOfficial:'+inputs_local.isOfficial+'][isBAPU:'+inputs_local.isBAPU+'][codeline:'+inputs_local.codeline+'][branch_name:'+inputs_local.branch_name+'][changelist:'+inputs_local.changelist+'][shelve:'+inputs_local.shelve+'][describe:'+inputs_local.describe+'][COMPILEONLYSTART]');
    let compilestarttime  = new moment();
    child_process.exec('bsub -P GIONB-SRDC -W '+runtimeout+' -q regr_high -Is -J nbif_R_bd -R "rusage[mem=5000] select[type==RHEL7_64]" '+__dirname+'/../../tools/runonecase.csh --treeRoot '+inputs_local.treeRoot+' --variantname '+inputs_local.variantname+' --tasktype test --casename  demo_test_0 --runopt  compileonly --out_anchor '+inputs_local.treeRoot+'/out.'+inputs_local.variantname+'.'+inputs_local.kickoffdate,async function(err,stdout,stderr){
      let compileendtime  = new moment();
      console.log(loginit()+inputs_local.treeRoot+'.'+inputs_local.variantname+'.'+inputs_local.kickoffdate+' compile done');
      console.log(loginit()+inputs_local.treeRoot+'.'+inputs_local.variantname+'.'+inputs_local.kickoffdate+' compile cost '+moment.duration(compileendtime.diff(compilestarttime)).as('minutes')+' minutes');
      if(!fs.existsSync(inputs_local.treeRoot+'/nb__.'+inputs_local.variantname+'.compileonly.log')){
        fs.writeFileSync(inputs_local.treeRoot+'/nb__.'+inputs_local.variantname+'.compileonly.FAIL','',{
          encoding  : 'utf8',
          mode      : '0600',
          flag      : 'w'
        });
      }
      else{
        let lines = fs.readFileSync(inputs_local.treeRoot+'/nb__.'+inputs_local.variantname+'.compileonly.log','utf8').split('\n');
        lines.pop();
        for(let l=0;l<lines.length;l++){
          if(djregxpass.test(lines[l])){
            fs.writeFileSync(inputs_local.treeRoot+'/nb__.'+inputs_local.variantname+'.compileonly.PASS','',{
              encoding  : 'utf8',
              mode      : '0600',
              flag      : 'w'
            });
          }
          if(djregxfail.test(lines[l])){
            fs.writeFileSync(inputs_local.treeRoot+'/nb__.'+inputs_local.variantname+'.compileonly.FAIL','',{
              encoding  : 'utf8',
              mode      : '0600',
              flag      : 'w'
            });
          }
        }
        if(fs.existsSync(inputs_local.treeRoot+'/nb__.'+inputs_local.variantname+'.compileonly.PASS')){
        }
        else if(fs.existsSync(inputs_local.treeRoot+'/nb__.'+inputs_local.variantname+'.compileonly.FAIL')){
        }
        else{
          fs.writeFileSync(inputs_local.treeRoot+'/nb__.'+inputs_local.variantname+'.compileonly.FAIL','',{
            encoding  : 'utf8',
            mode      : '0600',
            flag      : 'w'
          });
        }
      }
      if(fs.existsSync(inputs_local.treeRoot+'/nb__.'+inputs_local.variantname+'.compileonly.FAIL')){
        console.log(loginit()+inputs_local.treeRoot+'.'+inputs_local.variantname+'.'+inputs_local.kickoffdate+' compile fail');
        child_process.execSync('echo "<html><body><h3>Hi benpeng</h3><h4>Regression compileonly fail.</h4><h4><a href="http://logviewer-atl/'+inputs_local.treeRoot+'">Find Details here</a></h4></body></html>" | mutt  Benny.Peng@amd.com  -e \'set content_type="text/html"\' -s [NBIF][regression][isOfficial:'+inputs_local.isOfficial+'][isBAPU:'+inputs_local.isBAPU+'][codeline:'+inputs_local.codeline+'][branch_name:'+inputs_local.branch_name+'][changelist:'+inputs_local.changelist+'][shelve:'+inputs_local.shelve+'][describe:'+inputs_local.describe+'][COMPILEONLYFAIL]');//FIXME should come from configuration_id
      }
      else if(fs.existsSync(inputs_local.treeRoot+'/nb__.'+inputs_local.variantname+'.compileonly.PASS')){
        console.log(loginit()+inputs_local.treeRoot+'.'+inputs_local.variantname+'.'+inputs_local.kickoffdate+' compile pass');
        child_process.execSync('echo "<html><body><h3>Hi benpeng</h3><h4>Regression compileonly pass.</h4><h4><a href="http://logviewer-atl/'+inputs_local.treeRoot+'">Find Details here</a></h4></body></html>" | mutt  Benny.Peng@amd.com  -e \'set content_type="text/html"\' -s [NBIF][regression][isOfficial:'+inputs_local.isOfficial+'][isBAPU:'+inputs_local.isBAPU+'][codeline:'+inputs_local.codeline+'][branch_name:'+inputs_local.branch_name+'][changelist:'+inputs_local.changelist+'][shelve:'+inputs_local.shelve+'][describe:'+inputs_local.describe+'][COMPILEONLYPASS]');//FIXME should come from configuration_id
        let passon  = JSON.parse(JSON.stringify(inputs_local));
        passon.out_anchor = inputs_local.treeRoot+'/out.'+inputs_local.variantname+'.'+inputs_local.kickoffdate;
        await sails.helpers.testlistgen.with(passon);
      }
    });
  }


};

