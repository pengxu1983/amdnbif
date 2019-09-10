/**
 * Regressionsummary0001.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    changelist  : {
      type      : 'string'
    },
    projectname : {
      type      : 'string'
    },
    variantname : {
      type      : 'string'
    },
    shelve      : {
      type      : 'string'
    },
    testlist    : {
      type      : 'string',
      columnType: 'longtext'
    },
    isBAPU      : {
      type      : 'string',
    },
    passlist    : {
      type      : 'string',
      columnType: 'longtext'
    },
    faillist    : {
      type      : 'string',
      columnType: 'longtext'
    },
    unknownlist : {
      type      : 'string',
      columnType: 'longtext'
    },
    runninglist : {
      type      : 'string',
      columnType: 'longtext'
    },
    groupname   : {
      type      : 'string'
    },
    kickoffdate: {
      type      : 'string'
    },
    checkedtime : {
      type      : 'string'
    },
    passrate    : {
      type      : 'string'
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};
