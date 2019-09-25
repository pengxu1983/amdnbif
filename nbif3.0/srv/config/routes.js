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

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //'/': { view: 'pages/homepage' },
  //For changelist 
  'POST /changelist/upload' : {
    action  : 'changelist/upload'
  },
  'POST /changelist/get' : {
    action  : 'changelist/get'
  },

  //For config
  'POST /config/agents/get' : {
    action  : 'config/agents/get'
  },
  'POST /config/agents/upload' : {
    action  : 'config/agents/upload'
  },
  'POST /config/trees/get' : {
    action  : 'config/trees/get'
  },
  'POST /config/trees/upload' : {
    action  : 'config/trees/upload'
  },
  'POST /config/variants/upload' : {
    action  : 'config/variants/upload'
  },
  'POST /config/variants/get' : {
    action  : 'config/variants/get'
  },
  'POST /config/groups/upload' : {
    action  : 'config/groups/upload'
  },
  'POST /config/groups/get' : {
    action  : 'config/groups/get'
  },
  'POST /config/projects/upload' : {
    action  : 'config/projects/upload'
  },
  'POST /config/projects/get' : {
    action  : 'config/projects/get'
  },
  'POST /config/users/upload' : {
    action  : 'config/users/upload'
  },
  'POST /config/users/get' : {
    action  : 'config/users/get'
  },
  'POST /config/users/vacation' : {
    action  : 'config/users/vacation'
  },
  //For regression
  'POST /regression/clean' : {
    action  : 'regression/clean'
  },
  'POST /regression/upload' : {
    action  : 'regression/upload'
  },
  'POST /regression/summary' : {
    action  : 'regression/summary'
  },
  'POST /regression/allsummary' : {
    action  : 'regression/allsummary'
  },
  'POST /regression/dvgroupsummary' : {
    action  : 'regression/dvgroupsummary'
  },
    'POST /regression/onedvgroupstatus' : {
    action  : 'regression/onedvgroupstatus'
  },
  'POST /regression/get' : {
    action  : 'regression/get'
  },
  'POST /regression/testdetails' : {
    action  : 'regression/testdetails'
  },
  'POST /regression/allstatus' : {
    action  : 'regression/allstatus'
  },
  'POST /regression/groupstatus' : {
    action  : 'regression/groupstatus'
  },
  'POST /regression/neverpass' : {
    action  : 'regression/neverpass'
  },
  //For metrics
  'POST /metrics/getdvgroupprstatus' : {
    action  : 'metrics/getdvgroupprstatus'
  },
  'POST /metrics/getvalidvariants' : {
    action  : 'metrics/getvalidvariants'
  },
  //For sanity
  'POST /sanity/tasksupload' : {
    action  : 'sanity/tasksupload'
  },
  'POST /sanity/getinfo' : {
    action  : 'sanity/getinfo'
  },
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
