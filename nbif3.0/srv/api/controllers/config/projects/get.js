module.exports = {


  friendlyName: 'Get',


  description: 'Get projects.',


  inputs: {
    kind  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/projects/get');
    sails.log(inputs);
    if(inputs.kind  ==  'all'){
      let R  = await Projects.find({
        id  : {'>=':0}
      });
      if(R.length  ==  0){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'DB is empty'
        }));
      }
      else{
        let projects  = [];
        for(let r=0;r<R.length;r++){
          projects.push({
            projectname   : R[r].projectname,
            validvariants : JSON.parse(R[r].validvariants),
            //validmodes    : JSON.parse(R[r].validmodes),
            milestones    : JSON.parse(R[r].milestones),
            ownerships    : JSON.parse(R[r].ownerships)
          });
        }
        return exits.success(JSON.stringify({
          ok  : 'ok',
          projects  : JSON.stringify(projects)
        }));
      }
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
