/**
 * Regressiondetails.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    codeline    : {
      type      : 'string'
    },
    branch_name : {
      type      : 'string'
    },
    changelist  : {
      type      : 'string'
    },
    projectname : {
      type      : 'string'
    },
    variantname : {
      type      : 'string'
    },
    testname    : {
      type      : 'string'
    },
    seed        : {
      type      : 'string'
    },
    result      : {
      type      : 'string'
    },
    signature   : {
      type      : 'string',
      columnType: 'longtext'
    },
    runtime     : {
      type      : 'string'
    },
    groupname   : {
      type      : 'string'
    },
    isBAPU      : {
      type      : 'string'
    },
    suite       : {
      type      : 'string'
    },
    kickoffdate : {
      type      : 'string'
    },
    shelve      : {
      type      : 'string'
    },
    



    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

