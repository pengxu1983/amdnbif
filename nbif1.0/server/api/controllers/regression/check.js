var http = require('http');  
var querystring = require('querystring');  
var moment = require('moment');
module.exports = {


  friendlyName: 'Check',


  description: 'Check regression.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    datestart : {
      type  : 'string'
    },
    dateend : {
      type  : 'string'
    },
    projectname : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    sails.log('/regression/check');
    sails.log(inputs);
    var i = 0;
    var item = "";
    var passingrates_official_normal  = [];
    var passingrates_official_long    = [];
    var passingrates_official_pg      = [];
    var passingrates_official_baco    = [];
    var detailsinfonormal             = [];
    var detailsinfolong               = [];
    var detailsinfobaco               = [];
    var detailsinfopg                 = [];

    
    if(inputs.kind  ==  'rangepassingrate'){
      while(item  != moment(inputs.dateend).format('YYYY-MM-DD')){
        item  = moment(inputs.datestart).add(i,'days').format('YYYY-MM-DD');
        sails.log(item);
        ///////////////////
        //Normal
        ///////////////////
        var one_reg_official_normal = await Regression_log.findOne({
          mode        : 'normal',
          startdate   : item,
          isofficial  : 'yes',
          //variantname     : inputs.variantname,//TODO
          projectname : inputs.variantname//TODO
        });
        if(!one_reg_official_normal){
          one_reg_official_normal = await Regression_log.findOne({
            mode        : 'normal',
            startdate   : moment(item).subtract(1,'days').format('YYYY-MM-DD'),
	          isofficial  : 'yes',
            //variantname     : inputs.variantname,//TODO
            projectname : inputs.variantname//TODO
	        });
	      }
        if(one_reg_official_normal){
          var postData = querystring.stringify({
            'batchname': one_reg_official_normal.batchname
          });
          
          var options = {
            hostname: 'localhost',
            port: 7001,
            path: '/regression/calpassingrate',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(postData)
            }
          };
          
          var req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
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
          passingrates_official_normal.push(one_reg_official_normal.passingrate);
          detailsinfonormal.unshift({
            date            : item,
            changelist      : one_reg_official_normal.changelist,
            totalnum        : one_reg_official_normal.totalnum,
            totalnumdelta   : '',
            passednum       : one_reg_official_normal.passednum,
            failednum       : one_reg_official_normal.failednum,
            unknownnum      : one_reg_official_normal.unknownnum,
          });
        }
        else {
          passingrates_official_normal.push(0.00);
          detailsinfonormal.unshift({
            date            : item,
            changelist      : 'NA',
            totalnum        : 0,
            totalnumdelta   : 0,
            passednum       : 0,
            failednum       : 0,
            unknownnum      : 0,
          });
        }
        ///////////////////
        //Long
        ///////////////////
        var one_reg_official_long= await Regression_log.findOne({
          mode        : 'long',
          startdate   : item,
          isofficial  : 'yes',
          //variantname     : inputs.variantname,//TODO
          projectname : inputs.variantname//TODO
        });
        if(!one_reg_official_long){
          one_reg_official_long= await Regression_log.findOne({
            mode        : 'long',
            startdate   : moment(item).subtract(1,'days').format('YYYY-MM-DD'),
	          isofficial  : 'yes',
            //variantname     : inputs.variantname,//TODO
            projectname : inputs.variantname//TODO
	        });
	      }
        if(one_reg_official_long){
          var postData = querystring.stringify({
            'batchname': one_reg_official_long.batchname
          });
          
          var options = {
            hostname: 'localhost',
            port: 7001,
            path: '/regression/calpassingrate',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(postData)
            }
          };
          
          var req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
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
          passingrates_official_long.push(one_reg_official_long.passingrate);
          detailsinfolong.unshift({
            date            : item,
            changelist      : one_reg_official_long.changelist,
            totalnum        : one_reg_official_long.totalnum,
            totalnumdelta   : '',
            passednum       : one_reg_official_long.passednum,
            failednum       : one_reg_official_long.failednum,
            unknownnum      : one_reg_official_long.unknownnum,
          });
        }
        else {
          passingrates_official_long.push(0.00);
          detailsinfolong.unshift({
            date            : item,
            changelist      : 'NA',
            totalnum        : 0,
            totalnumdelta   : 0,
            passednum       : 0,
            failednum       : 0,
            unknownnum      : 0,
          });
        }
        
        ///////////////////
        //Baco
        ///////////////////
        var one_reg_official_baco= await Regression_log.findOne({
          mode        : 'baco',
          startdate   : item,
          isofficial  : 'yes',
          //variantname     : inputs.variantname,//TODO
          projectname : inputs.variantname//TODO
        });
        if(!one_reg_official_baco){
          one_reg_official_baco= await Regression_log.findOne({
            mode        : 'baco',
            startdate   : moment(item).subtract(1,'days').format('YYYY-MM-DD'),
	          isofficial  : 'yes',
            //variantname     : inputs.variantname,//TODO
            projectname : inputs.variantname//TODO
	        });
	      }
        if(one_reg_official_baco){
          var postData = querystring.stringify({
            'batchname': one_reg_official_baco.batchname
          });
          
          var options = {
            hostname: 'localhost',
            port: 7001,
            path: '/regression/calpassingrate',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(postData)
            }
          };
          
          var req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
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
          passingrates_official_baco.push(one_reg_official_baco.passingrate);
          detailsinfobaco.unshift({
            date            : item,
            changelist      : one_reg_official_baco.changelist,
            totalnum        : one_reg_official_baco.totalnum,
            totalnumdelta   : '',
            passednum       : one_reg_official_baco.passednum,
            failednum       : one_reg_official_baco.failednum,
            unknownnum      : one_reg_official_baco.unknownnum,
          });
        }
        else {
          passingrates_official_baco.push(0.00);
          detailsinfobaco.unshift({
            date            : item,
            changelist      : 'NA',
            totalnum        : 0,
            totalnumdelta   : 0,
            passednum       : 0,
            failednum       : 0,
            unknownnum      : 0,
          });
        }
        
        ///////////////////
        //PG
        ///////////////////
        var one_reg_official_pg= await Regression_log.findOne({
          mode        : 'pg',
          startdate   : item,
          isofficial  : 'yes',
          //variantname     : inputs.variantname,//TODO
          projectname : inputs.variantname//TODO
        });
        if(!one_reg_official_pg){
          one_reg_official_pg= await Regression_log.findOne({
            mode        : 'pg',
            startdate   : moment(item).subtract(1,'days').format('YYYY-MM-DD'),
	          isofficial  : 'yes',
            //variantname     : inputs.variantname,//TODO
            projectname : inputs.variantname//TODO
	        });
	      }
        if(one_reg_official_pg){
          var postData = querystring.stringify({
            'batchname': one_reg_official_pg.batchname
          });
          
          var options = {
            hostname: 'localhost',
            port: 7001,
            path: '/regression/calpassingrate',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(postData)
            }
          };
          
          var req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
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
          passingrates_official_pg.push(one_reg_official_pg.passingrate);
          detailsinfopg.unshift({
            date            : item,
            changelist      : one_reg_official_pg.changelist,
            totalnum        : one_reg_official_pg.totalnum,
            totalnumdelta   : '',
            passednum       : one_reg_official_pg.passednum,
            failednum       : one_reg_official_pg.failednum,
            unknownnum      : one_reg_official_pg.unknownnum,
          });
        }
        else {
          passingrates_official_pg.push(0.00);
          detailsinfopg.unshift({
            date            : item,
            changelist      : 'NA',
            totalnum        : 0,
            totalnumdelta   : 0,
            passednum       : 0,
            failednum       : 0,
            unknownnum      : 0,
          });
        }
        i++;
      }
    }
    return exits.success({
      ok  : 'ok',
      PassingRate_his_normal  : passingrates_official_normal,
      PassingRate_his_long    : passingrates_official_long,
      PassingRate_his_pg      : passingrates_official_pg,
      PassingRate_his_baco    : passingrates_official_baco,
      detailsinfonormal       : detailsinfonormal,
      detailsinfolong         : detailsinfolong,
      detailsinfobaco         : detailsinfobaco,
      detailsinfopg           : detailsinfopg,
    });
  }


};
