import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import vuetify from './plugins/vuetify';


Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  vuetify,
  store,
  router
}).$mount('#app')
