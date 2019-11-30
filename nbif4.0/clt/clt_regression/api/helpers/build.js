let moment          = require('moment');
let querystring     = require('querystring');
let http            = require('http');
let fs              = require('fs');
let child_process   = require('child_process');
let cronJob         = require("cron").CronJob;
module.exports = {


  friendlyName: 'Build',


  description: 'Build general.',


  inputs: {
    workspace : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    branchname  :{
      type  : 'string'
    },
    changelist  : {
      type  : 'string'
    },
    shelve      : {
      type  : 'string'
    },
    isBAPU      : {
      type  : 'string'
    },
    isBACO      : {
      type  : 'string'
    }

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.log('tree build script');
    sails.log(inputs);
    let treeRoot = inputs.workspace+'/'+inputs.projectname+'.'+inputs.variantname;
    let text = '';
    text += '#!/tool/pandora64/bin/tcsh\n';
    text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
    text += 'cd '+treeRoot+'\n';
    text += 'bootenv -v '+inputs.variantname+'\n';
    text += 'be_dj -l regression_build_log -m -DREGRESS -DUSE_VRQ -DCGM run_test -s nbifall demo_test_0_nbif_all_rtl  -a execute=off\n';
    if(fs.existsSync(treeRoot+'/testlist.log')){
      let lines     = fs.readFileSync(oneregTreeRoot+'/testlist.log','utf8').split('\n');
      lines.pop();
      let regx01    = /^\[dj \d+:\d+:\d+ I\]:   "testcase": "(.*)"/;
      let regx02    = /^\[dj \d+:\d+:\d+ I\]:   }/;
      let regx03    = /^\[dj \d+:\d+:\d+ I\]:     "name": "(.*)"/;
      let regx04    = /^\[dj \d+:\d+:\d+ I\]:     "config": "(.*)"/;
      let regx05    = /^\[dj \d+:\d+:\d+ I\]:     "run_seed": "(.*)"/;
      let regx06    = /^\[dj \d+:\d+:\d+ I\]:     "group": "(.*)"/;
      let regx07    = /^\[dj \d+:\d+:\d+ I\]:     "run_start_time": "(.*)"/;
      let regx08    = /^\[dj \d+:\d+:\d+ I\]:     "run_out_path": "(.*)"/;
      let regx09    = /^\[dj \d+:\d+:\d+ I\]:     "fullname": "(.*)"/;
      let flag      = 0;
      let testname  = '';
      //parse testlist from testlist.log ////start
      for(let l=0;l<lines.length;l++){
        if(regx01.test(lines[l])){
          flag = 1;
          lines[l].replace(regx01,function(rs,$1){
            let R1 = $1.split('::');
            let R2 = R1[1].split('/');
            testname = R2[1];
            let suite    = R2[0];
            console.log('testname');
            console.log(testname);
          });
        }
        else if(regx02.test(lines[l])){
          flag = 0;
        }
        else if(flag == 1){
          if(regx04.test(lines[l])){
            lines[l].replace(regx04,function(rs,$1){
              console.log('config');
              console.log($1);
            });
          }
          else if(regx05.test(lines[l])){
            lines[l].replace(regx05,function(rs,$1){
              console.log('run_seed');
              console.log($1);
            });
          }
          else if(regx06.test(lines[l])){
            lines[l].replace(regx06,function(rs,$1){
              //if(grouplist.indexOf($1) == -1){
              //  grouplist.push($1);
              //}
              console.log('groupname');
              console.log($1);
            });
          }
          //else if(regx07.test(lines[l])){
          //  lines[l].replace(regx07,function(rs,$1){
          //    //console.log('run_start_time');
          //    //console.log($1);
          //  });
          //}
          else if(regx08.test(lines[l])){
            lines[l].replace(regx08,function(rs,$1){
              let tmp = $1.split('OUT_HOME');
              testResult[testname]['run_out_path'] = oneregTreeRoot+out_home+tmp[1];
              console.log('run_out_path');
              console.log(out_home+tmp[1]);
            });
          }
        }
      }
      //parse testlist from testlist.log ////end
    }
    fs.writeFileSync(treeRoot+'.build',text,{
      encoding  : 'utf8',
      mode      : '0700',
      flag      : 'w'
    });
  }


};

