import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false


//For Jquery
import '@/../node_modules/jquery/dist/jquery.slim.min.js'
import '@/../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '@/../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'


//For Echarts
import echarts from 'echarts'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
