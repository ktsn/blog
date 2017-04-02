// @flow

import Vue from 'vue'
import VueRouter from 'vue-router'

import Default from '../layouts/Default'

import Login from '../pages/Login'
import ArticleList from '../pages/ArticleList'
import NewArticle from '../pages/NewArticle'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: '/admin',
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login,
      meta: {
        isPublic: true
      }
    },
    {
      path: '',
      component: Default,
      children: [
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
    }
  ]
})


export default router
