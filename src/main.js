import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import {firestorePlugin} from 'vuefire'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
