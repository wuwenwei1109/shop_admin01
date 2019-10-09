import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/Login'

import Home from '@/components/home/Home'

import Users from '@/components/users/Users'

import Rights from '@/components/rights/Rights'

Vue.use(Router)

const router = new Router({
  routes: [
    // children 用来配置子路由，将来匹配的组件会展示在 Home 组件的 router-view 中
    {
      path: '/home',
      component: Home,
      children: [
        { path: 'users', component: Users },
        { path: 'rights', component: Rights }
      ]
    },
    { path: '/login', component: Login }
  ]
})

// 全局导航守卫
router.beforeEach((to, from, next) => {
  // ...
  // console.log('导航守卫在看门', to);

  if (to.path === "/login") {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next("/login")
    }
  }
})

export default router
