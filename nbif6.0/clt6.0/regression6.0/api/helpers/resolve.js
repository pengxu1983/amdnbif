let resolvefail     = /resolve skipped/;
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


  friendlyName: 'Resolve',


  description: 'Resolve something.',


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
    sails.log('/resolve');
    sails.log(inputs);
    let inputs_local  = JSON.parse(JSON.stringify(inputs));
    let treeRoot  = inputs_local.treeRoot;
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
    console.log(loginit()+treeRoot+' resolve start');
    child_process.execSync('echo "<html><body><h3>Hi benpeng</h3><h4>Regression resolve start.</h4><h4><a href="http://logviewer-atl/'+treeRoot+'">Find Details here</a></h4></body></html>" | mutt  Benny.Peng@amd.com  -e \'set content_type="text/html"\' -s [NBIF][regression][isOfficial:'+inputs_local.isOfficial+'][isBAPU:'+inputs_local.isBAPU+'][codeline:'+inputs_local.codeline+'][branch_name:'+inputs_local.branch_name+'][changelist:'+inputs_local.changelist+'][shelve:'+inputs_local.shelve+'][describe:'+inputs_local.describe+'][RESOLVESTART]');//FIXME should come from configuration_id
    let resolvestarttime  = new moment();
    if(inputs_local.shelve  ==  'NA'){
      let passon  = JSON.parse(JSON.stringify(inputs_local));
      await sails.helpers.compile.with(passon);
      return;
    }
    else{
      child_process.exec(__dirname+'/../../tools/resolve.csh --treeRoot '+treeRoot+' --shelve '+inputs_local.shelve+' --resolveopt -am --syncopt sync_local > '+treeRoot+'/nb__.resolve.log',async function(){
        let resolveendtime  = new moment();
        console.log(loginit()+treeRoot+' resolve done');
        console.log(loginit()+treeRoot+' resolve cost '+moment.duration(resolveendtime.diff(resolvestarttime)).as('minutes')+' minutes');
        if(!fs.existsSync(treeRoot+'/nb__.resolve.log')){
          fs.writeFileSync(treeRoot+'/nb__.resolve.FAIL','',{
            encoding  : 'utf8',
            mode      : '0600',
            flag      : 'w'
          });
        }
        else{
          let lines=fs.readFileSync(treeRoot+'/nb__.resolve.log','utf8').split('\n');
          lines.pop();
          for(let l=0;l<lines.length;l++){
            if(resolvefail.test(lines[l])){
              fs.writeFileSync(treeRoot+'/nb__.resolve.FAIL','',{
                encoding  : 'utf8',
                mode      : '0600',
                flag      : 'w'
              });
              break;
            }
          }
          if(!fs.existsSync(treeRoot+'/nb__.resolve.FAIL')){
            fs.writeFileSync(treeRoot+'/nb__.resolve.PASS','',{
              encoding  : 'utf8',
              mode      : '0600',
              flag      : 'w'
            });
          }
        }
        if(fs.existsSync(treeRoot+'/nb__.resolve.FAIL')){
          console.log(loginit()+treeRoot+' resolve fail');
          child_process.execSync('echo "<html><body><h3>Hi benpeng</h3><h4>Regression resolve fail.</h4><h4><a href="http://logviewer-atl/'+treeRoot+'">Find Details here</a></h4></body></html>" | mutt  Benny.Peng@amd.com  -e \'set content_type="text/html"\' -s [NBIF][regression][isOfficial:'+inputs_local.isOfficial+'][isBAPU:'+inputs_local.isBAPU+'][codeline:'+inputs_local.codeline+'][branch_name:'+inputs_local.branch_name+'][changelist:'+inputs_local.changelist+'][shelve:'+inputs_local.shelve+'][RESOLVEFAIL]');//FIXME should come from configuration_id
        }
        else if(fs.existsSync(treeRoot+'/nb__.resolve.PASS')){
          console.log(loginit()+treeRoot+' resolve pass');
          child_process.execSync('echo "<html><body><h3>Hi benpeng</h3><h4>Regression resolve pass.</h4><h4><a href="http://logviewer-atl/'+treeRoot+'">Find Details here</a></h4></body></html>" | mutt  Benny.Peng@amd.com  -e \'set content_type="text/html"\' -s [NBIF][regression][isOfficial:'+inputs_local.isOfficial+'][isBAPU:'+inputs_local.isBAPU+'][codeline:'+inputs_local.codeline+'][branch_name:'+inputs_local.branch_name+'][changelist:'+inputs_local.changelist+'][shelve:'+inputs_local.shelve+'][describe:'+inputs_local.describe+'][RESOLVEPASS]');//FIXME should come from configuration_id
          let passon  = JSON.parse(JSON.stringify(inputs_local));
          await sails.helpers.compile.with(passon);
        }
      });
    }
  }


};

