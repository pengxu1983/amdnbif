var moment        = require('moment');
var querystring   = require('querystring');
var http          = require('http');
var fs            = require('fs');
var child_process = require('child_process');
var cronJob       = require("cron").CronJob;
var workspace     = '/proj/bif_nbio_vol1_backup/benpeng/';
let changelistToRun ;
var jobid_dcelab_run = new cronJob('0 */10 * * * *',function(){
  console.log('jobid_dcelab_run start at '+moment().format('YYYY-MM-DD HH:mm:ss'));
  jobid_dcelab_run.stop();
  let variants  ;
  let projects  ;
  //get latest cl of main tree from DB
  let postData = querystring.stringify({
    'kind': 'getcltorun'
  });
  
  let options = {
    hostname: 'amdnbif.thehunters.club',
    port: 80,
    //path: '/sanitys/common-sanity/getcommonsanitystatus',
    path: '/sanitys/dcelab/getcltorun',
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

      if(JSON.parse(chunk).ok == 'notok'){
        console.log(JSON.parse(chunk).msg);
        jobid_dcelab_run.start();
        return;
      }
      if(JSON.parse(chunk).lastcheckedCL == changelistToRun){
        console.log('cl '+changelistToRun+' already have dcelab report');
        jobid_dcelab_run.start();
        return;
      }
      changelistToRun = JSON.parse(chunk).lastcheckedCL;
      let postData = querystring.stringify({
        'kind': 'infofordcelab'
      });
      
      let options = {
        hostname: 'amdnbif.thehunters.club',
        port: 80,
        path: '/sanitys/common-sanity/infofordcelab',
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
          if(JSON.parse(chunk).ok == 'notok'){
            console.log(JSON.parse(chunk).msg);
            return;
          }
          else if(JSON.parse(chunk).ok == 'ok'){
            projects  = JSON.parse(chunk).projects;
            variants  = JSON.parse(chunk).variants;
            //clean up workspace
            let results = {};
            for(let v=0;v<variants.length;v++){
              let treeRoot = workspace+'/nbif.dcelab.main.'+variants[v].variantname;
              let text = '';
              text += '#!/tool/pandora64/bin/tcsh\n';
              text += 'cd '+treeRoot+'\n';
              text += 'source /proj/verif_release_ro/cbwa_initscript/current/cbwa_init.csh\n';
              if(fs.existsSync(treeRoot)){
                if(fs.existsSync(treeRoot+'/out')){
                  //child_process.execSync('mv '+treeRoot+'/out'+' '+treeRoot+'/out.toRemove');
                  //child_process.exec('rm -rf '+treeRoot+'/out.toRemove');
                  fs.renameSync(treeRoot+'/out',treeRoot+'/out.toRemove');
                  child_process.exec('rm -rf '+treeRoot+'/out.toRemove');
                }
                if(fs.existsSync(treeRoot+'/dcelab.log')){
                  //child_process.execSync('mv '+treeRoot+'/dcelab.log '+treeRoot+'/dcelab.log.toRemove');
                  //child_process.exec('rm -rf '+treeRoot+'/dcelab.log.toRemove');
                  fs.renameSync(treeRoot+'/dcelab.log',treeRoot+'/dcelab.log.toRemove');
                  fs.unlinkSync(treeRoot+'/dcelab.log.toRemove');
                }
                text += 'bootenv -v '+variants[v].variantname+'\n';
                text += 'p4w sync_all @'+changelistToRun+'\n';
              }
              else {
                fs.mkdirSync(treeRoot);
                text += 'p4_mkwa -codeline nbif2_0 -cl '+changelistToRun+'\n';
                text += 'bootenv -v '+variants[v].variantname+'\n';
              }
              text += 'bsub -P BIF-SHUB -q normal -Is -J NBIFdcelab -R \'rusage[mem=40000] select[type==RHEL6_64]\' dj -v -l dc_elab.log -e \'releaseflow::dropflow(:rtl_drop).build(:rhea_drop,:rhea_dc)\' -DPUBLISH_BLKS=nbif_shub_wrap_';//TODO need to fix algfs
              if(variants[v].variantname == 'nbif_al_gpu'){
                text += 'algfx\n';
              }
              if(variants[v].variantname == 'nbif_oak_gpu'){
                text += 'oakgfx\n';
              }
              if(variants[v].variantname == 'nbif_nv10_gpu'){
                text += 'gfx -DDISABLE_VDCI2 -DDISABLE_REGSLICE\n';
              }
              if(variants[v].variantname == 'nbif_ssp_ntb'){
                text += 'ntb\n';
              }
              if(variants[v].variantname == 'nbif_ssp_generic_a'){
                text += 'rc_a\n';
              }
              text += 'echo "done"\n'
              fs.writeFileSync(treeRoot+'.script',text,{
                encoding  : 'utf8',
                mode      : '0700',
                flag      : 'w'
              });
              child_process.execFile(treeRoot+'.script',{
                encoding  : 'utf8',
                maxBuffer : 1024*1024*1024
              },(error,stdout,stderr) => {
                if(error){
                  console.log(error);
                }
                //get result
                let lines = stdout.split('\n');
                lines.pop();
                let regx1 = /dj exited successfully/;
                let regx2 = /dj exited with errors/;
                results[variants[v].variantname]  = 'UNKNOWN';
                for(let l=0;l<lines.length;l++){
                  if(regx1.test(lines[l])){
                    results[variants[v].variantname]  = 'PASS';
                    break;
                  }
                  else if(regx2.test(lines[l])){
                    results[variants[v].variantname]  = 'FAIL';
                    break;
                  }
                }
                console.log(variants[v].variantname + ' is '+results[variants[v].variantname]);
                console.log(variants.length);
                let readytosend = 0;
                for(let vv = 0;vv<variants.length;vv++){
                  if(results.hasOwnProperty(variants[vv].variantname)){
                    readytosend += 1;
                  }
                }
                console.log('readytosend is '+readytosend);
                if(readytosend != variants.length){
                }
                else{
                  //send result to DB
                  let postData = querystring.stringify({
                    'kind': 'dcelabuploadstatus',
                    'changelist'  : changelistToRun,
                    'results' : JSON.stringify(results)
                  });
                  
                  let options = {
                    hostname: 'amdnbif.thehunters.club',
                    port: 80,
                    path: '/sanitys/dcelab/uploadstatus',
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
                      jobid_dcelab_run.start();
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
                }
              });
            }

            
          }
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


  friendlyName: 'Process',


  description: 'Process dcelab.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/dcelab/process');
    sails.log(inputs);
    // All done.
    return;

  }


};
