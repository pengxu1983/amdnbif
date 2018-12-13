import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/../node_modules/jquery/dist/jquery.slim.min.js'
import '@/../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '@/../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import  echarts  from 'echarts'
import VueResource  from 'vue-resource'

locale.use(lang)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.use(VueResource);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
