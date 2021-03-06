/**
 * Buffer_changelists.js
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
      type  : 'string'
    },
    owner       : {
      type  : 'string'
    },
    ischecked : {
      type  : 'string'
    },
    results   : {
      type        : 'string',
      columnType  : 'longtext'
    },
    isBroken  : {
      type    : 'string'
    },
    brokenCL  : {
      type    : 'string'
    },
    dcelab    : {
      type    : 'string',
      columnType  : 'longtext'
    },
    dcelabischecked : {
      type    : 'string'
    },
    dcelabisBroken : {
      type    : 'string'
    },
    dcelabbrokenCL  : {
      type    : 'string'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

