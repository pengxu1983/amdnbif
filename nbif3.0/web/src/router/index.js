import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  //{
  //  path: '/about',
  //  name: 'about',
  //  // route level code-splitting
  //  // this generates a separate chunk (about.[hash].js) for this route
  //  // which is lazy-loaded when the route is visited.
  //  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  //},
  {
      path: '/regression',
      name: 'regression',
      component: () => import('../views/Regression.vue')
    },
    {
      path: '/config',
      name: 'config',
      component: () => import('../views/Config.vue')
    },
    {
      path: '/sanity',
      name: 'sanity',
      component: () => import('../views/Sanity.vue')
    },
    {
      path: '/metrics',
      name: 'metrics',
      component: () => import('../views/Metrics.vue')
    },
    {
      path: '/jira',
      name: 'jira',
      component: () => import('../views/Jira.vue')
    },
]

const router = new VueRouter({
  routes
})

export default router
