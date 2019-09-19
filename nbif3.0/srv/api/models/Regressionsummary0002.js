/**
 * Regressionsummary0002.js
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
    },
    isBAPU      : {
      type      : 'string',
    },
    passlist    : {
      type      : 'string',
    },
    faillist    : {
      type      : 'string',
    },
    unknownlist : {
      type      : 'string',
    },
    runninglist : {
      type      : 'string',
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

