/**
 * Sanityshelves.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    username  : {
      type    : 'string' 
    },
    shelve    : {
      type    : 'string' 
    },
    MASK      : {
      type    : 'string',
      columnType  : 'longtext'
    },
    result    : {
      type    : 'string'
    },
    resultlocation  : {
      type    : 'string'
    },
    codeline  : {
      type    : 'string'
    },
    branch_name : {
      type    : 'string'
    },
    changelist  : {
      type    : 'string'
    },
    details     : {
      type    : 'string',
      columnType  : 'longtext'
    },
    describe    : {
      type    : 'string',
      columnType  : 'longtext'
    },
    checktype   : {
      type    : 'string'
    },
    testlist    : {
      type      : 'string',
      columnType  : 'longtext'
    },
    submitdate  : {
      type    : 'string'
    },
    runtime     : {
      type    : 'number'
    },
    longesttask : {
      type    : 'string'
    },
    longesttasktype : {
      type    : 'string'
    },
    longestvariantname  : {
      type    : 'string'
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

