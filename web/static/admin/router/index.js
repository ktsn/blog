// @flow

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Default from '../layouts/Default'

import Login from '../pages/Login'
import ArticleList from '../pages/ArticleList'
import NewArticle from '../pages/NewArticle'

import { verify } from '../ajax/auth'

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
          name: 'articleList',
          path: '/articles',
          component: ArticleList
        },
        {
          name: 'newArticle',
          path: '/articles/new',
          component: NewArticle
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(m => m.meta.isPublic)

  verify().then(authenticated => {
    if (authenticated) {
      store.commit('auth/authenticateSuccess')
      next()
    } else if (!isPublic) {
      store.dispatch('routing/login')
    }
  })
})

export default router
