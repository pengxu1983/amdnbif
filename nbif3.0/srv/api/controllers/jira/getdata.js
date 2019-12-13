let moment = require('moment');
module.exports = {


  friendlyName: 'Getdata',


  description: 'Getdata something.',


  inputs: {
    datax : {
      type  : 'string'
    },
    period  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/getdata');
    sails.log(inputs);
    let datax   = JSON.parse(inputs.datax);
    let period  = inputs.period;
    let createdNumber = [];
    let closedNumber = [];
    for(let i=0;i<datax.length;i++){
      let tmp = await Nbifinternal.count({
        Created : moment(datax[i]).format('YYYY/MM/DD')
      });
      createdNumber.push(tmp);
      tmp = await Nbifinternal.count({
        Closed_Date : moment(datax[i]).format('YYYY/MM/DD')
      });
      sails.log(moment(datax[i]).format('YYYY/MM/DD'));
      closedNumber.push(tmp);
    }
    sails.log('aaa');
    sails.log(createdNumber);
    sails.log(closedNumber);
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok',
      datay_created : JSON.stringify(createdNumber),
      datay_closed  : JSON.stringify(closedNumber)
    }));

  }


};
