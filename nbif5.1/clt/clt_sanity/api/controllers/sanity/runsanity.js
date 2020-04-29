let querystring     = require('querystring');
let http            = require('http');
let moment          = require('moment');
let process         = require('process');
let cronJob         = require("cron").CronJob;
let child_process   = require('child_process');
let fs              = require('fs');
let bsub1Gcln       = 'bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_cln -R "rusage[mem=1000] select[type==RHEL7_64]" ';
let bsub1Gsy        = 'bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_sy -R "rusage[mem=1000] select[type==RHEL7_64]" ';
let bsub5Grn        = 'bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_rn -R "rusage[mem=5000] select[type==RHEL7_64]" ';
let bsub30Grn       = 'bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_rn -R "rusage[mem=30000] select[type==RHEL7_64]" ';
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
let HOME            = '/proj/cip_nbif_regress1/sanitychangelistcheck';
let refTrees        = [HOME+'/nbif.ref.main'];
let maxPS_CL        = 20;
let maxPS_SH        = 20;//TODO
let maxPSperson_SH  = 3;//TODO
let runningtasks_CL = 0;
let runningtasks_SH = 0;
let checkifdone     = function(treeRoot,stat){
  let mailbody  = '';
  let overallstatus = 'PASS';
  let finishednumber  = 0;
  for(let variantname in MASK){
    for(let kind  in  MASK[variantname]){
      for(let taskname in MASK[variantname][kind]){
        if(MASK[variantname][kind][taskname]=='yes'){
          if(stat[variantname][kind][taskname]  ==  ''){
            overallstatus = 'NOTDONE';
          }
          else{
            finishednumber++;
          }
        }
      }
    }
  }
  if(overallstatus  ==  'NOTDONE'){
    console.log(loginit()+treeRoot+' check not done');
  }
  else{
    let regx  = /FAIL/;
    console.log(loginit()+treeRoot+' check done');
    for(let variantname in MASK){
      mailbody += 'Variant:'+variantname+'\n';
      for(let kind  in  MASK[variantname]){
        mailbody += '  Kind:'+kind+'\n';
        for(let taskname in MASK[variantname][kind]){
          if(MASK[variantname][kind][taskname]=='yes'){
            if(regx.test(stat[variantname][kind][taskname])){
              mailbody += '    Task:'+taskname+':FAIL\n';
              overallstatus = 'FAIL';
            }
            if(stat[variantname][kind][taskname]=='RUNPASS'){
              mailbody += '    Task:'+taskname+':PASS\n';
            }
          }
        }
      }
    }
  }
  fs.writeFileSync(treeRoot+'/report',mailbody,{
    encoding  : 'utf8',
    mode      : '0600',
    flag      : 'w'
  });
  if(overallstatus  ==  'PASS'){
    child_process.execSync('mv '+treeRoot+' '+treeRoot+'.rm');
    child_process.exec('bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_cln -R "rusage[mem=1000] select[type==RHEL7_64]" rm -rf '+treeRoot+'.rm',function(err,stdout,stderr){
      console.log(loginit()+treeRoot+' cleaned done');
    });
    console.log(loginit()+'sending email');
    child_process.exec('mutt Benny.Peng@amd.com -s [NBIF][SanityCheck]['+overallstatus+'][treeRoot:'+treeRoot+'] < '+treeRoot+'/report',function(err,stdout,stderr){
      console.log(loginit()+'email done');
    });
  }
  if(overallstatus  ==  'FAIL'){
    console.log(loginit()+'sending email');
    child_process.exec('mutt Benny.Peng@amd.com -s [NBIF][SanityCheck]['+overallstatus+'][treeRoot:'+treeRoot+'] < '+treeRoot+'/report',function(err,stdout,stderr){
      console.log(loginit()+'email done');
    });
    setTimeout(function(){
      let reverttext  = '';
      reverttext  +=  '#!/tool/pandora64/bin/tcsh\n';
      reverttext  +=  'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
      reverttext  +=  'cd '+treeRoot+'\n';
      reverttext  +=  'p4 revert ...\n'
      fs.writeFileSync(treeRoot+'.revert.script',reverttext,{
        encoding  : 'utf8',
        mode      : '0700',
        flag      : 'w'
      });
      child_process.execSync(treeRoot+'.revert.script');
      child_process.execSync('mv '+treeRoot+' '+treeRoot+'.rm');
      child_process.execSync('rm -rf '+treeRoot+'.*.log');
      child_process.execSync('rm -rf '+treeRoot+'.*.script');
      child_process.exec('bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_cln -R "rusage[mem=1000] select[type==RHEL7_64]" rm -rf '+treeRoot+'.rm');
    },24*3600*1000);
  }
  console.log(loginit()+treeRoot+' finished number is '+finishednumber);
  return  overallstatus;
};
module.exports = {


  friendlyName: 'Runsanity',


  description: 'Runsanity sanity.',


  inputs: {
    //codeline    : {
    //  type      : 'string'
    //},
    //branch_name : {
    //  type      : 'string'
    //},
    //changelist  : {
    //  type      : 'string'
    //},
    //shelve      : {
    //  type      : 'string'
    //},
    kind        : {
      type      : 'string'
    },
    //username    : {
    //  type      : 'string'
    //},
    MASK        : {
      type      : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/sanity/runsanity');
    sails.log(inputs);
    //get one changelist
    let CLDB        = await Sanitychangelists.find({
      result      : 'NOTSTARTED'
    });
    let SHDB        = await Sanityshelves.find({
      result      : 'NOTSTARTED'
    });
    //sails.log(CLDB);
    //sails.log(SHDB);
    if(inputs.kind  ==  'changelistcheck'){
      if(CLDB.length==0){
        return exits.success(JSON.stringify({
          ok  : 'ok',
          msg : 'no changelist'
        }));
      }
      if(runningtasks_CL  >=  maxPS_CL){
        return exits.success(JSON.stringify({
          ok  : 'ok',
          msg : 'exceeding max PS'
        }));
      }
    }
    if(inputs.kind  ==  'shelvecheck'){
      if(SHDB.length==0){
        return exits.success(JSON.stringify({
          ok  : 'ok',
          msg : 'no shelve'
        }));
      }
      if(runningtasks_SH  >=  maxPS_SH){
        return exits.success(JSON.stringify({
          ok  : 'ok',
          msg : 'exceeding max PS'
        }))
      }
    }//TODO shelvecheck not done
    let changelist;
    let shelve;
    let username;
    let codeline;
    let branch_name;
    
    //prepare parameters
    let treeRoot;
    if(inputs.kind  ==  'shelvecheck'){
      username      = SHDB[0].username;
      codeline      = SHDB[0].codeline;
      branch_name   = SHDB[0].branch_name;
      shelve        = SHDB[0].shelve;
      treeRoot      = HOME+'/'+codeline+'.'+branch_name+'.SH.'+shelve;
      await Sanityshelves.update({
        codeline    : codeline,
        branch_name : branch_name,
        shelve      : shelve
      },{
        result      : 'RUNNING',
        resultlocation  : treeRoot
      });
      runningtasks_SH++;
      console.log(loginit()+'runningtasks_SH is now '+runningtasks_SH);
      console.log(loginit()+'runningtasks_CL is now '+runningtasks_CL);
    }
    if(inputs.kind  ==  'changelistcheck'){
      username      = CLDB[0].username;
      codeline      = CLDB[0].codeline;
      branch_name   = CLDB[0].branch_name;
      changelist    = CLDB[0].changelist;
      treeRoot      = HOME+'/'+codeline+'.'+branch_name+'.CL.'+changelist;
      await Sanitychangelists.update({
        codeline    : codeline,
        branch_name : branch_name,
        changelist  : changelist
      },{
        result      : 'RUNNING',
        resultlocation  : treeRoot
      });
      runningtasks_CL++;
      console.log(loginit()+'runningtasks_SH is now '+runningtasks_SH);
      console.log(loginit()+'runningtasks_CL is now '+runningtasks_CL);
    }
    if(inputs.MASK){
      MASK  = JSON.parse(inputs.MASK);
    }
    let stat={};
    //init stat
    for(let variantname in MASK){
      stat[variantname]={};
      for(let kind  in  MASK[variantname]){
        stat[variantname][kind]={};
        for(let taskname in MASK[variantname][kind]){
          if(MASK[variantname][kind][taskname]=='yes'){
            stat[variantname][kind][taskname]='';
          }
        }
      }
    }
    //clean up work space
    if(fs.existsSync(treeRoot)){
      console.log(loginit()+treeRoot+'.rm cleaning');
      child_process.execSync('mv '+treeRoot+' '+treeRoot+'.rm');
      child_process.execSync('rm -rf '+treeRoot+'.*.script');
      child_process.execSync('rm -rf '+treeRoot+'.*.log');
      child_process.exec('bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_cln -R "rusage[mem=1000] select[type==RHEL7_64]" '+'rm -rf '+treeRoot+'.rm',async function(err1,stdout1,stderr1){
        if(err1){
          console.log(loginit()+treeRoot+' '+err1);
        }
        console.log(loginit()+treeRoot+'.rm cleaned ');
      });
    }
    child_process.execSync('mkdir -p '+treeRoot);
    console.log(loginit()+treeRoot+' workspace made');
    //sync tree
    ////sync script
    let synctext  = '';
    synctext += '#!/tool/pandora64/bin/tcsh\n';
    synctext += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
    synctext += 'cd '+treeRoot+'\n';
    synctext += 'p4_mkwa -codeline '+codeline+' -branch_name '+branch_name;
    if(inputs.kind  ==  'changelistcheck'){
      synctext  +=  ' -cl '+changelist;
    }
    if(inputs.kind  ==  'shelvecheck'){
    }
    synctext  +=  '> '+treeRoot+'.sync.log\n';
    fs.writeFileSync(treeRoot+'.sync.script',synctext,{
      encoding  : 'utf8',
      mode      : '0700',
      flag      : 'w'
    });
    console.log(loginit()+treeRoot+' sync script made');
    ////sync begin
    let syncstarttime = new moment();
    //child_process.execSync('bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_sy -R "rusage[mem=1000] select[type==RHEL7_64]" '+treeRoot+'.sync.script');
    console.log(loginit()+treeRoot+' sync start');
    //child_process.exec('bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_sy -R "rusage[mem=1000] select[type==RHEL7_64]" '+treeRoot+'.sync.script',async function(err2,stdout2,stderr2){
    child_process.exec(treeRoot+'.sync.script',async function(err2,stdout2,stderr2){
      let syncendtime = new moment();
      console.log(loginit()+treeRoot+' sync done');
      console.log(loginit()+treeRoot+' sync cost '+moment.duration(syncendtime.diff(syncstarttime)).as('minutes')+' minutes');
      if(!fs.existsSync(treeRoot+'.sync.log')){
        console.log(loginit()+treeRoot+' sync fail');
        fs.writeFileSync(treeRoot+'/nb__.sync.FAIL','',{
          encoding  : 'utf8',
          mode      : '0600',
          flag      : 'w'
        });
        for(let variantname in MASK){
          for(let kind  in  MASK[variantname]){
            for(let taskname in MASK[variantname][kind]){
              if(MASK[variantname][kind][taskname]=='yes'){
                console.log(loginit()+treeRoot+' '+variantname+' '+kind+' '+taskname+' run fail');
                console.log(loginit()+treeRoot+' '+variantname+' '+kind+' '+taskname+' sync fail');
                fs.writeFileSync(treeRoot+'/result.'+variantname+'.'+kind+'.'+taskname+'.SYNCFAIL','',{
                  encoding  : 'utf8',
                  mode      : '0600',
                  flag      : 'w'
                });
                stat[variantname][kind][taskname]='SYNCFAIL';
                console.log(loginit()+treeRoot+' stat is '+ JSON.stringify(stat));
                let R = checkifdone(treeRoot,stat);
                if(R  ==  'NOTDONE'){
                }
                else{
                  if(inputs.kind  ==  'changelistcheck'){
                    await Sanitychangelists.update({
                      changelist  : changelist,
                      codeline    : codeline,
                      branch_name : branch_name
                    },{
                      result      : R,
                      details     : JSON.stringify(stat)
                    });
                    runningtasks_CL--;
                  }
                  if(inputs.kind  ==  'shelvecheck'){
                    await Sanityshelves.update({
                      shelve      : shelve,
                      codeline    : codeline,
                      branch_name : branch_name
                    },{
                      result      : R,
                      details     : JSON.stringify(stat)
                    });
                    runningtasks_SH--;
                  }
                  console.log(loginit()+treeRoot+' DB update');
                  console.log(loginit()+'runningtasks_SH is now '+runningtasks_SH);
                  console.log(loginit()+'runningtasks_CL is now '+runningtasks_CL);
                }
                //check result
              }
            }
          }
        }
      }
      else{
        let lines = fs.readFileSync(treeRoot+'.sync.log','utf8').split('\n');
        lines.pop();
        for(let l=0;l<lines.length;l++){
          if(syncregxpass.test(lines[l])){
            console.log(loginit()+treeRoot+' sync pass');
            fs.writeFileSync(treeRoot+'/nb__.sync.PASS','',{
              encoding  : 'utf8',
              mode      : '0600',
              flag      : 'w'
            });
            break;
          }
        }
        if(!fs.existsSync(treeRoot+'/nb__.sync.PASS')){
          console.log(loginit()+treeRoot+' sync fail');
          fs.writeFileSync(treeRoot+'/nb__.sync.FAIL','',{
            encoding  : 'utf8',
            mode      : '0600',
            flag      : 'w'
          });
        }
        if(fs.existsSync(treeRoot+'/nb__.sync.FAIL')){
          //sync fail
          for(let variantname in MASK){
            for(let kind  in  MASK[variantname]){
              for(let taskname in MASK[variantname][kind]){
                if(MASK[variantname][kind][taskname]=='yes'){
                  console.log(loginit()+treeRoot+' '+variantname+' '+kind+' '+taskname+' run fail');
                  console.log(loginit()+treeRoot+' '+variantname+' '+kind+' '+taskname+' sync fail');
                  fs.writeFileSync(treeRoot+'/result.'+variantname+'.'+kind+'.'+taskname+'.SYNCFAIL','',{
                    encoding  : 'utf8',
                    mode      : '0600',
                    flag      : 'w'
                  });
                  stat[variantname][kind][taskname]='SYNCFAIL';
                  console.log(loginit()+treeRoot+' stat is '+ JSON.stringify(stat));
                  let R = checkifdone(treeRoot,stat);
                  if(R  ==  'NOTDONE'){
                  }
                  else{
                    if(inputs.kind  ==  'changelistcheck'){
                      await Sanitychangelists.update({
                        changelist  : changelist,
                        codeline    : codeline,
                        branch_name : branch_name
                      },{
                        result      : R,
                        details     : JSON.stringify(stat)
                      });
                      runningtasks_CL--;
                    }
                    if(inputs.kind  ==  'shelvecheck'){
                      await Sanityshelves.update({
                        shelve      : shelve,
                        codeline    : codeline,
                        branch_name : branch_name
                      },{
                        result      : R,
                        details     : JSON.stringify(stat)
                      });
                      runningtasks_SH--;
                    }
                    console.log(loginit()+treeRoot+' DB update');
                    console.log(loginit()+'runningtasks_SH is now '+runningtasks_SH);
                    console.log(loginit()+'runningtasks_CL is now '+runningtasks_CL);
                  }
                  //check result
                }
              }
            }
          }
        }
        if(fs.existsSync(treeRoot+'/nb__.sync.PASS')){
          //sync pass
          //resolve start
          let resolvetext = '';
          resolvetext += '#!/tool/pandora64/bin/tcsh\n';
          resolvetext += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
          if(inputs.kind  ==  'shelvecheck'){
            resolvetext += 'cd '+treeRoot+'\n';
            resolvetext += 'bootenv\n';
            resolvetext += 'p4w unshelve -s '+shelve+'\n';
            resolvetext += 'p4w sync_all\n';
            resolvetext += 'p4w resolve -am\n';
          }
          
          fs.writeFileSync(treeRoot+'.resolve.script',resolvetext,{
            encoding  : 'utf8',
            mode      : '0700',
            flag      : 'w'
          });
          let resolvestarttime  = new moment();
          console.log(loginit()+treeRoot+' resolve start');
          child_process.exec(treeRoot+'.resolve.script > '+treeRoot+'/nb__.resolve.log',async function(err3,stdout3,stderr3){
            console.log(loginit()+treeRoot+' resolve done');
            let resolveendtime  = new moment();
            console.log(loginit()+treeRoot+' resolve cost '+moment.duration(resolveendtime.diff(resolvestarttime)).as('minutes')+' minutes');
            if(err3){
              console.log(loginit()+treeRoot+' resolve fail')
              console.log(loginit()+err3);
              fs.writeFileSync(treeRoot+'/nb__.resolve.FAIL','',{
                encoding  : 'utf8',
                mode      : '0600',
                flag      : 'w'
              });
              //for(let variantname in MASK){
              //  for(let kind  in  MASK[variantname]){
              //    for(let taskname in MASK[variantname][kind]){
              //      if(MASK[variantname][kind][taskname]=='yes'){
              //        console.log(loginit()+treeRoot+' '+variantname+' '+kind+' '+taskname+' run fail');
              //        console.log(loginit()+treeRoot+' '+variantname+' '+kind+' '+taskname+' resolve fail');
              //        fs.writeFileSync(treeRoot+'/result.'+variantname+'.'+kind+'.'+taskname+'.RESOLVEFAIL','',{
              //          encoding  : 'utf8',
              //          mode      : '0600',
              //          flag      : 'w'
              //        });
              //        stat[variantname][kind][taskname]='RESOLVEFAIL';
              //        console.log(loginit()+treeRoot+' stat is '+ JSON.stringify(stat));
              //        let R = checkifdone(treeRoot,stat);
              //        if(R  ==  'NOTDONE'){
              //        }
              //        else{
              //          if(inputs.kind  ==  'changelistcheck'){
              //            await Sanitychangelists.update({
              //              changelist  : changelist,
              //              codeline    : codeline,
              //              branch_name : branch_name
              //            },{
              //              result      : R,
              //              details     : JSON.stringify(stat)
              //            });
              //            runningtasks_CL--;
              //          }
              //          if(inputs.kind  ==  'shelvecheck'){
              //            await Sanityshelves.update({
              //              shelve      : shelve,
              //              codeline    : codeline,
              //              branch_name : branch_name
              //            },{
              //              result      : R,
              //              details     : JSON.stringify(stat)
              //            });
              //            runningtasks_SH--;
              //          }
              //          console.log(loginit()+treeRoot+' DB update');
              //          console.log(loginit()+'runningtasks_SH is now '+runningtasks_SH);
              //          console.log(loginit()+'runningtasks_CL is now '+runningtasks_CL);
              //        }
              //        //check result
              //      }
              //    }
              //  }
              //}
            }
            if(!fs.existsSync(treeRoot+'/nb__.resolve.log')){
              console.log(loginit()+treeRoot+' resolve fail');
              fs.writeFileSync(treeRoot+'/nb__.resolve.FAIL','',{
                encoding  : 'utf8',
                mode      : '0600',
                flag      : 'w'
              });
              //for(let variantname in MASK){
              //  for(let kind  in  MASK[variantname]){
              //    for(let taskname in MASK[variantname][kind]){
              //      if(MASK[variantname][kind][taskname]=='yes'){
              //        console.log(loginit()+treeRoot+' '+variantname+' '+kind+' '+taskname+' run fail');
              //        console.log(loginit()+treeRoot+' '+variantname+' '+kind+' '+taskname+' resolve fail');
              //        fs.writeFileSync(treeRoot+'/result.'+variantname+'.'+kind+'.'+taskname+'.RESOLVEFAIL','',{
              //          encoding  : 'utf8',
              //          mode      : '0600',
              //          flag      : 'w'
              //        });
              //        stat[variantname][kind][taskname]='RESOLVEFAIL';
              //        console.log(loginit()+treeRoot+' stat is '+ JSON.stringify(stat));
              //        let R = checkifdone(treeRoot,stat);
              //        if(R  ==  'NOTDONE'){
              //        }
              //        else{
              //          if(inputs.kind  ==  'changelistcheck'){
              //            await Sanitychangelists.update({
              //              changelist  : changelist,
              //              codeline    : codeline,
              //              branch_name : branch_name
              //            },{
              //              result      : R,
              //              details     : JSON.stringify(stat)
              //            });
              //            runningtasks_CL--;
              //          }
              //          if(inputs.kind  ==  'shelvecheck'){
              //            await Sanityshelves.update({
              //              shelve      : shelve,
              //              codeline    : codeline,
              //              branch_name : branch_name
              //            },{
              //              result      : R,
              //              details     : JSON.stringify(stat)
              //            });
              //            runningtasks_SH--;
              //          }
              //          console.log(loginit()+treeRoot+' DB update');
              //          console.log(loginit()+'runningtasks_SH is now '+runningtasks_SH);
              //          console.log(loginit()+'runningtasks_CL is now '+runningtasks_CL);
              //        }
              //        //check result
              //      }
              //    }
              //  }
              //}
            }
            else{
              let lines = fs.readFileSync(treeRoot+'/nb__.resolve.log','utf8').split('\n');
              lines.pop();
              for(let l=0;l<lines.length;l++){
                if(resolvefail.test(lines[l])){
                  console.log(loginit()+treeRoot+' resolve fail')
                  fs.writeFileSync(treeRoot+'/nb__.resolve.FAIL','',{
                    encoding  : 'utf8',
                    mode      : '0600',
                    flag      : 'w'
                  });
                  //for(let variantname in MASK){
                  //  for(let kind  in  MASK[variantname]){
                  //    for(let taskname in MASK[variantname][kind]){
                  //      if(MASK[variantname][kind][taskname]=='yes'){
                  //        console.log(loginit()+treeRoot+' '+variantname+' '+kind+' '+taskname+' run fail');
                  //        console.log(loginit()+treeRoot+' '+variantname+' '+kind+' '+taskname+' resolve fail');
                  //        fs.writeFileSync(treeRoot+'/result.'+variantname+'.'+kind+'.'+taskname+'.RESOLVEFAIL','',{
                  //          encoding  : 'utf8',
                  //          mode      : '0600',
                  //          flag      : 'w'
                  //        });
                  //        stat[variantname][kind][taskname]='RESOLVEFAIL';
                  //        console.log(loginit()+treeRoot+' stat is '+ JSON.stringify(stat));
                  //        let R = checkifdone(treeRoot,stat);
                  //        if(R  ==  'NOTDONE'){
                  //        }
                  //        else{
                  //          if(inputs.kind  ==  'changelistcheck'){
                  //            await Sanitychangelists.update({
                  //              changelist  : changelist,
                  //              codeline    : codeline,
                  //              branch_name : branch_name
                  //            },{
                  //              result      : R,
                  //              details     : JSON.stringify(stat)
                  //            });
                  //            runningtasks_CL--;
                  //          }
                  //          if(inputs.kind  ==  'shelvecheck'){
                  //            await Sanityshelves.update({
                  //              shelve      : shelve,
                  //              codeline    : codeline,
                  //              branch_name : branch_name
                  //            },{
                  //              result      : R,
                  //              details     : JSON.stringify(stat)
                  //            });
                  //            runningtasks_SH--;
                  //          }
                  //          console.log(loginit()+treeRoot+' DB update');
                  //          console.log(loginit()+'runningtasks_SH is now '+runningtasks_SH);
                  //          console.log(loginit()+'runningtasks_CL is now '+runningtasks_CL);
                  //        }
                  //        //check result
                  //      }
                  //    }
                  //  }
                  //}
                  break;
                }
              }
            }
            if(fs.existsSync(treeRoot+'/nb__.resolve.FAIL')){
              console.log(loginit()+treeRoot+' resolve FAIL');
              for(let variantname in MASK){
                for(let kind  in  MASK[variantname]){
                  for(let taskname in MASK[variantname][kind]){
                    if(MASK[variantname][kind][taskname]=='yes'){
                      console.log(loginit()+treeRoot+' '+variantname+' '+kind+' '+taskname+' run fail');
                      console.log(loginit()+treeRoot+' '+variantname+' '+kind+' '+taskname+' resolve fail');
                      fs.writeFileSync(treeRoot+'/result.'+variantname+'.'+kind+'.'+taskname+'.RESOLVEFAIL','',{
                        encoding  : 'utf8',
                        mode      : '0600',
                        flag      : 'w'
                      });
                      stat[variantname][kind][taskname]='RESOLVEFAIL';
                      console.log(loginit()+treeRoot+' stat is '+ JSON.stringify(stat));
                      let R = checkifdone(treeRoot,stat);
                      if(R  ==  'NOTDONE'){
                      }
                      else{
                        if(inputs.kind  ==  'changelistcheck'){
                          await Sanitychangelists.update({
                            changelist  : changelist,
                            codeline    : codeline,
                            branch_name : branch_name
                          },{
                            result      : R,
                            details     : JSON.stringify(stat)
                          });
                          runningtasks_CL--;
                        }
                        if(inputs.kind  ==  'shelvecheck'){
                          await Sanityshelves.update({
                            shelve      : shelve,
                            codeline    : codeline,
                            branch_name : branch_name
                          },{
                            result      : R,
                            details     : JSON.stringify(stat)
                          });
                          runningtasks_SH--;
                        }
                        console.log(loginit()+treeRoot+' DB update');
                        console.log(loginit()+'runningtasks_SH is now '+runningtasks_SH);
                        console.log(loginit()+'runningtasks_CL is now '+runningtasks_CL);
                      }
                      //check result
                    }
                  }
                }
              }
            }
            //if(!fs.existsSync(treeRoot+'/nb__.resolve.FAIL')){
            else{
              console.log(loginit()+treeRoot+' resolve pass')
              //resolve pass
              fs.writeFileSync(treeRoot+'/nb__.resolve.PASS','',{
                encoding  : 'utf8',
                mode      : '0600',
                flag      : 'w'
              });
              //run task
              for(let variantname in MASK){
                for(let kind  in  MASK[variantname]){
                  for(let taskname in MASK[variantname][kind]){
                    if(MASK[variantname][kind][taskname]=='yes'){
                    }
                  }
                }
              }
              //for(let variantname in MASK){
              //  for(let kind  in  MASK[variantname]){
              //    for(let taskname in MASK[variantname][kind]){
              //      if(MASK[variantname][kind][taskname]=='yes'){
              //        let runtext = '';
              //        runtext += '#!/tool/pandora64/bin/tcsh\n';
              //        runtext += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
              //        runtext += 'cd '+treeRoot+'\n';
              //        runtext += 'bootenv -v '+variantname+' -out_anchor '+treeRoot+'/out.'+variantname+'.'+kind+'.'+taskname+'\n';
              //        if(kind ==  'test'){
              //          runtext +='bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_rn -R "rusage[mem=5000] select[type==RHEL7_64]" dj -l '+treeRoot+'/nb__.'+variantname+'.run.'+taskname+'.log -DUVM_VERBOSITY=UVM_LOW -m4 -DUSE_VRQ -DCGM -DSEED=12345678 run_test -s nbiftdl '+taskname+'_nbif_all_rtl\n';
              //        }
              //        if(kind ==  'task'){
              //          switch (taskname) {
              //            case 'dcelab':
              //              if(variantname  ==  'nbif_draco_gpu'){
              //                runtext +='bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_rn -R "rusage[mem=30000] select[type==RHEL7_64]" '+"dj -l "+treeRoot+"/nb__."+variantname+".run."+taskname+".log"+" -e 'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)' -DPUBLISH_BLKS=nbif_shub_wrap_algfx\n";
              //              }
              //              if(variantname  ==  'nbif_nv10_gpu'){
              //                runtext +='bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_rn -R "rusage[mem=30000] select[type==RHEL7_64]" '+"dj -l "+treeRoot+"/nb__."+variantname+".run."+taskname+".log"+" -e 'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)' -DPUBLISH_BLKS=nbif_shub_wrap_gfx\n";
              //              }
              //              if(variantname  ==  'nbif_et_0'){
              //                runtext +='bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_rn -R "rusage[mem=30000] select[type==RHEL7_64]" '+"dj -l "+treeRoot+"/nb__."+variantname+".run."+taskname+".log"+" -e 'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)' -DPUBLISH_BLKS=nbif_shub_wrap_et_0\n";
              //              }
              //              if(variantname  ==  'nbif_et_1'){
              //                runtext +='bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_rn -R "rusage[mem=30000] select[type==RHEL7_64]" '+"dj -l "+treeRoot+"/nb__."+variantname+".run."+taskname+".log"+" -e 'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)' -DPUBLISH_BLKS=nbif_shub_wrap_et_1\n";
              //              }
              //              if(variantname  ==  'nbif_et_2'){
              //                runtext +='bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_rn -R "rusage[mem=30000] select[type==RHEL7_64]" '+"dj -l "+treeRoot+"/nb__."+variantname+".run."+taskname+".log"+" -e 'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)' -DPUBLISH_BLKS=nbif_shub_wrap_et_2\n";
              //              }
              //              break;
              //          }
              //        }
              //        fs.writeFileSync(treeRoot+'.'+variantname+'.run.'+taskname+'.script',runtext,{
              //          encoding  : 'utf8',
              //          mode      : '0700',
              //          flag      : 'w'
              //        });
              //        let taskstarttime = new moment();
              //        console.log(loginit()+treeRoot+' variant:'+variantname+' task:'+taskname+' run start');
              //        child_process.exec(treeRoot+'.'+variantname+'.run.'+taskname+'.script',async function(err4,stdout4,stderr4){
              //          let taskendtime = new moment();
              //          console.log(loginit()+treeRoot+' variant:'+variantname+' task:'+taskname+' run done');
              //          console.log(loginit()+treeRoot+' variant:'+variantname+' task:'+taskname+' run cost '+moment.duration(taskendtime.diff(taskstarttime)).as('minutes')+' minutes');
              //          if(err4){
              //            console.log(loginit()+treeRoot+' variant:'+variantname+' task:'+taskname+' run fail '+err4);
              //            fs.writeFileSync(treeRoot+'/result.'+variantname+'.'+kind+'.'+taskname+'.RUNFAIL','',{
              //              encoding  : 'utf8',
              //              mode      : '0600',
              //              flag      : 'w'
              //            });
              //            stat[variantname][kind][taskname]='RUNFAIL';
              //            console.log(loginit()+treeRoot+' '+JSON.stringify(stat));
              //            let R = checkifdone(treeRoot,stat);
              //            if(R  ==  'NOTDONE'){
              //            }
              //            else{
              //              if(inputs.kind  ==  'changelistcheck'){
              //                await Sanitychangelists.update({
              //                  changelist  : changelist,
              //                  codeline    : codeline,
              //                  branch_name : branch_name
              //                },{
              //                  result      : R,
              //                  details     : JSON.stringify(stat)
              //                });
              //                runningtasks_CL--;
              //              }
              //              if(inputs.kind  ==  'shelvecheck'){
              //                await Sanityshelves.update({
              //                  shelve      : shelve,
              //                  codeline    : codeline,
              //                  branch_name : branch_name
              //                },{
              //                  result      : R,
              //                  details     : JSON.stringify(stat)
              //                });
              //                runningtasks_SH--;
              //              }
              //              console.log(loginit()+treeRoot+' DB update');
              //              console.log(loginit()+'runningtasks_SH is now '+runningtasks_SH);
              //              console.log(loginit()+'runningtasks_CL is now '+runningtasks_CL);
              //            }
              //            //check result
              //          }
              //          let lines = fs.readFileSync(treeRoot+"/nb__."+variantname+".run."+taskname+".log",'utf8').split('\n');
              //          lines.pop();
              //          for(let l=0;l<lines.length;l++){
              //            if(djregxpass.test(lines[l])){
              //              console.log(loginit()+treeRoot+' variant:'+variantname+' task:'+taskname+' run pass');
              //              console.log(loginit()+treeRoot+'/out.'+variantname+'.'+kind+'.'+taskname+' is being cleaned');
              //              //child_process.exec('bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_cln -R "rusage[mem=1000] select[type==RHEL7_64]" rm -rf '+treeRoot+'/out.'+variantname+'.'+kind+'.'+taskname, async function(err5,stdout5,stderr5){//TODO not sure if need bsub
              //              child_process.exec('rm -rf '+treeRoot+'/out.'+variantname+'.'+kind+'.'+taskname, async function(err5,stdout5,stderr5){//TODO not sure if need bsub
              //                console.log(loginit()+treeRoot+'/out.'+variantname+'.'+kind+'.'+taskname+' is cleaned');
              //              });
              //              fs.writeFileSync(treeRoot+'/result.'+variantname+'.'+kind+'.'+taskname+'.RUNPASS','',{
              //                encoding  : 'utf8',
              //                mode      : '0600',
              //                flag      : 'w'
              //              });
              //              stat[variantname][kind][taskname]='RUNPASS';
              //              console.log(loginit()+treeRoot+' '+JSON.stringify(stat));
              //              let R = checkifdone(treeRoot,stat);
              //              if(R  ==  'NOTDONE'){
              //              }
              //              else{
              //                if(inputs.kind  ==  'changelistcheck'){
              //                  await Sanitychangelists.update({
              //                    changelist  : changelist,
              //                    codeline    : codeline,
              //                    branch_name : branch_name
              //                  },{
              //                    result      : R,
              //                    details     : JSON.stringify(stat)
              //                  });
              //                  runningtasks_CL--;
              //                }
              //                if(inputs.kind  ==  'shelvecheck'){
              //                  await Sanityshelves.update({
              //                    shelve      : shelve,
              //                    codeline    : codeline,
              //                    branch_name : branch_name
              //                  },{
              //                    result      : R,
              //                    details     : JSON.stringify(stat)
              //                  });
              //                  runningtasks_SH--;
              //                }
              //                console.log(loginit()+treeRoot+' DB update');
              //                console.log(loginit()+'runningtasks_SH is now '+runningtasks_SH);
              //                console.log(loginit()+'runningtasks_CL is now '+runningtasks_CL);
              //              }
              //              //check result
              //              break;
              //            }
              //            if(djregxfail.test(lines[l])){
              //              console.log(loginit()+treeRoot+' variant:'+variantname+' task:'+taskname+' run fail');
              //              fs.writeFileSync(treeRoot+'/result.'+variantname+'.'+kind+'.'+taskname+'.RUNFAIL','',{
              //                encoding  : 'utf8',
              //                mode      : '0600',
              //                flag      : 'w'
              //              });
              //              stat[variantname][kind][taskname]='RUNFAIL';
              //              console.log(loginit()+treeRoot+' '+JSON.stringify(stat));
              //              let R = checkifdone(treeRoot,stat);
              //              if(R  ==  'NOTDONE'){
              //              }
              //              else{
              //                if(inputs.kind  ==  'changelistcheck'){
              //                  await Sanitychangelists.update({
              //                    changelist  : changelist,
              //                    codeline    : codeline,
              //                    branch_name : branch_name
              //                  },{
              //                    result      : R,
              //                    details     : JSON.stringify(stat)
              //                  });
              //                  runningtasks_CL--;
              //                }
              //                if(inputs.kind  ==  'shelvecheck'){
              //                  await Sanityshelves.update({
              //                    shelve      : shelve,
              //                    codeline    : codeline,
              //                    branch_name : branch_name
              //                  },{
              //                    result      : R,
              //                    details     : JSON.stringify(stat)
              //                  });
              //                  runningtasks_SH--;
              //                }
              //                console.log(loginit()+treeRoot+' DB update');
              //                console.log(loginit()+'runningtasks_SH is now '+runningtasks_SH);
              //                console.log(loginit()+'runningtasks_CL is now '+runningtasks_CL);
              //              }
              //              //check result
              //              break;
              //            }
              //          }
              //          if(fs.existsSync(treeRoot+'/result.'+variantname+'.'+kind+'.'+taskname+'.RUNFAIL')){
              //          }
              //          else if(fs.existsSync(treeRoot+'/result.'+variantname+'.'+kind+'.'+taskname+'.RUNPASS')){
              //          }
              //          else{
              //            console.log(loginit()+treeRoot+' variant:'+variantname+' task:'+taskname+' run fail');
              //            fs.writeFileSync(treeRoot+'/result.'+variantname+'.'+kind+'.'+taskname+'.RUNFAIL','',{
              //              encoding  : 'utf8',
              //              mode      : '0600',
              //              flag      : 'w'
              //            });
              //            stat[variantname][kind][taskname]='RUNFAIL';
              //            console.log(loginit()+treeRoot+' '+JSON.stringify(stat));
              //            let R = checkifdone(treeRoot,stat);
              //            if(R  ==  'NOTDONE'){
              //            }
              //            else{
              //              if(inputs.kind  ==  'changelistcheck'){
              //                await Sanitychangelists.update({
              //                  changelist  : changelist,
              //                  codeline    : codeline,
              //                  branch_name : branch_name
              //                },{
              //                  result      : R,
              //                  details     : JSON.stringify(stat)
              //                });
              //                runningtasks_CL--;
              //              }
              //              if(inputs.kind  ==  'shelvecheck'){
              //                await Sanityshelves.update({
              //                  shelve      : shelve,
              //                  codeline    : codeline,
              //                  branch_name : branch_name
              //                },{
              //                  result      : R,
              //                  details     : JSON.stringify(stat)
              //                });
              //                runningtasks_SH--;
              //              }
              //              console.log(loginit()+treeRoot+' DB update');
              //              console.log(loginit()+'runningtasks_SH is now '+runningtasks_SH);
              //              console.log(loginit()+'runningtasks_CL is now '+runningtasks_CL);
              //            }
              //            //check result
              //          }
              //        });
              //      }
              //    }
              //  }
              //}
            }
          });
        }
      }
    });

    //run task
    return exits.success(JSON.stringify({
      ok  : 'ok',
      msg : 'new changelist'
    }));

  }


};
