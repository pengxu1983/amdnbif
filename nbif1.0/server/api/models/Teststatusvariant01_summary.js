/**
 * Teststatusvariant01_summary.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    mode  : {
      type  : 'string'
    },
    passingrate : {
      type  : 'string'
    },
    testlist  : {
      type  : 'string',
      columnType  : 'longtext'
    },
    passlist  : {
      type  : 'string',
      columnType  : 'longtext'
    },
    faillist  : {
      type  : 'string',
      columnType  : 'longtext'
    },
    unknownlist  : {
      type  : 'string',
      columnType  : 'longtext'
    },
    changelist    : {
      type  : 'string'
    },
    kickoffdate : {
      type  : 'string'
    },
    testplanname  : {
      type  : 'string'
    },
    variantname : {
      type  : 'string'
    }


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

