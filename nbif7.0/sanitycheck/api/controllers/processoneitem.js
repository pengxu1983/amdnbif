module.exports = {


  friendlyName: 'Processoneitem',


  description: 'Processoneitem something.',


  inputs: {
    codeline          : {type:'string'},
    branch_name       : {type:'string'},
    changelist        : {type:'number'},
    shelve            : {type:'string'},
    username          : {type:'string'},
    MASK              : {type:'string'},
    result            : {type:'string'},
    resultlocation    : {type:'string'},
    details           : {type:'string'}, 
    describe          : {type:'string'},
    checktype         : {type:'string'},
    testlist          : {type:'string'},
    submitdate        : {type:'string'},
    runtime           : {type:'number'},
    workspace         : {type:'string'},
  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
