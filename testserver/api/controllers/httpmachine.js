module.exports = {


  friendlyName: 'Httpmachine',


  description: 'Httpmachine something.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    
    let postData = querystring.stringify({
      'projectname': 'mi200',
      'variantname': 'nbif_nv10_gpu',
      'isBAPU': 'no',
      'changelist': '3985547',
      'kickoffdate': '2019-08-13',
      'shelve': 'NA' }
    });
    
    let options = {
      hostname: 'amdnbif3.thehunters.club',
      port: 80,
      path: '/regression/summary',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    let req = http.request(options, (res) => {
      //console.log(`STATUS: ${res.statusCode}`);
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

    // All done.
    return;

  }


};
