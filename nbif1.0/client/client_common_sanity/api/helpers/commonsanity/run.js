var moment  = require('moment');
var child_process = require('child_process');
module.exports = {


  friendlyName: 'Run',


  description: 'Run commonsanity.',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    sails.log('helper');
    child_process.execSync('mkdir /local_vol1_nobackup/benpeng/'+moment().format('HHmmss'));
    // TODO
    return;
  }


};

