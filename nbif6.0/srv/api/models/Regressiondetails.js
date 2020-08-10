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
    codeline      : {
      type        : 'string'
    },
    branch_name   : {
      type        : 'string'
    },
    changelist    : {
      type        : 'string'
    },
    shelve        : {
      type        : 'string'
    },
    isBAPU        : {
      type        : 'string'
    },
    isOfficial    : {
      type        : 'string'
    },
    seed          : {
      type        : 'string'
    },
    variantname   : {
      type        : 'string'
    },
    signature     : {
      type        : 'string',
      columnType  : 'longtext'
    },
    result        : {
      type        : 'string'
    },
    group         : {
      type        : 'string'
    },
    config        : {
      type        : 'string'
    },
    bsubQ         : {
      type        : 'string'
    },
    casename      : {
      type        : 'string'
    },
    describe      : {
      type        : 'string'
    },
    suite         : {
      type        : 'string'
    },
    kickoffdate   : {
      type        : 'string'
    },
    username      : {
      type        : 'string'
    },
    projectname   : {
      type        : 'string'
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

