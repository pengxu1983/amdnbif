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
                DVlead        : projects[p].DVlead,
                DElead        : projects[p].DElead,
                PM            : projects[p].PM
              });
            }
            else{
              await Projects.create({
                projectname   : projects[p].projectname,
                validvariants : JSON.stringify(projects[p].validvariants),
                milestones    : JSON.stringify(projects[p].milestones),
                DVlead        : projects[p].DVlead,
                DElead        : projects[p].DElead,
                PM            : projects[p].PM
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
