module.exports = {


  friendlyName: 'Upload',


  description: 'Upload groups.',


  inputs: {
    kind  : {
      type  : 'string'
    },
    groups  : {
      type  : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs,exits) {
    sails.log('/config/groups/upload');
    sails.log(inputs);
    if(inputs.kind == 'all'){
      let groups  = JSON.parse(inputs.groups);
      for(let g=0;g<groups.length;g++){
        if(groups[g].groupname == ''){
        }
        else if(groups[g].projectname == ''){
        }
        else {
          let onegroup = await Groups.findOne({
            groupname : groups[g].groupname,
            projectname : groups[g].projectname
          });
          if(onegroup){
            await Groups.update({
              groupname : groups[g].groupname,
              //DVgroup   : groups[g].DVgroup,
              //owner     : groups[g].owner,
              projectname : groups[g].projectname
            },{
              //groupname : groups[g].groupname,
              DVgroup   : groups[g].DVgroup,
              owner     : JSON.stringify(groups[g].owner)
            });
          }
          else{
            await Groups.create({
              groupname : groups[g].groupname,
              DVgroup   : groups[g].DVgroup,
              owner     : JSON.stringify(groups[g].owner),
              projectname : groups[g].projectname
            });
          }
        }
      }
      return exits.success(JSON.stringify({
        ok  : 'ok',
        msg : 'group updated'
      }));
    }
    // All done.
    return exits.success(JSON.stringify({
      ok  : 'ok',
      msg : 'no valid kind'
    }));

  }


};
