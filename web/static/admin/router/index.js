import Vue from 'vue'
import VueRouter from 'vue-router'

import NewArticle from '../pages/NewArticle'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: '/admin',
  routes: [
    { path: '/articles/new', component: NewArticle }
  ]
})
