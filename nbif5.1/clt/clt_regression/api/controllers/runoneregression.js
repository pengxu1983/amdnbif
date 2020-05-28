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
let djregxfail      = /dj exited with errors/;
let djregxpass      = /dj exited successfully/;
let syncregxpass    = /All syncs OK/;
let resolvefail     = /resolve skipped/;
let HOME            = '/proj/cip_nbif_regress1/regressions';
let refTrees        = [HOME+'/nbif.ref.main'];
let PS              = {};
let getemail        = function(username){
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


  friendlyName: 'Runoneregression',


  description: 'Runoneregression something.',


  inputs: {
    codeline  : {
      type    : 'string'
    },
    branch_name : {
      type    : 'string'
    },
    changelist  : {
      type    : 'string'
    },
    isOfficial  : {
      type    : 'string'
    },
    isBAPU      : {
      type    : 'string'
    },
    shelve      : {
      type    : 'string'
    },
    variantname : {
      type    : 'string'
    },
    grouplist   : {
      type    : 'string'
    },
    timeoutsingle : {
      type    : 'string'
    },
    timeoutall : {
      type    : 'string'
    },
    emailtarget : {
      type    : 'string'
    },
    projectname : {
      type    : 'string'
    },
    username    : {
      type    : 'string'
    },
    coverageswitch  : {
      type    : 'string'
    },
    action    : {
      type    : 'string'
    },
    kickoffdate : {
      type    : 'string'
    },
    treemaintain  : {
      type    : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/runoneregression');
    sails.log(inputs);
    console.log(loginit()+'regression starts');
    let treeRoot;
    let groups;
    let bsubids = [];
    let batchID = 1;
    if(inputs.isOfficial  ==  'no'){
      treeRoot  = HOME+'/regression.notofficial.'+inputs.codeline+'.'+inputs.branch_name+'.'+inputs.variantname+'.'+inputs.changelist;
      if(inputs.shelve=='NA'){
        treeRoot  +=  '.noshelve';
      }
      else{
        treeRoot  +=  '.'+inputs.shelve;
      }
      treeRoot  +=  '.'+inputs.kickoffdate;
    }
    while(1){
      if(fs.existsSync(treeRoot+'.'+batchID)){
        batchID++;
      }
      else{
        treeRoot  +=  '.'+batchID;
        break;
      }
    }
    ////////////////////////////////////////////////////////////
    //Clean up work space
    ////////////////////////////////////////////////////////////
    if(inputs.isOfficial=='no'){
      if(fs.existsSync(treeRoot)){
        console.log(loginit()+treeRoot+'.rm cleanning');
        child_process.execSync('mv '+treeRoot+' '+treeRoot+'.rm');
        child_process.execSync('rm -rf '+treeRoot+'.*.log');
        child_process.execSync('rm -rf '+treeRoot+'.*.script');
        child_process.exec('bsub -P GIONB-SRDC -q regr_high -Is -J nbif_R_cln -R "rusage[mem=1000] select[type==RHEL7_64]" rm -rf '+treeRoot+'.rm',function(err_cln,stdout_cln,stderr_cln){
          console.log(loginit()+treeRoot+'.rm clean done');
        });
      }
      child_process.execSync('mkdir -p '+treeRoot);
      console.log(loginit()+treeRoot+' created');
    }
    //==========================================================
    //Clean up work space
    //==========================================================

    ////////////////////////////////////////////////////////////
    //sync a tree
    ////////////////////////////////////////////////////////////
    let synctext  ='';
    synctext += '#!/tool/pandora64/bin/tcsh\n';
    synctext += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
    synctext += 'cd '+treeRoot+'\n';
    if(inputs.isOfficial=='no'){
      synctext += 'p4_mkwa -codeline '+inputs.codeline+' -branch_name '+inputs.branch_name;
      if(inputs.changelist  ==  'HEAD'){
        synctext += ' -cl '+inputs.changelist;
      }
    }
    synctext  +=  '> '+treeRoot+'.sync.log\n';
    synctext  +=  'p4 users > ~/p4users\n';
    console.log(loginit()+treeRoot+' sync script made');
    console.log(loginit()+treeRoot+' sync start');
    fs.writeFileSync(treeRoot+'.sync.script',synctext,{
      encoding  : 'utf8',
      mode      : '0700',
      flag      : 'w'
    });
    let syncstarttime = new moment();
    PS['sync']=child_process.exec(treeRoot+'.sync.script',async function(err_sync,stdout_sync,stderr_sync){
      if(PS.hasOwnProperty('sync')){
        delete PS['sync'];
      }
      let RG;
      RG  = await Regressiontasks.find({
        codeline    : inputs.codeline,
        branch_name : inputs.branch_name,
        changelist  : inputs.changelist,
        shelve      : inputs.shelve,
        username    : inputs.username,
        kickoffdate : inputs.kickoffdate,
        isOfficial  : inputs.isOfficial,
        isBAPU      : inputs.isBAPU
      });
      if(RG.length==0){
      }
      else if(RG.length>1){
      }
      else if((RG[0].result ==  'TOKILL')||(RG[0].result ==  'KILLED')||(RG[0].result ==  'KILLING')){
        if(PS.hasOwnProperty('sync')){
          delete PS['sync'];
        }
        console.log(loginit()+treeRoot+' kill');
        return;
      }//TODO
      let syncendtime = new moment();
      console.log(loginit()+treeRoot+' sync done');
      console.log(loginit()+treeRoot+' sync cost '+moment.duration(syncendtime.diff(syncstarttime)).as('minutes')+' minutes');
      if(!fs.existsSync(treeRoot+'.sync.log')){
        fs.writeFileSync(treeRoot+'/nb__.sync.FAIL','',{
          encoding  : 'utf8',
          mode      : '0600',
          flag      : 'w'
        });
      }
      else{
        let lines = fs.readFileSync(treeRoot+'.sync.log','utf8').split('\n');
        lines.pop();
        for(let l=0;l<lines.length;l++){
          if(syncregxpass.test(lines[l])){
            fs.writeFileSync(treeRoot+'/nb__.sync.PASS','',{
              encoding  : 'utf8',
              mode      : '0600',
              flag      : 'w'
            });
            break;
          }
        }
        if(!fs.existsSync(treeRoot+'/nb__.sync.PASS')){
          fs.writeFileSync(treeRoot+'/nb__.sync.FAIL','',{
            encoding  : 'utf8',
            mode      : '0600',
            flag      : 'w'
          });
        }
      }
      if(fs.existsSync(treeRoot+'/nb__.sync.FAIL')){
        console.log(loginit()+treeRoot+' sync fail');
        child_process.exec('echo "SYNCFAIL. This is probably due to rt_login failure. Please contact Benny.Peng@amd.com for help " | mutt '+getemail(inputs.username)+' -s [NBIF][Regression][notofficial][changelist:'+inputs.changelist+'][shelve:'+inputs.shelve+'][grouplist:'+inputs.grouplist+'][SYNCFAIL]');
      }
      else if(fs.existsSync(treeRoot+'/nb__.sync.PASS')){
        console.log(loginit()+treeRoot+' sync pass');
        child_process.exec('echo "SYNCPASS and flow starts to resolve" | mutt '+getemail(inputs.username)+' -s [NBIF][Regression][notofficial][changelist:'+inputs.changelist+'][shelve:'+inputs.shelve+'][grouplist:'+inputs.grouplist+'][SYNCPASS]');
        ////////////////////////////////////////////////////////////
        //unshelve and resolve
        ////////////////////////////////////////////////////////////
        let resolvetext='';
        resolvetext += '#!/tool/pandora64/bin/tcsh\n';
        resolvetext += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
        if(inputs.shelve!='NA'){
          resolvetext += 'cd '+treeRoot+'\n';
          resolvetext += 'bootenv\n';
          resolvetext += 'p4w unshelve -s '+inputs.shelve+'\n';
          resolvetext += 'p4w sync_all\n';
          resolvetext += 'p4w resolve -am\n';
        }
        fs.writeFileSync(treeRoot+'.resolve.script',resolvetext,{
          encoding  : 'utf8',
          mode      : '0700',
          flag      : 'w'
        });
        console.log(loginit()+treeRoot+' resolve script made');
        console.log(loginit()+treeRoot+' resolve start');
        let resolvestarttime  = new moment();
        child_process.exec(treeRoot+'.resolve.script > '+treeRoot+'/nb__.resolve.log',async function(err_rsl,stdout_rsl,stderr_rsl){
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
            //Send email
            child_process.exec('echo "Resolve fail Details http://logviewer-atl/'+treeRoot+'" | mutt '+getemail(inputs.username)+' -s [NBIF][Regression][notofficial][changelist:'+inputs.changelist+'][shelve:'+inputs.shelve+'][grouplist:'+inputs.grouplist+'][RESOLVEFAIL]');
            //clean up tree
            setTimeout(function(){
              child_process.execSync('cd '+treeRoot+' && /tool/pandora64/.package/perforce-2009.2/bin/p4 revert ...');
              child_process.execSync('rm -rf '+treeRoot+'.*.log');
              child_process.execSync('rm -rf '+treeRoot+'.*.script');
              child_process.execSync('mv '+treeRoot+' '+treeRoot+'.rm');
              child_process.exec('rm -rf '+treeRoot+'.rm ',function(){
                console.log(loginit()+treeRoot+' cleaned up due to RESOLVEFAIL');
              });
            },parseInt(inputs.treemaintain)*3600*1000);
          }
          else if(fs.existsSync(treeRoot+'/nb__.resolve.PASS')){
            console.log(loginit()+treeRoot+' resolve pass');
            child_process.exec('echo "Resolve pass and start to build" | mutt '+getemail(inputs.username)+' -s [NBIF][Regression][notofficial][changelist:'+inputs.changelist+'][shelve:'+inputs.shelve+'][grouplist:'+inputs.grouplist+'][RESOLVEPASS]');
            ////////////////////////////////////////////////////////////
            //get testlist
            ////////////////////////////////////////////////////////////
            let gettestlisttext = '';
            gettestlisttext += '#!/tool/pandora64/bin/tcsh\n';
            gettestlisttext += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
            gettestlisttext += 'cd '+treeRoot+'\n';
            gettestlisttext += 'bootenv -v '+inputs.variantname+' -out_anchor '+treeRoot+'/out.'+inputs.variantname+'.testlist\n';
            groups  = JSON.parse(inputs.grouplist);
            if(groups.length  ==  0){
              gettestlisttext += 'bsub -P GIONB-SRDC -q regr_high -Is -J nbif_R_tl -R "rusage[mem=5000] select[type==RHEL7_64]" dj -l '+treeRoot+'/testlist.'+inputs.variantname+'.log -m run_test -s nbiftdl all -a print -w " config==nbif_all_rtl "';
            }
            else{
              gettestlisttext += 'bsub -P GIONB-SRDC -q regr_high -Is -J nbif_R_tl -R "rusage[mem=5000] select[type==RHEL7_64]" dj -l '+treeRoot+'/testlist.'+inputs.variantname+'.log -m run_test -s nbiftdl all -a print -w " config==nbif_all_rtl && (';
              // groups
              for(let g=0;g<groups.length;g++){
                if(g!=0){
                  gettestlisttext +=  ' || ';
                }
                gettestlisttext +=  ' group=='+groups[g]+' ';
              }
              gettestlisttext += ')"\n';
            }
            fs.writeFileSync(treeRoot+'.testlist.script',gettestlisttext,{
              encoding  : 'utf8',
              mode      : '0700',
              flag      : 'w'
            });
            let gettestliststarttime  = new moment();
            console.log(loginit()+treeRoot+' testlist script made');
            console.log(loginit()+treeRoot+' testlist start');
            PS['gettestlist']=child_process.exec(treeRoot+'.testlist.script',{
              maxBuffer : 200*1024*1024
            },async function(err_tl,stdout_tl,stderr_t1){
              console.log(loginit()+treeRoot+' testlist done');
              let gettestlistendtime  = new moment();
              console.log(loginit()+treeRoot+' testlist cost '+moment.duration(gettestlistendtime.diff(gettestliststarttime)).as('minutes')+' minutes');
              if(PS.hasOwnProperty('gettestlist')){
                delete  PS['gettestlist'];
              }
              let RG;
              RG  = await Regressiontasks.find({
                codeline    : inputs.codeline,
                branch_name : inputs.branch_name,
                changelist  : inputs.changelist,
                shelve      : inputs.shelve,
                username    : inputs.username,
                kickoffdate : inputs.kickoffdate,
                isOfficial  : inputs.isOfficial,
                isBAPU      : inputs.isBAPU
              });
              if(RG.length==0){
              }
              else if(RG.length>1){
              }
              else if((RG[0].result ==  'TOKILL')||(RG[0].result ==  'KILLED')||(RG[0].result ==  'KILLING')){
                if(PS.hasOwnProperty('gettestlist')){
                  delete PS['gettestlist'];
                }
                console.log(loginit()+treeRoot+' kill');
                return;
              }//TODO
              ////////////////////////////////////////////////////////////
              //Build tree
              ////////////////////////////////////////////////////////////
              console.log(loginit()+treeRoot+' testlist out cleanning');
              child_process.execSync('mv -v '+treeRoot+'/out.'+inputs.variantname+'.testlist '+treeRoot+'/out.'+inputs.variantname+'.testlist.rm');
              child_process.exec('rm -rf '+treeRoot+'/out.'+inputs.variantname+'.testlist.rm',function(err_cln,stdout_cln,stderror_cln){
                console.log(loginit()+treeRoot+' testlist out cleaned');
              });
              let buildtext = '';
              buildtext += '#!/tool/pandora64/bin/tcsh\n';
              buildtext += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
              buildtext += 'cd '+treeRoot+'\n';
              buildtext += 'bootenv -v '+inputs.variantname+' -out_anchor '+treeRoot+'/out.'+inputs.variantname+'\n';
              buildtext += 'bsub -P GIONB-SRDC -W '+inputs.timeoutsingle*60+' -q regr_high -Is -J nbif_R_bd -R "rusage[mem=5000] select[type==RHEL7_64]" dj -l '+treeRoot+'/nb__.build.'+inputs.variantname+'.log -DUVM_VERBOSITY=UVM_LOW -m4 -DUSE_VRQ -DCGM -DSEED=12345678 run_test -s nbiftdl demo_test_0_nbif_all_rtl -a execute=off\n';
              fs.writeFileSync(treeRoot+'.build.script',buildtext,{
                encoding  : 'utf8',
                mode      : '0700',
                flag      : 'w'
              });
              let buildstarttime  = new moment();
              console.log(loginit()+treeRoot+' build script made');
              console.log(loginit()+treeRoot+' build start');
              PS['build']=child_process.exec(treeRoot+'.build.script',async function(err_bd,stdout_bd,stderr_bd){
                let buildendtime = new moment();
                console.log(loginit()+treeRoot+' build done');
                console.log(loginit()+treeRoot+' build cost '+moment.duration(buildendtime.diff(buildstarttime)).as('minutes')+' minutes');
                if(PS.hasOwnProperty('build')){
                  delete PS['build'];
                }
                let RG;
                RG  = await Regressiontasks.find({
                  codeline    : inputs.codeline,
                  branch_name : inputs.branch_name,
                  changelist  : inputs.changelist,
                  shelve      : inputs.shelve,
                  username    : inputs.username,
                  kickoffdate : inputs.kickoffdate,
                  isOfficial  : inputs.isOfficial,
                  isBAPU      : inputs.isBAPU
                });
                if(RG.length==0){
                }
                else if(RG.length>1){
                }
                else if((RG[0].result ==  'TOKILL')||(RG[0].result ==  'KILLED')||(RG[0].result ==  'KILLING')){
                  if(PS.hasOwnProperty('build')){
                    delete PS['build'];
                  }
                  console.log(loginit()+treeRoot+' kill');
                  return;
                }//TODO
                if(!fs.existsSync(treeRoot+'/nb__.build.'+inputs.variantname+'.log')){
                  fs.writeFileSync(treeRoot+'/nb__.build.FAIL','',{
                    encoding  : 'utf8',
                    mode      : '0600',
                    flag      : 'w'
                  });
                }
                else{
                  let lines = fs.readFileSync(treeRoot+'/nb__.build.'+inputs.variantname+'.log','utf8').split('\n');
                  lines.pop();
                  for(let l=0;l<lines.length;l++){
                    if(djregxpass.test(lines[l])){
                      fs.writeFileSync(treeRoot+'/nb__.build.PASS','',{
                        encoding  : 'utf8',
                        mode      : '0600',
                        flag      : 'w'
                      });
                      break;
                    }
                    if(djregxfail.test(lines[l])){
                      fs.writeFileSync(treeRoot+'/nb__.build.FAIL','',{
                        encoding  : 'utf8',
                        mode      : '0600',
                        flag      : 'w'
                      });
                      break;
                    }
                  }
                }
                if(fs.existsSync(treeRoot+'/nb__.build.FAIL')){
                  console.log(loginit()+treeRoot+' build fail');
                  child_process.exec('echo "Build fail. Details: http://logviewer-atl/'+treeRoot+'" | mutt '+getemail(inputs.username)+' -s [NBIF][Regression][notofficial][changelist:'+inputs.changelist+'][shelve:'+inputs.shelve+'][grouplist:'+inputs.grouplist+'][BUILDFAIL]');
                  //clean up tree
                  setTimeout(function(){
                    child_process.execSync('cd '+treeRoot+' && /tool/pandora64/.package/perforce-2009.2/bin/p4 revert ...');
                    child_process.execSync('rm -rf '+treeRoot+'.*.log');
                    child_process.execSync('rm -rf '+treeRoot+'.*.script');
                    child_process.execSync('mv '+treeRoot+' '+treeRoot+'.rm');
                    child_process.exec('rm -rf '+treeRoot+'.rm ',function(){
                      console.log(loginit()+treeRoot+' cleaned up due to RESOLVEFAIL');
                    });
                  },parseInt(inputs.treemaintain)*3600*1000);
                }
                else if(fs.existsSync(treeRoot+'/nb__.build.PASS')){
                  console.log(loginit()+treeRoot+' build pass');
                  child_process.exec('echo "Build pass and start to run" | mutt '+getemail(inputs.username)+' -s [NBIF][Regression][notofficial][changelist:'+inputs.changelist+'][shelve:'+inputs.shelve+'][grouplist:'+inputs.grouplist+'][BUILDPASS]');
                  ////////////////////////////////////////////////////////////
                  //Parse testlist and dispatch cases
                  ////////////////////////////////////////////////////////////
                  if(!fs.existsSync(treeRoot+'/testlist.'+inputs.variantname+'.log')){
                  }
                  else{
                    let lines     = fs.readFileSync(treeRoot+'/testlist.'+inputs.variantname+'.log','utf8').split('\n');
                    lines.pop();
                    let regx00    = /^\[dj \d+:\d+:\d+ I\]:   "testcase": "(.*)"/;
                    let regx01    = /^\[dj \d+:\d+:\d+ I\]:   "suite": "(.*)"/;
                    let regx02    = /^\[dj \d+:\d+:\d+ I\]:   }/;
                    let regx03    = /^\[dj \d+:\d+:\d+ I\]:     "name": "(.*)"/;
                    let regx04    = /^\[dj \d+:\d+:\d+ I\]:     "config": "(.*)"/;
                    let regx05    = /^\[dj \d+:\d+:\d+ I\]:     "run_seed": "(.*)"/;
                    let regx06    = /^\[dj \d+:\d+:\d+ I\]:     "group": "(.*)"/;
                    let regx07    = /^\[dj \d+:\d+:\d+ I\]:     "run_start_time": "(.*)"/;
                    let regx08    = /^\[dj \d+:\d+:\d+ I\]:     "run_out_path": "(.*)"/;
                    let regx09    = /^\[dj \d+:\d+:\d+ I\]:     "fullname": "(.*)"/;
                    let flag      = 0;
                    let testlist  = [];
                    let runtext='';
                    runtext += '#!/tool/pandora64/bin/tcsh\n';
                    runtext += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
                    runtext += 'cd '+treeRoot+'\n';
                    runtext += 'bootenv -v '+inputs.variantname+' -out_anchor '+treeRoot+'/out.'+inputs.variantname+'\n';
                    let onetest ;
                    let index = 0;
                    for(let l=0;l<lines.length;l++){
                      if(regx00.test(lines[l])){
                        flag  = 1;
                        testlist[index]={};
                        testlist[index]['name']='';
                        testlist[index]['suite']='';//TODO
                        testlist[index]['config']='';
                        testlist[index]['group']='';
                        testlist[index]['codeline']=inputs.codeline;
                        testlist[index]['branch_name']=inputs.branch_name;
                        testlist[index]['changelist']=inputs.changelist;
                        testlist[index]['shelve']=inputs.shelve;
                        testlist[index]['isBAPU']=inputs.isBAPU;
                        testlist[index]['isOfficial']=inputs.isOfficial;
                        testlist[index]['run_out_path']='';
                        testlist[index]['seed']=Math.floor((Math.random()*999999)+1);//
                      }
                      if(regx02.test(lines[l])){
                        flag  = 0;
                        index++;
                      }
                      if(flag ==  1){
                        //testname 
                        if(regx03.test(lines[l])){
                          lines[l].replace(regx03,function(rs,$1){
                            testlist[index]['name'] = $1;
                            console.log(loginit()+treeRoot+' name '+testlist[index]['name']);
                            runtext += 'bsub -P GIONB-SRDC -W '+inputs.timeoutsingle*60+' -q regr_high -J nbif_R_rn -R "rusage[mem=5000] select[type==RHEL7_64]" dj -l '+treeRoot+'/nb__.run.'+inputs.variantname+'.'+$1+'.log -DUVM_VERBOSITY=UVM_NONE -m4 -DUSE_VRQ -DCGM -DSEED='+testlist[index]['seed']+' run_test -s nbiftdl '+$1+' -a run=only\n';//TODO
                          });
                        }
                        //run_out_path
                        if(regx08.test(lines[l])){
                          lines[l].replace(regx08,function(rs,$1){
                            let out_home  = treeRoot+'/out.'+inputs.variantname+'/out/linux_3.10.0_64.VCS';//TODO
                            let regxouthome = /\$OUT_HOME/;
                            let R = $1;
                            R = R.replace(regxouthome,out_home);
                            testlist[index]['run_out_path'] = R;
                            console.log(loginit()+treeRoot+' run_out_path '+testlist[index]['run_out_path']);
                          });
                        }
                        //group
                        if(regx06.test(lines[l])){
                          lines[l].replace(regx06,function(rs,$1){
                            testlist[index]['group'] = $1;
                            console.log(loginit()+treeRoot+' group '+testlist[index]['group']);
                          });
                        }
                      }
                    }
                    fs.writeFileSync(treeRoot+'.run.script',runtext,{
                      encoding  : 'utf8',
                      mode      : '0700',
                      flag      : 'w'
                    });
                    console.log(loginit()+treeRoot+' run script made');
                    console.log(loginit()+treeRoot+' test number is '+testlist.length);
                    child_process.exec(treeRoot+'.run.script',{
                      maxBuffer : 200*1024*1024
                    },function(err_run,stdout_run,stderr_run){
                      //console.log('ERR'+err_run);
                      //console.log('OUT'+stdout_run);
                      let outlines  = stdout_run.split('\n');
                      let regxjobid = /Job <(\d+)>/;
                      outlines.pop();
                      for(let l=0;l<outlines.length;l++){
                        if(regxjobid.test(outlines[l])){
                          outlines[l].replace(regxjobid,function(rs,$1){
                            //console.log(loginit()+treeRoot+' Jobid ' +$1);
                            bsubids.push($1);
                          });
                        }
                      }
                      //console.log('STDERR'+stderr_run);
                      let out_hometext;
                      out_hometext  +=  '#!/tool/pandora64/bin/tcsh\n';
                      out_hometext  +=  'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
                      out_hometext  +=  'bootenv -v '+inputs.variantname+' -out_anchor '+treeRoot+'/out.'+inputs.variantname+'\n';

                      //TODO
                      let cron_check  = new cronJob('0 */2 * * * *',async function(){
                        console.log(loginit()+treeRoot+' checking result');
                        let mailbody  = '';
                        let mailbodyhead='';
                        let mailbodyinsert='';
                        mailbodyhead  +=  '<html>\n';
                        mailbodyhead  +=  '<body>\n';
                        mailbodyhead  +=  '<h3>Hi '+inputs.username+'</h3>\n';
                        mailbodyhead  +=  '<h4>codeline: '+inputs.codeline+'</h4>\n';
                        mailbodyhead  +=  '<h4>branch_name: '+inputs.branch_name+'</h4>\n';
                        mailbodyhead  +=  '<h4>changelist: '+inputs.changelist+'</h4>\n';
                        mailbodyhead  +=  '<h4>shelve: '+inputs.shelve+'</h4>\n';
                        mailbodyhead  +=  '<h4>isOfficial: '+inputs.isOfficial+'</h4>\n';
                        mailbody  +=  '<table border="1">\n';
                        mailbody  +=  '<tr>\n';
                        mailbody  +=  '  <th>Test Name</th>\n';
                        mailbody  +=  '  <th>Result</th>\n';
                        mailbody  +=  '  <th>Seed</th>\n';
                        //mailbody  +=  '  <th>Runtime</th>\n';
                        mailbody  +=  '  <th>group</th>\n';
                        //mailbody  +=  '  <th>signature</th>\n';
                        mailbody  +=  '</tr>\n';
                        let passnum =0;
                        let failnum =0;
                        let runnum=0;
                        let notstartnum=0;
                        for(let t =0;t<testlist.length;t++){
                          mailbody  +=  '<tr>\n';
                          //TODO
                          mailbody  +=  '  <td>'+testlist[t]['name']+'</td>\n';
                          let result  = '';
                          let seed;
                          let runtime = 'NA';
                          let signature = 'NA';
                          let color = '';
                          //result
                          if(fs.existsSync(treeRoot+'/result.run.'+inputs.variantname+'.'+testlist[t]['name']+'.PASS')){
                            result  = 'PASS';
                            color   = 'lightgreen';
                            passnum++;
                          }
                          else if(fs.existsSync(treeRoot+'/result.run.'+inputs.variantname+'.'+testlist[t]['name']+'.FAIL')){
                            result  = 'FAIL';
                            color   = 'red';
                            failnum++;
                          }
                          else if(fs.existsSync(treeRoot+'/nb__.run.'+inputs.variantname+'.'+testlist[t]['name']+'.log')){
                            let lines = fs.readFileSync(treeRoot+'/nb__.run.'+inputs.variantname+'.'+testlist[t]['name']+'.log','utf8').split('\n');
                            lines.pop();
                            for(let l=0;l<lines.length;l++){
                              if(djregxpass.test(lines[l])){
                                result  = 'PASS';
                                color   = 'lightgreen';
                                passnum++;
                                fs.writeFileSync(treeRoot+'/result.run.'+inputs.variantname+'.'+testlist[t]['name']+'.PASS','',{
                                  encoding  : 'utf8',
                                  mode      : '0600',
                                  flag      : 'w'
                                });
                                break;
                              }
                              if(djregxfail.test(lines[l])){
                                result  = 'FAIL';
                                color   = 'red';
                                failnum++;
                                fs.writeFileSync(treeRoot+'/result.run.'+inputs.variantname+'.'+testlist[t]['name']+'.FAIL','',{
                                  encoding  : 'utf8',
                                  mode      : '0600',
                                  flag      : 'w'
                                });
                                break;
                              }
                            }
                            if(result=='PASS'){
                            }
                            else if(result=='FAIL'){
                            }
                            else{
                              result  = 'RUNNING';
                              color   = 'blue';
                              runnum++;
                            }
                          }
                          else{
                            result  = 'NOTSTARTED';
                            color   = 'yellow';
                            notstartnum++;
                          }
                          //signature
                          
                          mailbodyinsert  = '';
                          mailbodyinsert  +=  '<h4>total number: '+testlist.length+'</h4>\n';
                          mailbodyinsert  +=  '<h4>pass number: '+passnum+'</h4>\n';
                          mailbodyinsert  +=  '<h4>pass rate: '+(passnum/testlist.length*100).toFixed(2)+'%</h4>\n';
                          mailbodyinsert  +=  '<h4>not started number: '+notstartnum+'</h4>\n';
                          mailbodyinsert  +=  '<h4>not started rate: '+(notstartnum/testlist.length*100).toFixed(2)+'%</h4>\n';
                          mailbodyinsert  +=  '<h4>running number: '+runnum+'</h4>\n';
                          mailbodyinsert  +=  '<h4>running rate: '+(runnum/testlist.length*100).toFixed(2)+'%</h4>\n';
                          mailbody  +=  '  <td bgcolor='+color+'>'+result+'</td>\n';
                          mailbody  +=  '  <td>'+testlist[t]['seed']+'</td>\n';
                          //mailbody  +=  '  <td>Runtime</td>\n';//TODO
                          mailbody  +=  '  <td>'+testlist[t]['group']+'</td>\n';
                          //mailbody  +=  '  <td>signature</td>\n';
                          mailbody  +=  '</tr>\n';
                        }
                        mailbody  +=  '</body>\n';
                        mailbody  +=  '</html>\n';
                        //console.log(loginit()+treeRoot+mailbody);
                        fs.writeFileSync(treeRoot+'/report',mailbodyhead+mailbodyinsert+mailbody,{
                          encoding  : 'utf8',
                          mode      : '0600',
                          flag      : 'w'
                        });
                        if((runnum==0) && (notstartnum==0)){
                          cron_check.stop();
                        }
                        child_process.exec('mutt '+getemail(inputs.username)+' -e \'set content_type="text/html"\' -s [NBIF][Regression][notofficial][changelist:'+inputs.changelist+'][shelve:'+inputs.shelve+'][grouplist:'+inputs.grouplist+'] < '+treeRoot+'/report');
                      },null,false,'Asia/Chongqing');
                      cron_check.start();
                      setTimeout(function(){
                        cron_check.stop();
                        setTimeout(function(){
                          child_process.execSync('mv '+treeRoot+' '+treeRoot+'.rm');
                          child_process.execSync('rm -rf '+treeRoot+'.*.log');
                          child_process.execSync('rm -rf '+treeRoot+'.*.script');
                          child_process.exec('rm -rf '+treeRoot+'.rm',function(){
                            console.log(loginit()+treeRoot+'.rm is cleaned');
                          });
                        },48**3600*1000);
                      },inputs.timeoutall*3600*1000);
                    });
                    ////////////////////////////////////////////////////////////
                    //kick off regression
                    ////////////////////////////////////////////////////////////
                  }
                }
              });
              //==========================================================
              //Build tree
              //==========================================================
            });
            //==========================================================
            //get testlist
            //==========================================================
          }
        });
        //==========================================================
        //unshelve and resolve
        //==========================================================

        
      }
    });
    //==========================================================
    //sync a tree
    //==========================================================
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok',
      msg : 'task received'
    }));

  }


};
