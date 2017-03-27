import Vue from 'vue'
import VueRouter from 'vue-router'

import ArticleList from '../pages/ArticleList'
import NewArticle from '../pages/NewArticle'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: '/admin',
  routes: [
    {
      name: 'article-list',
      path: '/articles',
      component: ArticleList
    },
    {
      name: 'new-article',
      path: '/articles/new',
      component: NewArticle
    }
  ]
})
