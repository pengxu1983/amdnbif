/**
 * Regressionsummary.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    codeline    : {
      type      : 'string'
    },
    branch_name : {
      type      : 'string'
    },
    changelist  : {
      type      : 'string'
    },
    shelve      : {
      type      : 'string'
    },
    variantname : {
      type      : 'string'
    },
    kickoffdate : {
      type      : 'string'
    },
    describe    : {
      type      : 'string'
    },
    grouplist   : {
      type      : 'string'
    },
    testnumber  : {
      type      : 'number'
    },
    passnumber  : {
      type      : 'number'
    },
    passrate    : {
      type      : 'number'
    },
    failnumber  : {
      type      : 'number'
    },
    notrunnumber  : {
      type      : 'number'
    },
    runningnumber : {
      type      : 'number'
    },
    isOfficial  : {
      type      : 'string'
    },
    isBAPU      : {
      type      : 'string'
    },
    updatetime  : {
      type      : 'string'
    },
    result      : {
      type      : 'string'
    },
    treeRoot    : {
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

