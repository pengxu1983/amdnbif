let querystring     = require('querystring');
let http            = require('http');
let moment          = require('moment');
let process         = require('process');
let cronJob         = require("cron").CronJob;
let child_process   = require('child_process');
let fs              = require('fs');
let YAML            = require('yamljs');
let loginit         = function(){
  return '[LOG]['+moment().format('YYYY-MM-DD HH:mm:ss')+'] ';
};
let djregxfail      = /dj exited with errors/;
let djregxpass      = /dj exited successfully/;
let syncregxpass    = /All syncs OK/;
let resolvefail     = /resolve skipped/;
let HOME            = '/proj/cip_floyd_genz/benpeng';
let maxPS_CL        = 30;
let maxPS_SH        = 30;//TODO
let maxPSperson_SH  = 3;//TODO
let maxPSperson_CL  = 3;//TODO
let runningtasks_CL = 0;
let runningtasks_SH = 0;
let tasktype;
let params;
let act;
let runtimeout      = 60*5;//6 hrs
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
};
let cron_getchangelist  = new cronJob('*/20 * * * * *',async function(){
  //cron_getchangelist.stop();
  //sails.log('pickup');
  let dirs = child_process.execSync('cd '+HOME+' && ls -d reftree*',{
    encoding  : 'utf8'
  }).split('\n');
  dirs.pop();
  for(let d=0;d<dirs.length;d++){
    let treeRoot  = HOME+'/'+dirs[d];
    let lines = fs.readFileSync(treeRoot+'/configuration_id','utf8').split('\n');
    let regx  = /(\w+)\/(\w+)@(\d+)/;
    let codeline;
    let branch_name;
    lines[0].replace(regx,function(rs,$1,$2,$3){
      codeline  = $1;
      branch_name = $2;
    });
    let changes = child_process.execSync('cd '+treeRoot+' && /tool/pandora64/.package/perforce-2009.2/bin/p4 changes -m5 ...#head',{
      encoding  : 'utf8'
    }).split('\n');
    changes.pop();
    changes.reverse;
    let regx01  = /^Change (\d+) on (\d+\/\d+\/\d+) by (\w+)@/;
    for(let c=0;c<changes.length;c++){
      let username;
      let submitdate;
      let changelist;
      changes[c].replace(regx01,function(rs,$1,$2,$3){
        changelist  = $1;
        submitdate  = $2;
        username    = $3;
      });
      let DB  = await Summaryofsanity.find({
        codeline    : codeline,
        branch_name : branch_name,
        changelist  : changelist,
        shelve      : 'NA',
        describe    : 'default'
      });
      if(DB.length > 1){
        for(let c=0;c<DB.length-1;c++){
          await Summaryofsanity.destroy({
            id  : DB[c].id
          });
        }
      }
      else if(DB.length==1){
        //do nothing
      }
      else{
        await Summaryofsanity.create({
          codeline    : codeline,
          branch_name : branch_name,
          changelist  : changelist,
          shelve      : 'NA',
          username    : username,
          checktype   : 'changelistcheck',
          submitdate  : submitdate,
          result      : 'NOTSTARTED',
          describe    : 'default'
        });
      }
    }
  }
},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Changelistupload',


  description: 'Changelistupload something.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
