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
        else if(groups[g].variantname == ''){
        }
        else {
          let onegroup = await Groups.findOne({
            groupname : groups[g].groupname,
            projectname : groups[g].projectname,
            variantname : groups[g].variantname,
            isBAPU      : groups[g].isBAPU,
          });
          if(onegroup){
            await Groups.update({
              groupname : groups[g].groupname,
              //DVgroup   : groups[g].DVgroup,
              //owner     : groups[g].owner,
              projectname : groups[g].projectname,
              variantname : groups[g].variantname,
              isBAPU      : groups[g].isBAPU,
            },{
              //groupname : groups[g].groupname,
              DVgroup   : groups[g].DVgroup,
              owner     : groups[g].owner
            });
          }
          else{
            await Groups.create({
              groupname : groups[g].groupname,
              DVgroup   : groups[g].DVgroup,
              owner     : groups[g].owner,
              projectname : groups[g].projectname,
              variantname : groups[g].variantname,
              isBAPU      : groups[g].isBAPU,
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
