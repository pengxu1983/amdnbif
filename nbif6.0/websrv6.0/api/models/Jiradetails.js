/**
 * Jiradetails.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    reporter  : {
      type    : 'string'
    },
    assignee  : {
      type    : 'string'
    },
    createdDate : {
      type    : 'string'
    },
    updatedDate : {
      type    : 'string'
    },
    dueDate     : {
      type    : 'string'
    },
    closedDate  : {
      type    : 'string'
    },
    deferredDate  : {
      type    : 'string'
    },
    lastComment : {
      type    : 'string',
      columnType  : 'longtext'
    },
    description : {
      type    : 'string',
      columnType  : 'longtext'
    },
    key         : {
      type    : 'string'
    },
    summary     : {
      type    : 'string',
      columnType  : 'longtext'
    },
    sampleDate  : {
      type    : 'string'
    },
    variantname : {
      type    : 'string',
      columnType  : 'longtext'
    },
    JIRAID    : {
      type    : 'string'
    },
    type      : {
      type    : 'string'
    },
    stat      : {
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

