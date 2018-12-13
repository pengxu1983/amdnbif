/**
 * Regression_log.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
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
    isofficial        : {
      type            : 'string',
      isIn            : ['yes','no'],
      defaultsTo      : 'no'
    },
    mode              : {
      type            : 'string'
    },
    testlist          : {
      type            : 'string',
      columnType      : 'longtext'
    },
    startdate         : {
      type            : 'string'
    },
    starttime         : {
      type            : 'string'
    },
    changelist        : {
      type            : 'string'
    },
    regressionlocation: {
      type            : 'string'
    },
    regressionsite    : {
      type            : 'string',
      isIn            : ['cyb','srdc']
    },
    operator          : {
      type            : 'string'
    },
    passingrate       : {
      type            : 'string'
    }
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

