import Vue from 'vue'
import VueRouter from 'vue-router'

import ArticleList from '../pages/ArticleList'
import NewArticle from '../pages/NewArticle'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: '/admin',
  routes: [
    { path: '/articles', component: ArticleList },
    { path: '/articles/new', component: NewArticle }
  ]
})
