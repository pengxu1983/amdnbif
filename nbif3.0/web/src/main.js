import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//For ElementUI
import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false


//For Jquery
import '@/../node_modules/jquery/dist/jquery.slim.min.js'
import '@/../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '@/../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'


//For Echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

//For resource
import VueResource from 'vue-resource'
Vue.use(VueResource);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
