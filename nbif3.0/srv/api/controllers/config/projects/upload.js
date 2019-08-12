module.exports = {


  friendlyName: 'Upload',


  description: 'Upload projects.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    projects  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/projects/upload');
    sails.log(inputs);
    let projects  = JSON.parse(inputs.projects);
    if(inputs.kind  ==  'all'){
      if(projects.length  ==  0){
        return exits.success(JSON.stringify({
          ok  : 'notok',
          msg : 'nothing to upload'
        }));
      }
      else{
        for(let p = 0;p<projects.length;p++){
          //sails.log(typeof(projects[p].ownerships));
          sails.log('dbg');
          sails.log(projects[p].isValid);
          let ownerships = projects[p].ownerships;
          let DVlead;
          let DElead;
          let PM;
          let branchname = projects[p].branchname;
          let isValid    = projects[p].isValid;
          for(let i =0;i<ownerships.length;i++){
            if(ownerships[i].title == 'DVlead'){
              DVlead  = ownerships[i].name
            }
            if(ownerships[i].title == 'DElead'){
              DElead  = ownerships[i].name
            }
            if(ownerships[i].title == 'PM'){
              PM  = ownerships[i].name
            }
          }
          if(projects[p].projectname == ''){
          }
          else{
            let R = await Projects.findOne({
              projectname : projects[p].projectname
            });
            if(R){
              await Projects.update({
                projectname   : projects[p].projectname
              },{
                validvariants : JSON.stringify(projects[p].validvariants),
                milestones    : JSON.stringify(projects[p].milestones),
                DVlead        : DVlead,
                DElead        : DElead,
                PM            : PM,
                branchname    : branchname,
                isValid       : isValid
              });
            }
            else{
              await Projects.create({
                projectname   : projects[p].projectname,
                validvariants : JSON.stringify(projects[p].validvariants),
                milestones    : JSON.stringify(projects[p].milestones),
                DVlead        : DVlead,
                DElead        : DElead,
                PM            : PM,
                branchname    : branchname,
                isValid       : isValid
              });
            }
          }
        }
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        msg : 'uploaded'
      }));
    }

    // All done.
    return exits.success(JSON.stringify({
      ok  : 'notok',
      msg : 'no valid kind'
    }));

  }


};
