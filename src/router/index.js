import Vue from 'vue'
import Router from 'vue-router'

import Getter from '../page/getter.vue'
import Dispatch from '../page/dispatch.vue'
import Login from '../page/login/login.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Getter',
      component: Getter
    },
    {
      path: '/dispatch',
      name: 'Dispatch',
      component: Dispatch
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }

  ]
})
export default router
