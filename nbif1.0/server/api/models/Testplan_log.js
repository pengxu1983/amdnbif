/**
 * Testplan_log.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    batchname         : {
      type            : 'string'
    },
    projectname       : {
      type            : 'string'
    },
    variantname       : {
      type            : 'string'
    },
    isofficial        : {
      type            : 'string',
      isIn            : ['yes','no'],
      defaultsTo      : 'no'
    },
    mode              : {
      type            : 'string'
    },
    changelist        : {
      type            : 'string'
    },
    passingrate       : {
      type            : 'string',
      defaultsTo      : '0.00'
    },
    totalnum          : {
      type            : 'number',
      columnType      : 'int(10)',
      defaultsTo      : 0
    },
    passednum         : {
      type            : 'number',
      columnType      : 'int(10)',
      defaultsTo      : 0
    },
    failednum         : {
      type            : 'number',
      columnType      : 'int(10)',
      defaultsTo      : 0
    },
    unknownnum        : {
      type            : 'number',
      columnType      : 'int(10)',
      defaultsTo      : 0
    },
    updatetime        : {
      type            : 'string',
      defaultsTo      : 'NA'
    },
    kickofftime       : {
      type            : 'string',
      defaultsTo      : 'NA'
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

