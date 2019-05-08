var querystring   = require('querystring');
var moment        = require('moment');
var http          = require('http');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
var jobid_cal_passingrates  = new cronJob('0 */30 * * * *',function(){
  console.log('jobid_cal_passingrates start at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  let postData = querystring.stringify({
    'kind': 'calpassingrate'
  });
  
  let options = {
    hostname: 'localhost',
    port: 7001,
    path: '/regression/uploadstatus',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  let req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    //console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });
  
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  // write data to request body
  req.write(postData);
  req.end();

},null,true,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Uploadstatus',


  description: 'Uploadstatus regression.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    },
    testname  : {
      type  : 'string'
    },
    onetestresult : {
      type  : 'string'
    },
    results : {
      type  : 'string'
    },
    result  : {
      type  : 'string'
    },
    kickoffdate : {
      type  : 'string'
    },
    testlist  : {
      type  : 'string'
    },
    mode  : {
      type  : 'string'
    },
    changelist  : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    signature   : {
      type  : 'string'
    },
    seed        : {
      type  : 'string'
    },
    suite       : {
      type  : 'string'
    },
    shelve      : {
      type  : 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/regression/uploadstatus');
    sails.log(inputs);
    let variants = await Variants.find({
      id  : {'>=':0}
    });
    if(inputs.kind  ==  'basictreeinfoall'){
      let onebasicinfoall = await Teststatusvariant01_summary.findOne({
        mode          : inputs.mode,
        kickoffdate   : inputs.kickoffdate,
        changelist    : inputs.changelist,
        testplanname  : 'all',
        variantname   : inputs.variantname,
        projectname   : inputs.projectname
      });
      if(onebasicinfoall){
      }
      else{
        await Teststatusvariant01_summary.create({
          mode          : inputs.mode,
          kickoffdate   : inputs.kickoffdate,
          changelist    : inputs.changelist,
          testplanname  : 'all',
          testlist      : inputs.testlist,
          variantname   : inputs.variantname,
          projectname   : inputs.projectname
        });
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        kind : 'basictreeinfoall',
        url  : '/regression/uploadstatus'
      }));
    }
    else if(inputs.kind  ==  'singletest'){
      if(inputs.variantname == 'nbif_al_gpu'){
        let R = await Teststatusvariant01.findOne({
          testname  : inputs.testname,
          kickoffdate : inputs.kickoffdate,
          projectname : inputs.projectname
        });
        if(R){
          await Teststatusvariant01.update({
            testname  : inputs.testname,
            kickoffdate : inputs.kickoffdate,
            projectname : inputs.projectname
          },{
            kickoffdate   : inputs.kickoffdate   ,
            //variantname   : inputs.variantname   ,
            changelist    : inputs.changelist    ,
            //projectname   : inputs.projectname   ,
            //testname      : inputs.testname      ,
            mode          : inputs.mode          ,
            result        : inputs.result        ,
            seed          : inputs.seed          ,
            signature     : inputs.signature     ,
            suite         : inputs.suite         ,
            shelve        : inputs.shelve        ,
            updatetime    : moment().format('YYYY-MM-DD HH:mm:ss')
          });
        }
        else {
          await Teststatusvariant01.create({
            kickoffdate   : inputs.kickoffdate   ,
            variantname   : inputs.variantname   ,
            changelist    : inputs.changelist    ,
            projectname   : inputs.projectname   ,
            testname      : inputs.testname      ,
            mode          : inputs.mode          ,
            result        : inputs.result        ,
            seed          : inputs.seed          ,
            signature     : inputs.signature     ,
            suite         : inputs.suite         ,
            shelve        : inputs.shelve        , 
            updatetime    : moment().format('YYYY-MM-DD HH:mm:ss')
          });
        }
      }
      ////clean up too early
      //let onetestresultfrominput  = JSON.parse(inputs.onetestresult);
      //let R     = await Teststatusvariant01.findOne({
      //  testname  : inputs.testname
      //});
      //sails.log(R);
      //let onetestresultToStore  = {};
      //onetestresultToStore[inputs.kickoffdate]={};
      ////test already exists
      //if(R){
      //  let onetestresultfromDB = R;
      //  let resultbyday = JSON.parse(onetestresultfromDB.resultbyday);
      //  //Clean up too old record
      //  for(let storeddate in resultbyday){
      //    if(moment(storeddate).add(15,'days').isBefore(inputs.kickoffdate)){
      //      delete resultbyday[storeddate];
      //    }
      //  }
      //  onetestresultToStore  = resultbyday;
      //  onetestresultToStore[inputs.kickoffdate]= {};
      //  //store new record
      //  onetestresultToStore[inputs.kickoffdate]['changelist']  = onetestresultfrominput['changelist'];
      //  onetestresultToStore[inputs.kickoffdate]['result']      = onetestresultfrominput['result']    ;
      //  onetestresultToStore[inputs.kickoffdate]['seed']        = onetestresultfrominput['seed']      ;
      //  onetestresultToStore[inputs.kickoffdate]['signature']   = onetestresultfrominput['signature'] ;
      //  onetestresultToStore[inputs.kickoffdate]['mode']        = onetestresultfrominput['mode']      ;
      //  onetestresultToStore[inputs.kickoffdate]['suite']       = onetestresultfrominput['suite']     ;
      //  await Teststatusvariant01.update({
      //    testname  : inputs.testname
      //  },{
      //    testplanname  : 'NA',//TODO
      //    resultbyday : JSON.stringify(onetestresultToStore)
      //  });
      //}
      ////test no previous record
      //else{
      //  onetestresultToStore[inputs.kickoffdate]['changelist']  = onetestresultfrominput['changelist'];
      //  onetestresultToStore[inputs.kickoffdate]['result']      = onetestresultfrominput['result']    ;
      //  onetestresultToStore[inputs.kickoffdate]['seed']        = onetestresultfrominput['seed']      ;
      //  onetestresultToStore[inputs.kickoffdate]['signature']   = onetestresultfrominput['signature'] ;
      //  onetestresultToStore[inputs.kickoffdate]['mode']        = onetestresultfrominput['mode']      ;
      //  onetestresultToStore[inputs.kickoffdate]['suite']       = onetestresultfrominput['suite']     ;
      //  await Teststatusvariant01.create({
      //    testname  : inputs.testname,
      //    testplanname  : 'NA',//TODO
      //    resultbyday : JSON.stringify(onetestresultToStore)
      //  });
      //}
      return exits.success(JSON.stringify({
        ok  : 'ok'
      }));
    }
    else if(inputs.kind ==  'calpassingrate'){
      let checkingdate = moment().subtract(1,'days').format('YYYY-MM-DD');
      let R1 =  await Teststatusvariant01_summary.findOne({
        kickoffdate : checkingdate,
        variantname : 'nbif_al_gpu',
        projectname : 'mero'
      });
      if(R1){
        let testlist    = JSON.parse(R1.testlist);
        let passingrate;
        let passlist  = [];
        let faillist  = [];
        let unknownlist = [];
        for(let t=0;t<testlist.length;t++){
          let R2 = await Teststatusvariant01.findOne({
            testname  : testlist[t],
            variantname : 'nbif_al_gpu',
            projectname : 'mero'
          });
          if(R2){
            if(R2.result == 'PASS'){
              passlist.push(testlist[t]);
            }
            else if(R2.result == 'PASS'){
              faillist.push(testlist[t]);
            }
            else if(R2.result == 'UNKNOWN'){
              unknownlist.push(testlist[t]);
            }
          }
          else{
            unknownlist.push(testlist[t]);
          }
          //if(R2){
          //  let resultbyday = JSON.parse(R2.resultbyday);
          //  if(resultbyday.hasOwnProperty(checkingdate)){
          //    if(resultbyday[checkingdate]['result'] == 'PASS'){
          //      passlist.push(testlist[t]);
          //    }
          //    if(resultbyday[checkingdate]['result'] == 'FAIL'){
          //      faillist.push(testlist[t]);
          //    }
          //    if(resultbyday[checkingdate]['result'] == 'UNKNOWN'){
          //      unknownlist.push(testlist[t]);
          //    }
          //  }
          //}
          //else{
          //  unknownlist.push(testlist[t]);
          //}
        }
        if(passlist.length == 0){
          passingrate = 0.00;
        }
        else{
          passingrate = 100*(passlist.length)/(testlist.length);
          passingrate = passingrate.toFixed(2);
        }
        await Teststatusvariant01_summary.update({
          kickoffdate : checkingdate,
          projectname : 'mero',
          variantname : 'nbif_al_gpu'
        },{
          passingrate : passingrate,
          passlist    : JSON.stringify(passlist),
          faillist    : JSON.stringify(faillist),
          unknownlist : JSON.stringify(unknownlist)
        });
        return exits.success(JSON.stringify({
          ok  : 'ok'
        }));
      }
      else{
      }
    }
    return exits.success(JSON.stringify({
      ok  : 'notok'
    }));
  }


};
