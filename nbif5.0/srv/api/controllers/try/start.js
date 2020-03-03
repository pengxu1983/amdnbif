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
    if(!fs.existsSync(inputs.treeRoot+'/testlist.log')){
      return exits.success(JSON.stringify({
        ok  : 'notok',
        msg : 'file testlist.log not found'
      }));
    }
    else{
      sails.log('testlist.log ok');
      //configuration_id
      if(!fs.existsSync(inputs.treeRoot+'/configuration_id')){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'file configuration_id not found'
        }));
      }
      sails.log('configuration_id ok');
      let lines = fs.readFileSync(inputs.treeRoot+'/configuration_id','utf8').split('\n');
      let regx01  =/(\w+)\/(\w+)@(\w+)/;
      lines.pop();
      let codeline;
      let branch_name;
      let changelist;
      let projectname;
      let shelve;
      let kickoffdate;
      lines[0].replace(regx01,function(rs,$1,$2,$3){
        codeline  = $1;
        branch_name = $2;
        changelist  = $3;
      });
      //NBIF_TREE_INFO
      if(!fs.existsSync(inputs.treeRoot+'/NBIF_TREE_INFO')){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'file NBIF_TREE_INFO not found'
        }));
      }
      lines = fs.readFileSync(inputs.treeRoot+'/NBIF_TREE_INFO','utf8').split('\n');
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
        });
      }
      //testlist.log
      let tests = [];
      lines = fs.readFileSync(inputs.treeRoot+'/testlist.log','utf8').split('\n');
      lines.pop();
      regx01  = /^\[dj \d+:\d+:\d+ I\]: PASSED ctxt (\w+), evaluation of 'testcase '(nbif\(:\w+, :)(\w+)\)::(.*)\/(.*)''/;
      for(let l=0;l<lines.length;l++){
        if(regx01.test(lines[l])){
          lines[l].replace(regx01,function(rs, $1,$2,$3,$4,$5){
            //sails.log('variantname '+$1);
            //sails.log('testname '+$5);
            //sails.log('codeline '+codeline);
            //sails.log('branch_name '+branch_name);
            //sails.log('changelist '+changelist);
            //sails.log('projectname '+projectname);
            //sails.log('shelve '+shelve);
            //sails.log('kickoffdate '+kickoffdate);
            let variantname = $1;
            let suite = $4;
            let testname  = $5;
            let caseid  = {
              variantname : variantname,
              suite       : suite,
              testname    : testname,
              codeline    : codeline,
              branch_name : branch_name,
              changelist  : changelist,
              projectname : projectname,
              kickoffdate : kickoffdate,
              shelve      : shelve
            };
            //let onecase = JSON.parse(JSON.stringify(caseid));
            //onecase.seed         = 'NA';
            //onecase.result       = 'notstarted';
            //onecase.signature    = 'NA';
            //onecase.starttime    = 'NA';
            //onecase.endtime      = 'NA';
            tests.push(caseid);
          });
        }
      }
      sails.log(tests.length);
      for(let t=0;t<tests.length;t++){
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
