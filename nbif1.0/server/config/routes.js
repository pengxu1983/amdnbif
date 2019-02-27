/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //'/': {
  //  view: 'pages/homepage'
  //},
  'GET  /'  : '/main',
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match :pny of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  //'POST /regression/start'  : {
  //  action  : 'regression/start'
  //},
  //'POST /regression/ongoing'  : {
  //  action  : 'regression/ongoing'
  //},
  //'POST /regression/stop'  : {
  //  action  : 'regression/stop'
  //},
  //'POST /regression/check'  : {
  //  action  : 'regression/check'
  //},
  ///////////////////
  //internal
  ///////////////////
  'POST /regression/calpassingrate'  : {
    action  : 'regression/calpassingrate'
  },
  ///////////////////


  'POST /testplans/gettestplanlist' : {
    action  : 'testplans/gettestplanlist'
  },

  'POST /testplans/upload'  : {
    action  : 'testplans/upload'
  },

  'POST /config/upload'   : {
    action  : 'config/upload'
  },
  'POST /config/get'   : {
    action  : 'config/get'
  },
  'POST /config/clone'   : {
    action  : 'config/clone'
  },

  'POST /sanitys/upload'  :{
    action  : 'sanitys/upload'
  },
  'POST /sanitys/get'  :{
    action  : 'sanitys/get'
  },
  'POST /sanitys/statusupload': {
    action  : 'sanitys/statusupload'
  },
  'POST /sanitys/getbrokencl': {
    action  : 'sanitys/getbrokencl'
  },
  'POST /sanitys/common-sanity/popchangelist' : {
    action  : 'sanitys/common-sanity/popchangelist'
  },
  'POST /sanitys/common-sanity/pushchangelist' : {
    action  : 'sanitys/common-sanity/pushchangelist'
  },
  'POST /sanitys/common-sanity/info' : {
    action  : 'sanitys/common-sanity/info'
  },
  'POST /sanitys/common-sanity/infofordcelab' : {
    action  : 'sanitys/common-sanity/infofordcelab'
  },
  'POST /sanitys/common-sanity/uploadstatus' : {
    action  : 'sanitys/common-sanity/uploadstatus'
  },
  'POST /sanitys/common-sanity/getcommonsanitystatus' : {
    action  : 'sanitys/common-sanity/getcommonsanitystatus'
  },
  'POST /sanitys/dcelab/uploadstatus' : {
    action  : 'sanitys/dcelab/uploadstatus'
  },
  'POST /regression/pushchangelist' : {
    action  : 'regression/pushchangelist'
  },
  'POST /regression/info' : {
    action  : 'regression/info'
  },
  'POST /regression/uploadstatus' : {
    action  : 'regression/uploadstatus'
  },
  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  'GET /test/:kind':{
    action  : 'test'
  }
  
  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
