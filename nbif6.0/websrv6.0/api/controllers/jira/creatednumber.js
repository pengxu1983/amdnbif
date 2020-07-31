module.exports = {


  friendlyName: 'Creatednumber',


  description: 'Creatednumber jira.',


  inputs: {
    start : {
      type  : 'string'
    },
    end   : {
      type  : 'string'
    },
    projectlist : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/jira/createdNumber');
    sails.log(inputs);
    let result  = {};
    let projectlist = JSON.parse(inputs.projectlist);
    for(let p=0;p<projectlist.length;p++){
      //Floyd
      if(projectlist[p] ==  'Floyd'){
        let R = await Jiradetails.find({

        });
        result['Floyd'] = 
      }
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok',
      result  : JSON.stringify(result)
    }));

  }


};
