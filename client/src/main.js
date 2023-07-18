import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Network } from 'vue-visjs'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.component('NetworkGraph', Network)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
