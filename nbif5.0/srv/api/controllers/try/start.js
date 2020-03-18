let moment          = require('moment');
let querystring     = require('querystring');
let http            = require('http');
let fs              = require('fs');
let child_process   = require('child_process');
let cronJob         = require("cron").CronJob;
module.exports = {


  friendlyName: 'Start',


  description: 'Start try.',


  inputs: {
    treeRoot  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/try/start');
    sails.log(inputs);
    let localpath = "/local_vol1_nobackup/benpeng/"+inputs.treeRoot;
    child_process.execSync('mkdir -p '+localpath);
    let passwd  = "4rfv^YHN";
    let text ="";
    //NBIF_TREE_INFO
    text += "#!/tool/pandora64/bin/expect\n";
    text += "spawn scp benpeng@atlibex-neu0450:"+inputs.treeRoot+"/NBIF_TREE_INFO"+" "+localpath+"/.\n";
    text += "expect \"*Password:\" { \n";
    text += "  send "+passwd+"\\r"+"\n";
    text += "  expect eof\n";
    text += "}\n";
    fs.writeFileSync(localpath+"/NBIF_TREE_INFO.cp",text, {
      encoding  : 'utf8',
      mode      : '0700',
      flag      : 'w'
    });
    text  = "";
    child_process.execFileSync(localpath+"/NBIF_TREE_INFO.cp");
    //testlist.log
    text += "#!/tool/pandora64/bin/expect\n";
    text += "spawn scp benpeng@atlibex-neu0450:"+inputs.treeRoot+"/testlist.log"+" "+localpath+"/.\n";
    text += "expect \"*Password:\" { \n";
    text += "  send "+passwd+"\\r"+"\n";
    text += "  expect eof\n";
    text += "}\n";
    fs.writeFileSync(localpath+"/testlist.log.cp",text, {
      encoding  : 'utf8',
      mode      : '0700',
      flag      : 'w'
    });
    text  = "";
    child_process.execFileSync(localpath+"/testlist.log.cp");
    //configuration_id
    text += "#!/tool/pandora64/bin/expect\n";
    text += "spawn scp benpeng@atlibex-neu0450:"+inputs.treeRoot+"/configuration_id"+" "+localpath+"/.\n";
    text += "expect \"*Password:\" { \n";
    text += "  send "+passwd+"\\r"+"\n";
    text += "  expect eof\n";
    text += "}\n";
    fs.writeFileSync(localpath+"/configuration_id.cp",text, {
      encoding  : 'utf8',
      mode      : '0700',
      flag      : 'w'
    });
    text  = "";
    child_process.execFileSync(localpath+"/configuration_id.cp");
    if(!fs.existsSync(localpath+'/testlist.log')){
      return exits.success(JSON.stringify({
        ok  : 'notok',
        msg : 'file testlist.log not found'
      }));
    }
    else{
      sails.log('testlist.log ok');
      //configuration_id
      if(!fs.existsSync(localpath+'/configuration_id')){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'file configuration_id not found'
        }));
      }
      sails.log('configuration_id ok');
      let lines = fs.readFileSync(localpath+'/configuration_id','utf8').split('\n');
      let regx01  =/(\w+)\/(\w+)@(\w+)/;
      lines.pop();
      let codeline;
      let branch_name;
      let changelist;
      let projectname;
      let shelve;
      let kickoffdate;
      let variantname;
      let isBAPU;
      lines[0].replace(regx01,function(rs,$1,$2,$3){
        codeline  = $1;
        branch_name = $2;
        changelist  = $3;
      });
      //NBIF_TREE_INFO
      if(!fs.existsSync(localpath+'/NBIF_TREE_INFO')){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'file NBIF_TREE_INFO not found'
        }));
      }
      lines = fs.readFileSync(localpath+'/NBIF_TREE_INFO','utf8').split('\n');
      lines.pop();
      regx01  = /(\w+):::(\S+)/;
      for(let l=0;l<lines.length;l++){
        lines[l].replace(regx01,function(rs,$1,$2){
          sails.log($1,$2);
          if($1 == 'projectname'){
            projectname = $2;
          }
          if($1 == 'shelve'){
            shelve  = $2;
          }
          if($1 == 'kickoffdate'){
            kickoffdate = $2;
          }
          if($1 == 'variantname'){
            variantname = $2;
          }
          if($1 == 'isBAPU'){
            isBAPU  = $2;
          }
        });
      }
      //testlist.log
      let tests = [];
      lines = fs.readFileSync(localpath+'/testlist.log','utf8').split('\n');
      lines.pop();
      regx01  = /^\[dj \d+:\d+:\d+ I\]: PASSED ctxt (\w+), evaluation of 'testcase '(nbif\(:\w+, :)(\w+)\)::(.*)\/(.*)''/;
      let regx001    = /^\[dj \d+:\d+:\d+ I\]:   "attributes": /;
      let regx002    = /^\[dj \d+:\d+:\d+ I\]:   }/;
      let regx003    = /^\[dj \d+:\d+:\d+ I\]:     "name": "(.*)"/;
      let regx004    = /^\[dj \d+:\d+:\d+ I\]:     "config": "(.*)"/;
      let regx005    = /^\[dj \d+:\d+:\d+ I\]:     "group": "(.*)"/;
      let regx006    = /^\[dj \d+:\d+:\d+ I\]:     "run_out_path": "(.*)"/;
      let regx007    = /^\[dj \d+:\d+:\d+ I\]:     "fullname": "nbif\(:(\w+), :(\w+)\)::(\w+)\/\w+"/;
      let flag  = 0;
      let testname;
      let suite;
      let config;
      let group;
      let run_out_path;
      for(let l=0;l<lines.length;l++){
        if(regx001.test(lines[l])){
          flag  = 1;
        }
        if(regx002.test(lines[l])){
          flag  = 0;
          let caseid  = {
            variantname : variantname,
            suite       : suite,
            config      : config,
            groupname   : group,
            testname    : testname,
            codeline    : codeline,
            branch_name : branch_name,
            changelist  : changelist,
            projectname : projectname,
            kickoffdate : kickoffdate,
            shelve      : shelve,
            isBAPU      : isBAPU,
          };
          sails.log(caseid);
          tests.push(caseid);
        }
        if(flag == 1){
          if(regx003.test(lines[l])){
            lines[l].replace(regx003, function(rs,$1){
              testname  = $1;
            });
          }
          if(regx004.test(lines[l])){
            lines[l].replace(regx004, function(rs,$1){
              config  = $1;
            });
          }
          if(regx005.test(lines[l])){
            lines[l].replace(regx005, function(rs,$1){
              group = $1;
            });
          }
          if(regx007.test(lines[l])){
            lines[l].replace(regx007, function(rs,$1,$2,$3){
              //projectname = $2;
              suite = $3;
            });
          }
        }
      }
      sails.log(tests.length);
      for(let t=0;t<tests.length;t++){
        let onegroup  = await Groups.find({
          projectname : tests[t].projectname,
          variantname : tests[t].variantname,
          isBAPU      : tests[t].isBAPU,
          groupname   : tests[t].groupname
        });
        if(onegroup.length > 1){
          await Groups.destroy({
            projectname : tests[t].projectname,
            variantname : tests[t].variantname,
            isBAPU      : tests[t].isBAPU,
            groupname   : tests[t].groupname
          });
          await Groups.create({
            projectname : tests[t].projectname,
            variantname : tests[t].variantname,
            isBAPU      : tests[t].isBAPU,
            groupname   : tests[t].groupname,
            owner       : '',
            DVgroup     : '',
          });
        }
        if(onegroup.length ==0){
          await Groups.create({
            projectname : tests[t].projectname,
            variantname : tests[t].variantname,
            isBAPU      : tests[t].isBAPU,
            groupname   : tests[t].groupname,
            owner       : '',
            DVgroup     : '',
          });
        }
        await Regressiondetails.destroy(tests[t]);
        let onecase = JSON.parse(JSON.stringify(tests[t]));
        onecase.seed         = 'NA';
        onecase.result       = 'notstarted';
        onecase.signature    = 'NA';
        onecase.starttime    = 'NA';
        onecase.endtime      = 'NA';
        await Regressiondetails.create(onecase);
      }
      return exits.success(JSON.stringify({
        ok  : 'ok'
      }));
    }
    // All done.
    return;

  }


};
