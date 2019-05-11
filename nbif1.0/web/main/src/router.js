import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Review from './views/Review.vue'
import Regression from './views/Regression.vue'
import RegressionByGroup from './views/RegressionByGroup.vue'
import Action from './views/Action.vue'
import Config from './views/Config.vue'
import TestplanDetail from './views/TestplanDetail.vue'
import Sanity from './views/Sanity.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/main',
      name: 'main',
      component: Home
    },
    {
      path: '/Review',
      name: 'Review',
      component: Review
    },
    {
      path: '/RegressionByGroup',
      name: 'RegressionByGroup',
      component: RegressionByGroup
    },
    {
      path: '/Regression',
      name: 'Regression',
      component: Regression
    },
    {
      path: '/Action',
      name: 'Action',
      component: Action
    },
    {
      path: '/Config',
      name: 'Config',
      component: Config
    },
    {
      path: '/TestplanDetail',
      name: 'TestplanDetail',
      component: TestplanDetail,
      props : true
    },
    {
      path: '/Sanity',
      name: 'Sanity',
      component: Sanity,
      props : true
    },
    //{
    //  path: '/about',
    //  name: 'about',
    //  // route level code-splitting
    //  // this generates a separate chunk (about.[hash].js) for this route
    //  // which is lazy-loaded when the route is visited.
    //  component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    //}
  ]
})
