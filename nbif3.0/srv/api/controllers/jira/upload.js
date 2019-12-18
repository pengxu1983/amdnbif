var fs =require('fs');
var parse = require('csv-parse');
var moment = require('moment');
module.exports = {


  friendlyName: 'Try',


  description: 'Try something.',


  inputs: {
    
  },


  exits: {

  },


  fn: async function (inputs) {
    sails.log('try');
    let lines = fs.readFileSync(__dirname+'/../../../../meta/nbifinternal.csv','utf8').split('\n');
    lines.pop();
    for(let i = 0 ;i<lines.length;i++){
      lines[i]  = lines[i].substring(0,lines[i].length-1);
    }
    let regx04  = /(\w)\s(\w)/g
    sails.log(lines[0]);
    lines[0]  = lines[0].replace(regx04,"$1_$2");
    sails.log(lines[0]);
    let text = lines.join('\n');
    fs.writeFileSync(__dirname+'/../../../../meta/nbifinternal_post.csv',text,{
      encoding  : 'utf8',
      mode      : '0600',
      flag      : 'w'
    });
    let parser = parse({
      delimiter: ',',
      columns: true
    }, async function(err, data){
      sails.log(data);
      sails.log(typeof(data));
      sails.log(data.length);
      sails.log(__dirname);
      await Nbifinternal.destroy({id:{'>=':0}});
      for(let i=0;i<data.length;i++){
        data[i].Created = moment(data[i].Created,'YYYY/M/D H:mm').format('YYYY/MM/DD');
        data[i].Due_Date= moment(data[i].Due_Date,'DD-MMM-YY').format('YYYY/MM/DD');
        data[i].Est_Deliver_Date= moment(data[i].Est_Deliver_Date,'DD-MMM-YY').format('YYYY/MM/DD');
        data[i].Closed_Date= moment(data[i].Closed_Date,'YYYY/M/D H:mm').format('YYYY/MM/DD');
        data[i].Rejected_Date= moment(data[i].Rejected_Date,'YYYY/M/D H:mm').format('YYYY/MM/DD');
        data[i].Updated= moment(data[i].Updated,'YYYY/M/D H:mm').format('YYYY/MM/DD');
      }
      await Nbifinternal.createEach(data);
    });
    fs.createReadStream(__dirname+'/../../../../meta/nbifinternal_post.csv').pipe(parser);
    // All done.
    return;

  }


};
