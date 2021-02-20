// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

// -------------------

// import { createApp } from 'vue'
// import { ElButton } from 'element-plus';
// import App from './App.vue';

// const app = createApp(App)
// app.config.globalProperties.$ELEMENT = option
// app.use(ElButton);


// ----------------

import { createApp } from 'vue'
import App from './App.vue';
import router from './router'

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';


const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
