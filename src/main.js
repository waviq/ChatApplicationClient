// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import LoginPage from './pages/Login'
import DashboardPage from './pages/Dashboard'

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'


import 'materialize-css'
import '../node_modules/materialize-css/dist/css/materialize.css'

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.component('app', App)

const routes = [
  {path: '/', component: LoginPage, name: 'home', meta: { forVisitors: true }},
  {path: '/dashboard', component:DashboardPage, name:'dashboard', meta: { requiresAuth: true }}
]
const router = new VueRouter({
  mode: 'history',
  routes
})


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth){
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser && authUser.access_token){
      next()
    }else {
      next({name: 'home'})
    }
  }elseif(to.matched.some(record => record.meta.forVisitors)){
    if (! Vue.auth.isAuthenticated()){
      next({name:'home'})
    }
  }
  next()
})

new Vue({
  router
}).$mount('#app')

