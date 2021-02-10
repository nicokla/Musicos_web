import Vue from 'vue'
// import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import {firestorePlugin} from 'vuefire'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import InstantSearch from 'vue-instantsearch';
import '@mdi/font/css/materialdesignicons.css' 
// import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import Vuetify from 'vuetify';

// Vue.use(Vuetify);

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    primary: '#9652ff',
    success: '#3cd1c2',
    info: '#ffaa2c',
    error: '#f83e70'
  }
})
Vue.use(firestorePlugin)
Vue.use(InstantSearch)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
