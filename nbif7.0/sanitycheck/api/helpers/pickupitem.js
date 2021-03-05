let querystring     = require('querystring');
let http            = require('http');
let moment          = require('moment');
let process         = require('process');
let cronJob         = require("cron").CronJob;
let child_process   = require('child_process');
let fs              = require('fs');
let YAML            = require('yamljs');
let path            = require('path');
let djregxfail      = /dj exited with errors/;
let djregxpass      = /dj exited successfully/;
let syncregxpass    = /All syncs OK/;
let resolvefail     = /resolve skipped/;
let HOME            = '/proj/cip_floyd_genz/benpeng';
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
};
let processoneitem    = async function(item){
  console.log(loginit()+'processoneitem');
  console.log(item);
  child_process.execSync('sleep 10s');
};
let cron_cl  = new cronJob('*/10 * * * * *',async function(){
  //calculate how many branches need to be considered
  let branches  = [];
  let R = child_process.execSync('ls '+HOME+'/reftree*',{
    encoding  : 'utf8'
  }).split('\n');
  R.pop();
  let regx  = /reftree.(\w+).(\w+)/;
  for(let b=0;b<R.length;b++){
    R[b].replace(regx,function(rs,$1,$2){
      //console.log($1);
      //console.log($2);
      branches.push({
        codeline    : $1,
        branch_name : $2
      });
    });
  }
  //console.log(loginit()+'branches numbers :'+branches.length)
  let items = [];
  for(let branch=0;branch<branches.length;branch++){
    //find how many item need to be checked
    let R = await Summaryofsanity.find({
      codeline    : branches[branch].codeline,
      branch_name : branches[branch].branch_name,
      //checktype   : 'changelistcheck',
      result      : 'NOTSTARTED'
    });
    //pick up one
    if(R.length ==  0){
      continue;
    }
    let item  = R[0];
    console.log('item');
    console.log(item);
    //find if trees are available
    let validtrees  = await Treesofsanity.find({
      codeline    : branches[branch].codeline,
      branch_name : branches[branch].branch_name,
      treeStatus  : 'ready'
    });
    if(validtrees.length  ==  0 ){
      console.log('notree');
      continue;
    }
    console.log('tree');
    console.log(validtrees[0]);
    //pickup the tree and mark it as working
    let orgtime = new moment(validtrees[0].statusTime);
    let nowtime = new moment();
    let during  = moment.duration(nowtime.diff(orgtime)).as('days').toFixed(0);
    console.log(loginit()+'tree age : '+during+' days');
    if(during >= 7){
      console.log(loginit()+'need to resync this tree');
      await Treesofsanity.update({
        treeRoot  : validtrees[0].treeRoot
      },{
        treeStatus  : 'needtocreate',
        statusTime  : moment().format('YYYY-MM-DD')
      });
    }
    //await Treesofsanity.update({
    //  treeRoot  : validtrees[0].treeRoot
    //},{
    //  treeStatus  : 'working',
    //});
    //DONOT update time here because we need to confirm if this tree need to be 
  }
},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Pickupitem',


  description: 'Pickupitem something.',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // TODO
  }


};

