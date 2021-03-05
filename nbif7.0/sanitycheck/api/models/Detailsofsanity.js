/**
 * Details.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    codeline    : {type:'string'},
    branch_name : {type:'string'},
    changelist  : {type:'number'},
    shelve      : {type:'string'},
    username    : {type:'string'},
    result      : {type:'string'},
    describe    : {type:'string'},
    tasktype    : {type:'string'},
    casename    : {type:'string'},
    variantname : {type:'string'},
    checktype   : {type:'string'},
    isBAPU      : {type:'string'},
    runtime     : {type:'number'},
    runopt      : {type:'string'},
    isBAPU      : {type:'string'},
    suite       : {type:'string'},
    config      : {type:'string'},
    treeRoot    : {type:'string',columnType:'longtext'},
    outanchor   : {type:'string'},

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

