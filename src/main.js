import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.scss'
import axios from 'axios'
Vue.prototype.$axios = axios

Vue.use(ElementUI)

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app')
