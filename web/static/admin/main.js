import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import routingPlugin from 'core/plugins/routing'

Vue.use(routingPlugin, {
  router,
  store
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
