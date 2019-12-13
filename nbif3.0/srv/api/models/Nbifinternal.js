/**
 * Nbifinternal.js
 *
 * @description :: A_model_definition_represents_a database_table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    'Issue_Type'  :{
      type:'string'
    },
    'Issue_key'   :{
      type:'string'
    },
    'Issue_id'    :{
      type:'string'
    },
    'Summary'     :{
      type:'string',
      columnType  : 'longtext'
    },
    'Variant'     :{
      type:'string'
    },
    'Assignee'    :{
      type:'string'
    },
    'Due_Date'    :{
      type:'string'
    },
    'Labels'      :{
      type:'string'
    },
    'Status'      :{
      type:'string'
    },
    'Reporter'    :{
      type:'string'
    },
    'Created'     :{
      type:'string'
    },
    'Updated'     :{
      type:'string'
    },
    'Last_Comment'  :{
      type:'string',
      columnType  : 'longtext'
    },
    'Rejected_Date' :{
      type:'string'
    },
    'Rejection_Reason'  :{
      type:'string'
    },
    'Est_Deliver_Date'  :{
      type:'string'
    },
    'Functional_Area' :{
      type:'string'
    },
    'Issue_Category'  :{
      type:'string'
    },
    'Deferred_Date' :{
      type:'string'
    },
    'Closed_Date' :{
      type:'string'
    },
    'Watchers': {
      type:'string',
      columnType  : 'longtext'
    }
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  
    },

};

