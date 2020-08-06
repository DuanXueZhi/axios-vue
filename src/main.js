import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Http from './service/http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './globalComponents'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$Http = Http // http挂载vue实例

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
