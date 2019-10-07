// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import '@/assets/index.css'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'

// 配置公共路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求发送之前做一些事情
  console.log('请求拦截器', config)
  if (!config.url.endsWith('/login')) {
    config.headers['Authorization'] = localStorage.getItem('token')
  }
  return config;
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 在获取到响应数据的时候做一些事情
  console.log('请求响应器', response)
  if (response.data.meta.status === 401) {
    router.push('/login')
    localStorage.removeItem('token')
  }
  return response;
})

// 将 axios 添加到Vue的原型中
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
