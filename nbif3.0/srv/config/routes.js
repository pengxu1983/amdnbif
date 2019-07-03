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
  //For config 
  'POST /config/variants/upload' : {
    action  : 'config/variants/upload'
  },
  'POST /config/variants/get' : {
    action  : 'config/variants/get'
  },
  'POST /config/groups/get' : {
    action  : 'config/groups/get'
  },
  //For regression
  'POST /regression/upload' : {
    action  : 'regression/upload'
  },
  'POST /regression/summary' : {
    action  : 'regression/summary'
  },
  'POST /regression/get' : {
    action  : 'regression/get'
  },
  'POST /regression/testdetails' : {
    action  : 'regression/testdetails'
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
