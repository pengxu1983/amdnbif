/**
 * Teststatusvariant01.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    testname  : {
      type    : 'string'
    },
    testplanname  : {
      type    : 'string'
    },
    resultbyday : {
      type    : 'string',
      columnType: 'longtext'
    },
    kickoffdate : {
      type    : 'string'
    },
    result      : {
      type    : 'string'
    },
    variant     : {
      type    : 'string'
    },
    projectname : {
      type    : 'string'
    },
    signature   : {
      type    : 'string'
    },
    updatetime  : {
      type    : 'string'
    },
    changelist  : {
      type    : 'string'
    },
    seed        : {
      type    : 'string'
    }.
    mode        : {
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

