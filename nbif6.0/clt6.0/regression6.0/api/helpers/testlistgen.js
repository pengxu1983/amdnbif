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


  friendlyName: 'Testlistgen',


  description: 'Testlistgen something.',


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
    out_anchor      : {
      type          : 'string'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.log('/testlistgen');
    sails.log(inputs);
    let DB  = await Regressionsummary.findOne({
      codeline    : inputs.codeline,
      branch_name : inputs.branch_name,
      changelist  : inputs.changelist,
      shelve      : inputs.shelve,
      describe    : inputs.describe,
      isOfficial  : inputs.isOfficial,
      isBAPU      : inputs.isBAPU,
      kickoffdate : inputs.kickoffdate,
      username    : inputs.username
    });
    if((DB.result  =='KILLED')||(DB.result  =='TOKILL')||(DB.result  =='KILLING')){
      return;
    }
    console.log(loginit()+inputs.treeRoot+' testlistgen start');
    let gettestlisttext = '';
    gettestlisttext += '#!/tool/pandora64/bin/tcsh\n';
    gettestlisttext += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
    gettestlisttext += 'cd '+inputs.treeRoot+'\n';
    gettestlisttext += 'bootenv -v '+inputs.variantname+' -out_anchor '+inputs.treeRoot+'/out.'+inputs.variantname+'.testlist\n';
    let groups  = JSON.parse(inputs.grouplist);
    if(groups.length  ==  0){
      gettestlisttext += 'bsub -P GIONB-SRDC -q regr_high -Is -J nbif_R_tl -R "rusage[mem=5000] select[type==RHEL7_64]" dj -q -l '+inputs.treeRoot+'/testlist.'+inputs.variantname+'.log -m run_test -s nbiftdl all -a print -w " config==nbif_all_rtl "';
    }
    else{
      gettestlisttext += 'bsub -P GIONB-SRDC -q regr_high -Is -J nbif_R_tl -R "rusage[mem=5000] select[type==RHEL7_64]" dj -q -l '+inputs.treeRoot+'/testlist.'+inputs.variantname+'.log -m run_test -s nbiftdl all -a print -w " config==nbif_all_rtl && (';
      // groups
      for(let g=0;g<groups.length;g++){
        if(g!=0){
          gettestlisttext +=  ' || ';
        }
        gettestlisttext +=  ' group=='+groups[g]+' ';
      }
      gettestlisttext += ')"\n';
    }
    fs.writeFileSync(inputs.treeRoot+'/testlist.script',gettestlisttext,{
      encoding  : 'utf8',
      mode      : '0700',
      flag      : 'w'
    });
    let gettestliststarttime  = new moment();
    console.log(loginit()+inputs.treeRoot+' testlist script made');
    console.log(loginit()+inputs.treeRoot+' testlist start');
    child_process.execSync('echo "<html><body><h3>Hi benpeng</h3><h4>Regression testlistgen start.</h4><h4><a href="http://logviewer-atl/'+inputs.treeRoot+'">Find Details here</a></h4></body></html>" | mutt  Benny.Peng@amd.com  -e \'set content_type="text/html"\' -s [NBIF][regression][isOfficial:'+inputs.isOfficial+'][isBAPU:'+inputs.isBAPU+'][codeline:'+inputs.codeline+'][branch_name:'+inputs.branch_name+'][changelist:'+inputs.changelist+'][shelve:'+inputs.shelve+'][TESTLISTGENSTART]');//FIXME should come from configuration_id
    child_process.exec(inputs.treeRoot+'/testlist.script',{
      maxBuffer : 200*1024*1024
    },async function(err_tl,stdout_tl,stderr_tl){
      let gettestlistendtime  = new moment();
      console.log(loginit()+treeRoot+' testlist cost '+moment.duration(gettestlistendtime.diff(gettestliststarttime)).as('minutes')+' minutes');
      //parse testlist 
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
      runtext += 'cd '+inputs.treeRoot+'\n';
      runtext += 'bootenv -v '+inputs.variantname+' -out_anchor '+inputs.treeRoot+'/out.'+inputs.variantname+'\n';
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
          testlist[index]['variantname']=inputs.variantname;
          testlist[index]['seed']=Math.floor((Math.random()*999999)+1);//
        }
        if(regx02.test(lines[l])){
          flag  = 0;
          index++;
        }
        if(flag ==  1){
          //kickoffdate
          testlist[index]['kickoffdate']  = inputs.kickoffdate;
          //testname 
          if(regx03.test(lines[l])){
            lines[l].replace(regx03,function(rs,$1){
              testlist[index]['name'] = $1;
              //console.log(loginit()+inputs.treeRoot+' name '+testlist[index]['name']);
            });
          }
          //run_out_path
          if(regx08.test(lines[l])){
            lines[l].replace(regx08,function(rs,$1){
              let out_home  = inputs.treeRoot+'/out.'+inputs.variantname+'.'+inputs.kickoffdate+'/out/linux_3.10.0_64.VCS';//TODO
              let regxouthome = /\$OUT_HOME/;
              let R = $1;
              R = R.replace(regxouthome,out_home);
              testlist[index]['run_out_path'] = R;
              //console.log(loginit()+inputs.treeRoot+' run_out_path '+testlist[index]['run_out_path']);
            });
          }
          //group
          if(regx06.test(lines[l])){
            lines[l].replace(regx06,function(rs,$1){
              testlist[index]['group'] = $1;
              //console.log(loginit()+inputs.treeRoot+' group '+testlist[index]['group']);
            });
          }
          //suite 
          //config
          if(regx04.test(lines[l])){
            lines[l].replace(regx04,function(rs,$1){
              testlist[index]['config'] = $1;
              //console.log(loginit()+inputs.treeRoot+' config '+testlist[index]['config']);
            });
          }
        }
      }
      console.log(loginit()+inputs.treeRoot+' test number is '+testlist.length);
      child_process.execSync('echo "<html><body><h3>Hi benpeng</h3><h4>Regression testlistgen done. '+testlist.length+' tests found </h4><h4><a href="http://logviewer-atl/'+inputs.treeRoot+'">Find Details here</a></h4></body></html>" | mutt  Benny.Peng@amd.com  -e \'set content_type="text/html"\' -s [NBIF][regression][isOfficial:'+inputs.isOfficial+'][isBAPU:'+inputs.isBAPU+'][codeline:'+inputs.codeline+'][branch_name:'+inputs.branch_name+'][changelist:'+inputs.changelist+'][shelve:'+inputs.shelve+'][TESTLISTGENDONE]');//FIXME should come from configuration_id
      
      let passon  = JSON.parse(JSON.stringify(inputs));
      passon.testlist = testlist;
      await Regressionsummary.update({
        codeline      : inputs.codeline,
        branch_name   : inputs.branch_name,
        changelist    : inputs.changelist,
        shelve        : inputs.shelve,//should be a list
        kickoffdate   : inputs.kickoffdate,
        describe      : inputs.describe,
        isOfficial    : inputs.isOfficial,
        isBAPU        : inputs.isBAPU,
        variantname   : inputs.variantname,
        grouplist     : inputs.grouplist,
        username      : inputs.username,
      },{
        testnumber    : testlist.length,
        passnumber    : 0,
        failnumber    : 0,
        passrate      : 0,
        notrunnumber  : testlist.length,
        runningnumber : 0,
      });
      await sails.helpers.runtask.with(passon);
    });
  }


};

