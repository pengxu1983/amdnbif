let refTreeRoot     = '';//MODIFY
//let regTreeRootList = [
//  '/proj/cip_floyd_genz/ip_regress/antti/nbif2_0_al/',
//  '/proj/cip_floyd_genz/ip_regress/antti/nbif2_0_al_pg/',
//  '/proj/cip_floyd_genz/ip_regress/antti/nbif2_0_al_long/'
//];
let out_home        = '/out/linux_3.10.0_64.VCS/';
var moment          = require('moment');
var querystring     = require('querystring');
var http            = require('http');
var fs              = require('fs');
var child_process   = require('child_process');
var cronJob         = require("cron").CronJob;
var workspace       = '/proj/cip_floyd_genz/benpeng';////MODIFY
let postQ           = [];
let postQlimit      = 20;////MODIFY
let treeInfoList    = [];
let cron_check_changelist= new cronJob('0 */5 * * * *',function(){
  child_process.execSync();
},null,false,'Asia/Chongqing');
module.exports = {


  friendlyName: 'Process',


  description: 'Process something.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return;

  }


};
