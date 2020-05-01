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
let variants        = ['nbif_nv10_gpu','nbif_draco_gpu','nbif_et_0','nbif_et_1','nbif_et_2'];
let kinds           = ['test','task'];
let tests           = ['demo_test_0','demo_test_1','demo_test_2'];
let tasks           = ['dcelab'];
let MASK            = {};
for(let v=0;v<variants.length;v++){
  MASK[variants[v]]={};
  for(let k=0;k<kinds.length;k++){
    MASK[variants[v]][kinds[k]]={};
    if(kinds[k]=='test'){
      for(let t=0;t<tests.length;t++){
        MASK[variants[v]][kinds[k]][tests[t]]='yes';
      }
    }
    if(kinds[k]=='task'){
      for(let t=0;t<tasks.length;t++){
        MASK[variants[v]][kinds[k]][tasks[t]]='yes';
      }
    }
  }
}//TODO
console.log(loginit()+JSON.stringify(MASK));
let djregxfail      = /dj exited with errors/;
let djregxpass      = /dj exited successfully/;
let syncregxpass    = /All syncs OK/;
let resolvefail     = /resolve skipped/;
let HOME            = '/proj/cip_nbif_regress1/sanitycheck';
let refTrees        = [HOME+'/nbif.ref.main'];
let maxPS_CL        = 20;
let maxPS_SH        = 20;//TODO
let maxPSperson_SH  = 3;//TODO
let runningtasks_CL = 0;
let runningtasks_SH = 0;
let tasktype;
let params;
let act;
let PS  = {};
let cron_check      = new cronJob('*/10 * * * * *',async function(){
  let pickedupitem = 'NA';
  let R;
  let N;
  let K;

  ////////////////////////////////////////////////////////////
  //Getting items to be killed
  ////////////////////////////////////////////////////////////
  
  //shelve kill
  K = await Sanityshelves.find({
    result  : 'TOKILL'
  });
  if(K.length ==  0){
    console.log(loginit()+'no shelves to kill');
  }
  else{
    for(let k=0;k<K.length;k++){
      if(PS['shelvecheck'].hasOwnProperty(K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve)){
        if(PS['shelvecheck'][K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve].length==0){
          console.log(loginit()+'shelve '+K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve+' nothing to kill and cleaning potential disk');
          child_process.exec('rm -rf '+K[k].resultlocation,function(err1,stdout1,stderr1){
            await Sanityshelves.update({
              codeline    : K[k].codeline,
              branch_name : K[k].branch_name,
              shelve      : K[k].shelve
            },{
              result      : 'KILLED'
            });
          });
          delete PS['shelvecheck'][K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve];
          await Sanityshelves.update({
            codeline    : K[k].codeline,
            branch_name : K[k].branch_name,
            shelve      : K[k].shelve
          },{
            result      : 'KILLING'
          });
        }
        else{
          for(let p=0;p<PS['shelvecheck'][K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve].length;p++){
            await Sanityshelves.update({
              codeline    : K[k].codeline,
              branch_name : K[k].branch_name,
              shelve      : K[k].shelve
            },{
              result      : 'KILLING'
            });
            PS['shelvecheck'][K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve][p].kill();
          }
          delete PS['shelvecheck'][K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve];
          child_process.exec('rm -rf '+K[k].resultlocation,function(err1,stdout1,stderr1){
            console.log(loginit()+'shelve '+K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve+' killed');
            await Sanityshelves.update({
              codeline    : K[k].codeline,
              branch_name : K[k].branch_name,
              shelve      : K[k].shelve
            },{
              result      : 'KILLED'
            });
          });
        }
      }
      else{
        console.log(loginit()+'shelve '+K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve+' nothing to kill');
        await Sanityshelves.update({
          codeline    : K[k].codeline,
          branch_name : K[k].branch_name,
          shelve      : K[k].shelve
        },{
          result      : 'KILLED'
        });
      }
    }
  }
  //changelist kill
  //TODO
  //==========================================================
  //Getting items to be killed
  //==========================================================


  ////////////////////////////////////////////////////////////
  //Getting not started shelves/changelists
  ////////////////////////////////////////////////////////////
  if(tasktype =='shelvecheck'){
    N=await Sanityshelves.find({
      result  : 'NOTSTARTED'
    });
  }
  if(tasktype =='changelistcheck'){
    N=await Sanitychangelists.find({
      result  : 'NOTSTARTED'
    });
  }
  console.log(loginit()+' NOTSTARTED : '+JSON.stringify(N));
  //==========================================================
  //Getting running shelves/changelists
  //==========================================================
  
  ////////////////////////////////////////////////////////////
  //Getting running shelves/changelists
  ////////////////////////////////////////////////////////////
  if(tasktype =='shelvecheck'){
    R=await Sanityshelves.find({
      result  : 'RUNNING'
    });
  }
  if(tasktype =='changelistcheck'){
    R=await Sanitychangelists.find({
      result  : 'RUNNING'
    });
  }
  console.log(loginit()+' RUNNING: '+JSON.stringify(R));
  //==========================================================
  //Getting not started shelves/changelists
  //==========================================================

  ////////////////////////////////////////////////////////////
  //Checking if need to take action
  ////////////////////////////////////////////////////////////
  if(N.length ==  0 ){
    console.log(loginit()+'Nothing to run');
    return;
  }
  if(tasktype =='shelvecheck'){
    if(R.length>=maxPS_CL){
      console.log(loginit()+'Too many running');
      return;
    }
    if(R.length > 0){
      for(let n=0;n<N.length;n++){
        let Rp  = await Sanityshelves.find({
          result    : 'RUNNING',
          username  : N[n].username
        });
        if(Rp.length>=maxPSperson_SH){
          console.log(loginit()+N[n].username+' personal max reached');
          return;
        }
        else{
          pickedupitem  = N[n];
          break;
        }
      }
      if(pickedupitem == 'NA'){
        return;
      }
    }
  }
  if(tasktype =='changelistcheck'){
    if(R.length>=maxPS_CL){
      console.log(loginit()+'Too many overall running');
      return;
    }
  }
  
  //==========================================================
  //Checking if need to take action
  //==========================================================
  
  ////////////////////////////////////////////////////////////
  //Prepare parameters
  ////////////////////////////////////////////////////////////
  let treeRoot  = HOME+'/'+tasktype+'.';
  let itemID;
  if(tasktype =='shelvecheck'){
    itemID  = pickedupitem.codeline+'_'+pickedupitem.branch_name+'_'+pickedupitem.shelve;
    treeRoot  +=  itemID;
    await Sanityshelves.update({
      codeline    : pickedupitem.codeline,
      branch_name : pickedupitem.branch_name,
      shelve      : pickedupitem.shelve
    },{
      result      : 'RUNNING',
      resultlocation  : treeRoot
    });
    PS[tasktype][itemID]=[];
  }
  if(tasktype =='changelistcheck'){
    itemID  = pickedupitem.codeline+'_'+pickedupitem.branch_name+'_'+pickedupitem.changelist;
    treeRoot  +=  itemID;
    await Sanitychangelists.update({
      codeline    : pickedupitem.codeline,
      branch_name : pickedupitem.branch_name,
      changelist  : pickedupitem.changelist
    },{
      result      : 'RUNNING',
      resultlocation  : treeRoot
    });
    PS[tasktype][itemID]=[];
  }
  //==========================================================
  //Prepare parameters
  //==========================================================

  ////////////////////////////////////////////////////////////
  //Prepare workspace
  ////////////////////////////////////////////////////////////
  if(fs.existsSync(treeRoot)){
    child_process.execSync('mv '+treeRoot+' '+treeRoot+'.rm');
    console.log(loginit()+treeRoot+'.rm cleaning');
    child_process.exec('rm -rf '+treeRoot+'.rm',function(err1,stdour1,stderr1){
      console.log(loginit()+treeRoot+'.rm clean done');
    });
  }
  child_process.execSync('mkdir -p '+treeRoot);
  console.log(loginit()+treeRoot+' created');
  //==========================================================
  //Prepare workspace
  //==========================================================
  
  
},null,false,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Sanitycheck',


  description: 'Sanitycheck something.',


  inputs: {
    tasktype  : {
      type    : 'string'
    },
    params    : {
      type    : 'string'
    },
    act       : {
      type    : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanitycheck');
    sails.log(inputs);
    tasktype  = inputs.tasktype;
    if(!PS.hasOwnProperty(tasktype)){
      //init the PS buffer
      PS[tasktype]  = {};
    }
    if(inputs.params){
      params    = JSON.parse(inputs.params);
    }
    act       = inputs.act;
    if(inputs.act ==  'start'){
      cron_check.start();
    }
    if(inputs.act ==  'stop'){
      cron_check.stop();
    }
    if(inputs.act ==  'kill'){
      //all PS kill
      let ID;
      if(tasktype =='shelvecheck'){
        ID  = params.codeline+'_'+params.branch_name+'_'+params.shelve;
      }
      if(tasktype =='changelistcheck'){
        ID  = params.codeline+'_'+params.branch_name+'_'+params.changelist;
      }
      if(PS[inputs.tasktype].hasOwnProperty(ID)){
        for(let p=0;p<PS[inputs.tasktype][ID].length;p++){
          PS[inputs.tasktype][ID][p].kill();
        }
        delete PS[inputs.tasktype][ID];
      }
      //remove all dirs
      child_process.execSync('mv '+params.treeRoot+' '+params.treeRoot+'.rm');
      child_process.exec('rm -rf '+params.treeRoot+'.rm',function(err1,stdou1,stderr1){
        console.log(loginit()+params.treeRoot+' cleaned due to kill');
      });
    }

    
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok'
    }));

  }


};
