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
    },
    projectname : {
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
    let openedNumber = [];
    let implementedNumber = [];
    let deferredNumber= [];
    let rejectedNumber= [];
    for(let i=0;i<datax.length;i++){
      let tmp = await Nbifinternal.count({
        Issue_Type  : 'Defect',
        Variant : inputs.projectname,
        Created : moment(datax[i]).format('YYYY/MM/DD')
      });
      createdNumber.push(tmp);
      tmp = await Nbifinternal.count({
        Issue_Type  : 'Defect',
        Variant : inputs.projectname,
        Closed_Date : moment(datax[i]).format('YYYY/MM/DD')
      });
      sails.log(moment(datax[i]).format('YYYY/MM/DD'));
      closedNumber.push(tmp);
      tmp = await Nbifinternal.count({
        Issue_Type  : 'Defect',
        Variant : inputs.projectname,
        Rejected_Date : moment(datax[i]).format('YYYY/MM/DD')
      });
      sails.log(moment(datax[i]).format('YYYY/MM/DD'));
      rejectedNumber.push(tmp);
      tmp = await Nbifinternal.count({
        Issue_Type  : 'Defect',
        Variant : inputs.projectname,
        Deferred_Date: moment(datax[i]).format('YYYY/MM/DD')
      });
      sails.log(moment(datax[i]).format('YYYY/MM/DD'));
      deferredNumber.push(tmp);
    }
    sails.log('aaa');
    sails.log(createdNumber);
    sails.log(closedNumber);
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok',
      datay_created : JSON.stringify(createdNumber),
      datay_closed  : JSON.stringify(closedNumber),
      //datay_implemented: JSON.stringify(implementedNumber),
      datay_deferred: JSON.stringify(deferredNumber),
      datay_rejected: JSON.stringify(rejectedNumber),
    }));

  }


};
