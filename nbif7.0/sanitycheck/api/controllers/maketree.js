let querystring     = require('querystring');
let http            = require('http');
let moment          = require('moment');
let process         = require('process');
let cronJob         = require("cron").CronJob;
let child_process   = require('child_process');
let fs              = require('fs');
let YAML            = require('yamljs');
let djregxfail      = /dj exited with errors/;
let djregxpass      = /dj exited successfully/;
let syncregxpass    = /All syncs OK/;
let resolvefail     = /resolve skipped/;
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
let synconetree = async function(onetree){
  console.log(loginit()+'making tree:');
  console.log(onetree);
  await Treesofsanity.update({
    treeRoot  : onetree.treeRoot
  },{
    treeStatus  : 'preparing',
    statusTime: moment().format('YYYY-MM-DD')
  });
  //create syncscript
  let syncscript  = onetree.treeRoot+'.syncscript';
  let synclog     = onetree.treeRoot+'.synclog';
  let text  = '';
  text  +=  '#!/tool/pandora64/bin/tcsh\n';
  text  +=  'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
  text  +=  'mkdir -p '+onetree.treeRoot+'\n';
  text  +=  'cd '+onetree.treeRoot+'\n';
  text  +=  'p4_mkwa -codeline '+onetree.codeline+' -branch_name '+onetree.branch_name+' |& tee '+synclog;
  fs.writeFileSync(syncscript,text,{
    encoding  : 'utf8',
    flag      : 'w',
    mode      : '0777'
  });
  //run syncscript
  child_process.exec(syncscript,{
    encoding  : 'utf8',
  },async function(err1,stdout1,stderr1){
    console.log(loginit()+onetree.treeRoot+' made with codeline:'+onetree.codeline+' branch_name:'+onetree.branch_name);
    let lines = fs.readFileSync(synclog,'utf8').split('\n');
    lines.pop();
    let syncresult  = 'broken';
    for(let l=0;l<lines.length;l++){
      if(syncregxpass.test(lines[l])){
        syncresult  = 'ready';
        break;
      }
    }
    await Treesofsanity.update({
      treeRoot  : onetree.treeRoot
    },{
      treeStatus: syncresult,
      statusTime: moment().format('YYYY-MM-DD')
    });
  });
};
let cron_maketree = new cronJob('*/10 * * * * *',async function(){
  let DB  = await Treesofsanity.find({
    treeStatus  : 'needtocreate'
  });
  if(DB.length  ==  0){
    return;
  }
  if(DB.length  >=  2){
    return;
  }
  if(fs.existsSync(DB[0].treeRoot)){
    child_process.exec('cd '+DB[0].treeRoot+' && /tool/pandora64/bin/p4 revert ...',{
      encoding  : 'utf8'
    },async function(err,stdout,stderr){
      child_process.execSync('mv '+DB[0].treeRoot+' '+DB[0].treeRoot+'.rm');
      child_process.exec('rm -rf '+DB[0].treeRoot+'.rm');
      synconetree(DB[0]);
    });
  }
  else{
    synconetree(DB[0]);
  }
},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Maketree',


  description: 'Maketree something.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
