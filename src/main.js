/**
 * Created by david on 2017/4/27.
 */
import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})