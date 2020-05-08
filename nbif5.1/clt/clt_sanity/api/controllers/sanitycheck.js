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
let runtimeout      = 60*6;//6 hrs
let PS  = {};
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
let checkifdone     = async function(pickedupitem, path, stat,res){
  let overallresult = 'PASS';
  let delaytime = 0;
  let finished  = 0;
  for(let variantname in MASK){
    for(let kind  in  MASK[variantname]){
      for(let taskname in MASK[variantname][kind]){
        if(MASK[variantname][kind][taskname]=='yes'){
          if(stat[variantname][kind][taskname]['result']=='NOTDONE'){
            overallresult = 'NOTDONE';
          }
          else{
            finished++;
          }
        }
      }
    }
  }
  if(overallresult  ==  'NOTDONE') {
  }
  else{
    for(let variantname in MASK){
      for(let kind  in  MASK[variantname]){
        for(let taskname in MASK[variantname][kind]){
          if(MASK[variantname][kind][taskname]=='yes'){
            if(stat[variantname][kind][taskname]['result']!='RUNPASS'){
              overallresult = 'FAIL';
              break;
            }
          }
        }
      }
    }
    let itemDB;
    if(tasktype=='shelvecheck'){
      if(PS['shelvecheck'].hasOwnProperty(pickedupitem.codeline+'_'+pickedupitem.branch_name+'_'+pickedupitem.shelve)){
        delete PS['shelvecheck'][pickedupitem.codeline+'_'+pickedupitem.branch_name+'_'+pickedupitem.shelve];
        console.log(loginit()+path+' PS cleaned');
      }
      itemDB  = await Sanityshelves.find({
        codeline  : pickedupitem.codeline,
        branch_name: pickedupitem.branch_name,
        shelve  : pickedupitem.shelve
      });
      if(itemDB.length>1){
        //ERROR //TODO
      }
      else if(itemDB.length==0){
        //ERROR //TODO
      }
      else if((itemDB[0].result=='TOKILL') || (itemDB[0].result=='KILLING')||(itemDB[0].result=='KILLED')){
        //ignore
      }
      else{
        await Sanityshelves.update({
          codeline  : pickedupitem.codeline,
          branch_name: pickedupitem.branch_name,
          shelve  : pickedupitem.shelve
        },{
          result      : overallresult,
          details     : JSON.stringify(stat)
        })
        console.log(loginit()+path+' DB updated with done');
        //Sending email
        ////////////////////////////////////////////////////////////
        // create mail body
        ////////////////////////////////////////////////////////////
        let mailbody  = '';
        mailbody  +=  '<html>\n';
        mailbody  +=  '<body>\n';
        mailbody  +=  '<h3>Hi '+pickedupitem.username+'</h3>\n';
        for(let variantname in MASK){
          mailbody  +=  '<h4>Variant : '+variantname+'</h4>\n';
          mailbody  +=  '<table border="1">\n';
          mailbody  +=  '<tr>\n';
          mailbody  +=  '  <th>Task Name</th>\n';
          mailbody  +=  '  <th>Result</th>\n';
          mailbody  +=  '</tr>\n';
          
          for(let kind  in  MASK[variantname]){
            for(let taskname in MASK[variantname][kind]){
              if(MASK[variantname][kind][taskname]=='yes'){
                mailbody  +=  '<tr>\n';
                mailbody  +=  '  <td>'+taskname+'</td>\n';
                if(stat[variantname][kind][taskname]['result']=='RUNPASS'){
                  mailbody  +=  '  <td bgcolor=lightgreen>'+stat[variantname][kind][taskname]['result']+'</td>\n';
                }
                else if(stat[variantname][kind][taskname]['result']=='NOTDONE'){
                  mailbody  +=  '  <td bgcolor=yellow>'+stat[variantname][kind][taskname]['result']+'</td>\n';
                }
                else{
                  mailbody  +=  '  <td bgcolor=red>'+stat[variantname][kind][taskname]['result']+'</td>\n';
                }
                mailbody  +=  '</tr>\n';
              }
            }
          }
          mailbody  +=  '</table>\n';
        }
        mailbody  +=  '<h4><a href="http://logviewer-atl/'+path+'">Details</a></h4>\n';
        mailbody  +=  '</body>\n';
        mailbody  +=  '</html>\n';
        //=====================
        
        fs.writeFileSync(path+'/report',mailbody,{
          encoding  : 'utf8',
          mode      : '0600',
          flag      : 'w'
        });
        console.log(loginit()+'sending email');
        let email = getemail(pickedupitem.username);
        console.log(loginit()+'target email is '+email);
        child_process.exec('mutt '+email+' -e  \'set content_type="text/html"\' -s [NBIF][SanityCheck]['+overallresult+'][treeRoot:'+path+'] < '+path+'/report',function(err,stdout,stderr){
          console.log(loginit()+'email done');
          console.log(stdout);
        });
        //==========================================================
        // create mail body
        //==========================================================

        ////////////////////////////////////////////////////////////
        // revert script
        ////////////////////////////////////////////////////////////
        let reverttext='';
        reverttext  +=  '#!/tool/pandora64/bin/tcsh\n';
        reverttext  +=  'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
        reverttext  +=  'cd '+path+'\n';
        reverttext  +=  'p4 revert ...\n'
        fs.writeFileSync(path+'.revert.script',reverttext,{
          encoding  : 'utf8',
          mode      : '0700',
          flag      : 'w'
        });
        //==========================================================
        // revert script
        //==========================================================
        if(overallresult  =='FAIL'){
          delaytime = 24*3600*1000;
        }
        console.log(loginit()+path+' is planned to clean after '+delaytime/3600/1000+' hrs');
        setTimeout(function(){
          child_process.execSync(path+'.revert.script');
          child_process.execSync('mv '+path+' '+path+'.rm');
          child_process.execSync('rm -rf '+path+'.*.log');
          child_process.execSync('rm -rf '+path+'.*.script');
          child_process.exec('bsub -P GIONB-SRDC -q regr_high -Is -J nbif_C_cln -R "rusage[mem=1000] select[type==RHEL7_64]" rm -rf '+path+'.rm',function(){
            console.log(loginit()+path+' cleaned up');
          });
        },delaytime);

      }

    }

  }
  console.log(loginit()+path+' finished number is '+finished);
  console.log(loginit()+path+' overallresult is '+ overallresult);
};

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
        if(PS['shelvecheck'][K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve]=={}){
          console.log(loginit()+'shelve '+K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve+' nothing to kill and cleaning potential disk');
          await Sanityshelves.update({
            codeline    : K[k].codeline,
            branch_name : K[k].branch_name,
            shelve      : K[k].shelve
          },{
            result      : 'KILLING'
          });
          console.log(loginit()+'remove '+K[k].resultlocation+' due to kill');
          child_process.execSync('cd '+path+' && /tool/pandora64/.package/perforce-2009.2/bin/p4 revert ...');
          child_process.execSync('mv '+K[k].resultlocation+' '+K[k].resultlocation+'.kill');
          child_process.exec('rm -rf '+K[k].resultlocation+'.kill',async function(err1,stdout1,stderr1){
            console.log(loginit()+'shelve '+K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve+' killed and dir removed');
            await Sanityshelves.update({
              codeline    : K[k].codeline,
              branch_name : K[k].branch_name,
              shelve      : K[k].shelve
            },{
              result      : 'KILLED'
            });
            delete PS['shelvecheck'][K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve];

            child_process.exec('echo killed | mutt '+getemail(K[k].username)+' -e  \'set content_type="text/html"\' -s [NBIF][SanityCheck][KILLED]['+K[k].codeline+']['+K[k].branch_name+']['+K[k].shelve+']');
          });
        }
        else{
          console.log(loginit()+'killing '+K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve);
          for(let ps in PS['shelvecheck'][K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve]){
            await Sanityshelves.update({
              codeline    : K[k].codeline,
              branch_name : K[k].branch_name,
              shelve      : K[k].shelve
            },{
              result      : 'KILLING'
            });
            console.log(loginit()+'killing '+ps);
            PS['shelvecheck'][K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve][ps].kill();
          }
          console.log(loginit()+'remove '+K[k].resultlocation+' due to kill');
          child_process.execSync('mv '+K[k].resultlocation+' '+K[k].resultlocation+'.kill');
          child_process.exec('rm -rf '+K[k].resultlocation+'.kill',async function(err1,stdout1,stderr1){
            console.log(loginit()+'shelve '+K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve+' killed');
            await Sanityshelves.update({
              codeline    : K[k].codeline,
              branch_name : K[k].branch_name,
              shelve      : K[k].shelve
            },{
              result      : 'KILLED'
            });
            delete PS['shelvecheck'][K[k].codeline+'_'+K[k].branch_name+'_'+K[k].shelve];
            child_process.exec('echo killed | mutt '+getemail(K[k].username)+' -e  \'set content_type="text/html"\' -s [NBIF][SanityCheck][KILLED]['+K[k].codeline+']['+K[k].branch_name+']['+K[k].shelve+']');
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
  //console.log(loginit()+'NOTSTARTED : '+JSON.stringify(N));
  console.log(loginit()+'NOTSTARTED : '+N.length);
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
  //console.log(loginit()+'RUNNING: '+JSON.stringify(R));
  console.log(loginit()+'RUNNING: '+R.length);
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
          console.log(loginit() +'pickedupitem : '+ JSON.stringify(pickedupitem));
          break;
        }
      }
      if(pickedupitem == 'NA'){
        return;
      }
    }
    else {
      pickedupitem  = N[0];
      console.log(loginit() +'pickedupitem : '+ JSON.stringify(pickedupitem));
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
  let stat  = {};
  
  for(let variantname in MASK){
    stat[variantname]={};
    for(let kind  in  MASK[variantname]){
      stat[variantname][kind]={};
      for(let taskname in MASK[variantname][kind]){
        if(MASK[variantname][kind][taskname]=='yes'){
          stat[variantname][kind][taskname]={};
          stat[variantname][kind][taskname]['result']='NOTDONE';
          stat[variantname][kind][taskname]['runtime']='NA';
          stat[variantname][kind][taskname]['memcost']='NA';//TODO
        }
      }
    }
  }
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
    PS[tasktype][itemID]={};
  }
  if(tasktype =='changelistcheck'){
    itemID  = pickedupitem.codeline+'_'+pickedupitem.branch_name+'_'+pickedupitem.changelist;
    treeRoot  +=  itemID;
    console.log();
    await Sanitychangelists.update({
      codeline    : pickedupitem.codeline,
      branch_name : pickedupitem.branch_name,
      changelist  : pickedupitem.changelist
    },{
      result      : 'RUNNING',
      resultlocation  : treeRoot
    });
    PS[tasktype][itemID]={};
  }
  //==========================================================
  //Prepare parameters
  //==========================================================

  ////////////////////////////////////////////////////////////
  //Prepare workspace
  ////////////////////////////////////////////////////////////
  if(fs.existsSync(treeRoot)){
    child_process.execSync('mv '+treeRoot+' '+treeRoot+'.rm');
    child_process.execSync('rm -rf '+treeRoot+'.*.script');
    child_process.execSync('rm -rf '+treeRoot+'.*.log');
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
  
  
  ////////////////////////////////////////////////////////////
  //Sync tree
  ////////////////////////////////////////////////////////////
  let synctext  = '';
  synctext += '#!/tool/pandora64/bin/tcsh\n';
  synctext += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
  synctext += 'cd '+treeRoot+'\n';
  synctext += 'p4_mkwa -codeline '+pickedupitem.codeline+' -branch_name '+pickedupitem.branch_name;
  if(tasktype =='changelistcheck'){
    synctext  +=  ' -cl '+pickedupitem.changelist;
  }
  if(tasktype =='shelvecheck'){
  }
  synctext  +=  '> '+treeRoot+'.sync.log\n';
  synctext  +=  'p4 users > ~/p4users\n';
  fs.writeFileSync(treeRoot+'.sync.script',synctext,{
    encoding  : 'utf8',
    mode      : '0700',
    flag      : 'w'
  });
  console.log(loginit()+treeRoot+' sync script made');
  console.log(loginit()+treeRoot+' sync start');
  let syncstarttime = new moment();
  console.log(loginit()+'===='+itemID);
  PS[tasktype][itemID]['sync']=child_process.exec(treeRoot+'.sync.script',async function(err1,stdout1,stderr1){
    if(PS[tasktype][itemID].hasOwnProperty('sync')){
      delete PS[tasktype][itemID]['sync'];
    }
    let S;
    if(tasktype=='shelvecheck'){
      S = await Sanityshelves.find({
        codeline  : pickedupitem.codeline,
        branch_name : pickedupitem.branch_name,
        shelve  : pickedupitem.shelve
      });
    }
    if(tasktype=='changelistcheck'){
      S = await Sanitychangelists.find({
        codeline    : pickedupitem.codeline,
        branch_name : pickedupitem.branch_name,
        changelist  : pickedupitem.changelist
      });
    }
    if((S[0].result ==  'TOKILL')||(S[0].result ==  'KILLED')||(S[0].result ==  'KILLING')){
      console.log(loginit()+treeRoot+' kill');
      return;
    }
    
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
      for(let variantname in MASK){
        for(let kind  in  MASK[variantname]){
          for(let taskname in MASK[variantname][kind]){
            if(MASK[variantname][kind][taskname]=='yes'){
              console.log(loginit()+treeRoot+' variant:'+variantname+' kind:'+kind+' task:'+taskname+' run done');
              console.log(loginit()+treeRoot+' variant:'+variantname+' kind:'+kind+' task:'+taskname+' sync fail');
              fs.writeFileSync(treeRoot+'/result.'+variantname+'.run.'+kind+'.'+taskname+'.SYNCFAIL','',{
                encoding  : 'utf8',
                mode      : '0600',
                flag      : 'w'
              });
              //check result
              stat[variantname][kind][taskname]['result']='SYNCFAIL';
              stat[variantname][kind][taskname]['runtime']=0;
              stat[variantname][kind][taskname]['memcost']='100M';
              console.log(loginit()+treeRoot+' stat is '+JSON.stringify(stat));
              checkifdone(pickedupitem,treeRoot,stat,'SYNCFAIL');
            }
          }
        }
      }
    }
    if(fs.existsSync(treeRoot+'/nb__.sync.PASS')){
      console.log(loginit()+treeRoot+' sync pass');
      ////////////////////////////////////////////////////////////
      //Prepare resolve script and p4 users
      ////////////////////////////////////////////////////////////
      let resolvetext='';
      resolvetext += '#!/tool/pandora64/bin/tcsh\n';
      resolvetext += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
      if(tasktype==  'shelvecheck'){
        resolvetext += 'cd '+treeRoot+'\n';
        resolvetext += 'bootenv\n';
        resolvetext += 'p4w unshelve -s '+pickedupitem.shelve+'\n';
        resolvetext += 'p4w sync_all\n';
        resolvetext += 'p4w resolve -am\n';
      }
      fs.writeFileSync(treeRoot+'.resolve.script',resolvetext,{
        encoding  : 'utf8',
        mode      : '0700',
        flag      : 'w'
      });
      //==========================================================
      //Prepare run script
      //==========================================================

      ////////////////////////////////////////////////////////////
      //resolve tree
      ////////////////////////////////////////////////////////////
      console.log(loginit()+treeRoot+' resolve start');
      let resolvestarttime  = new moment();
      child_process.execSync(treeRoot+'.resolve.script > '+treeRoot+'/nb__.resolve.log');//TODO not sure if need to be async
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
        for(let variantname in MASK){
          for(let kind  in  MASK[variantname]){
            for(let taskname in MASK[variantname][kind]){
              if(MASK[variantname][kind][taskname]=='yes'){
                console.log(loginit()+treeRoot+' variant:'+variantname+' kind:'+kind+' task:'+taskname+' run done');
                console.log(loginit()+treeRoot+' variant:'+variantname+' kind:'+kind+' task:'+taskname+' resolve fail');
                fs.writeFileSync(treeRoot+'/result.'+variantname+'.run.'+kind+'.'+taskname+'.RESOLVEFAIL','',{
                  encoding  : 'utf8',
                  mode      : '0600',
                  flag      : 'w'
                });
                //check result
                stat[variantname][kind][taskname]['result']='RESOLVEFAIL';
                stat[variantname][kind][taskname]['runtime']=0;
                stat[variantname][kind][taskname]['memcost']='100M';
                console.log(loginit()+treeRoot+' stat is '+JSON.stringify(stat));
                checkifdone(pickedupitem,treeRoot,stat,'RESOLVEFAIL');
              }
            }
          }
        }
      }
      if(fs.existsSync(treeRoot+'/nb__.resolve.PASS')){
        console.log(loginit()+treeRoot+' resolve pass');
        //resolve pass
        //////////////////////////////////////////////////////////////
        //Prepare Run script
        ////////////////////////////////////////////////////////////
        for(let variantname in MASK){
          for(let kind  in  MASK[variantname]){
            for(let taskname in MASK[variantname][kind]){
              if(MASK[variantname][kind][taskname]=='yes'){
                let runtext='';
                runtext += '#!/tool/pandora64/bin/tcsh\n';
                runtext += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
                runtext += 'cd '+treeRoot+'\n';
                runtext += 'bootenv -v '+variantname+' -out_anchor '+treeRoot+'/out.'+variantname+'.'+kind+'.'+taskname+'\n';
                if(kind ==  'test'){
                  runtext +='bsub -P GIONB-SRDC -W '+runtimeout+' -q regr_high -Is -J nbif_C_rn -R "rusage[mem=5000] select[type==RHEL7_64]" dj -l '+treeRoot+'/nb__.run.'+variantname+'.'+kind+'.'+taskname+'.log -DUVM_VERBOSITY=UVM_LOW -m4 -DUSE_VRQ -DCGM -DSEED=12345678 run_test -s nbiftdl '+taskname+'_nbif_all_rtl\n';
                }
                if(kind ==  'task'){
                  switch (taskname) {
                    case 'dcelab':
                      runtext +='bsub -P GIONB-SRDC -W '+runtimeout+' -q regr_high -Is -J nbif_C_rn -R "rusage[mem=30000] select[type==RHEL7_64]" '+"dj -l "+treeRoot+"/nb__.run."+variantname+"."+kind+"."+taskname+".log"+" -e 'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)' -DPUBLISH_BLKS=";
                      if(variantname  ==  'nbif_draco_gpu'){
                        runtext +=  "nbif_shub_wrap_algfx\n";
                      }
                      if(variantname  ==  'nbif_nv10_gpu'){
                        runtext +=  "nbif_shub_wrap_gfx\n";
                      }
                      if(variantname  ==  'nbif_et_0'){
                        runtext +=  "nbif_shub_wrap_et_0\n";
                      }
                      if(variantname  ==  'nbif_et_1'){
                        runtext +=  "nbif_shub_wrap_et_1\n";
                      }
                      if(variantname  ==  'nbif_et_2'){
                        runtext +=  "nbif_shub_wrap_et_2\n";
                      }
                      break;
                  }
                }
                fs.writeFileSync(treeRoot+'.run.'+variantname+'.'+kind+'.'+taskname+'.script',runtext,{
                  encoding  : 'utf8',
                  mode      : '0700',
                  flag      : 'w'
                });
                console.log(loginit()+treeRoot+' run script '+treeRoot+'.run.'+variantname+'.'+kind+'.'+taskname+'.script made');
                console.log(loginit()+treeRoot+' '+variantname+'.'+kind+'.'+taskname+' run start');
                let taskstarttime = new moment();
                PS[tasktype][itemID]['run.'+variantname+'.'+kind+'.'+taskname]  = child_process.exec(treeRoot+'.run.'+variantname+'.'+kind+'.'+taskname+'.script',async function(err_run,stdout_run,stderr_run){
                  if(PS[tasktype][itemID].hasOwnProperty('run.'+variantname+'.'+kind+'.'+taskname)){
                    delete PS[tasktype][itemID]['run.'+variantname+'.'+kind+'.'+taskname];
                  }
                  let S;
                  if(tasktype=='shelvecheck'){
                    S = await Sanityshelves.find({
                      codeline  : pickedupitem.codeline,
                      branch_name : pickedupitem.branch_name,
                      shelve  : pickedupitem.shelve
                    });
                  }
                  if(tasktype=='changelistcheck'){
                    S = await Sanitychangelists.find({
                      codeline    : pickedupitem.codeline,
                      branch_name : pickedupitem.branch_name,
                      changelist  : pickedupitem.changelist
                    });
                  }
                  if((S[0].result ==  'TOKILL')||(S[0].result ==  'KILLED')||(S[0].result ==  'KILLING')){
                    console.log(loginit()+treeRoot+' kill');
                    return;
                  }
                  let taskendtime = new moment();
                  console.log(loginit()+treeRoot+' '+variantname+'.'+kind+'.'+taskname+' run done');
                  console.log(loginit()+treeRoot+' '+variantname+'.'+kind+'.'+taskname+' run cost '+moment.duration(taskendtime.diff(taskstarttime)).as('minutes')+' minutes');
                  if(!fs.existsSync(treeRoot+'/nb__.run.'+variantname+'.'+kind+'.'+taskname+'.log')){
                    fs.writeFileSync(treeRoot+'/result.run.'+variantname+'.'+kind+'.'+taskname+'.RUNFAIL','',{
                      encoding  : 'utf8',
                      mode      : '0600',
                      flag      : 'w'
                    });
                  }
                  else{
                    let lines=fs.readFileSync(treeRoot+'/nb__.run.'+variantname+'.'+kind+'.'+taskname+'.log','utf8').split('\n');
                    lines.pop();
                    for(let l=0;l<lines.length;l++){
                      if(djregxpass.test(lines[l])){
                        fs.writeFileSync(treeRoot+'/result.run.'+variantname+'.'+kind+'.'+taskname+'.RUNPASS','',{
                          encoding  : 'utf8',
                          mode      : '0600',
                          flag      : 'w'
                        });
                      }
                      if(djregxfail.test(lines[l])){
                        fs.writeFileSync(treeRoot+'/result.run.'+variantname+'.'+kind+'.'+taskname+'.RUNFAIL','',{
                          encoding  : 'utf8',
                          mode      : '0600',
                          flag      : 'w'
                        });
                      }
                    }
                    if(fs.existsSync(treeRoot+'/result.run.'+variantname+'.'+kind+'.'+taskname+'.RUNFAIL')){
                    }
                    else if(fs.existsSync(treeRoot+'/result.run.'+variantname+'.'+kind+'.'+taskname+'.RUNPASS')){
                    }
                    else{
                      fs.writeFileSync(treeRoot+'/result.run.'+variantname+'.'+kind+'.'+taskname+'.RUNFAIL','',{
                        encoding  : 'utf8',
                        mode      : '0600',
                        flag      : 'w'
                      });
                    }
                  }
                  if(fs.existsSync(treeRoot+'/result.run.'+variantname+'.'+kind+'.'+taskname+'.RUNFAIL')){
                    console.log(loginit()+treeRoot+' '+variantname+'.'+kind+'.'+taskname+' run fail');
                    //check result
                    stat[variantname][kind][taskname]['result']='RUNFAIL';
                    stat[variantname][kind][taskname]['runtime']=moment.duration(taskendtime.diff(taskstarttime)).as('minutes');
                    if(kind=='test'){
                      stat[variantname][kind][taskname]['memcost']='5G';
                    }
                    if(kind=='task'){
                      stat[variantname][kind][taskname]['memcost']='30G';
                    }
                    console.log(loginit()+treeRoot+' stat is '+JSON.stringify(stat));
                    checkifdone(pickedupitem,treeRoot,stat,'RUNFAIL');
                  }
                  if(fs.existsSync(treeRoot+'/result.run.'+variantname+'.'+kind+'.'+taskname+'.RUNPASS')){
                    console.log(loginit()+treeRoot+' '+variantname+'.'+kind+'.'+taskname+' run pass');
                    console.log(loginit()+treeRoot+' cleaning passed task');
                    child_process.execSync('mv '+treeRoot+'/out.'+variantname+'.'+kind+'.'+taskname+' '+treeRoot+'/out.'+variantname+'.'+kind+'.'+taskname+'.rm');
                    child_process.exec('rm -rf '+treeRoot+'/out.'+variantname+'.'+kind+'.'+taskname+'.rm',function(err_clnpass,stdout_clnpass,stderr_clnpass){
                      console.log(loginit()+treeRoot+' '+variantname+'.'+kind+'.'+taskname+' cleaned due to pass');
                    });
                    //check result
                    stat[variantname][kind][taskname]['result']='RUNPASS';
                    stat[variantname][kind][taskname]['runtime']=moment.duration(taskendtime.diff(taskstarttime)).as('minutes');
                    if(kind=='test'){
                      stat[variantname][kind][taskname]['memcost']='5G';
                    }
                    if(kind=='task'){
                      stat[variantname][kind][taskname]['memcost']='30G';
                    }
                    console.log(loginit()+treeRoot+' stat is '+JSON.stringify(stat));
                    checkifdone(pickedupitem,treeRoot,stat,'RUNPASS');
                  }
                });
              }
            }
          }
        }
        //==========================================================
        //Prepare Run script
        //==========================================================
      }
      //==========================================================
      //resolve tree
      //==========================================================

    }
  });
  //==========================================================
  //Sync tree
  //==========================================================
  //cron_check.stop();
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
        for(let ps in PS[inputs.tasktype][ID]){
          PS[inputs.tasktype][ID][ps].kill();
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
