// @flow

import { postArticle } from 'core/ajax/articles'
import type Article from 'core/models/article'

const state = {
  articles: []
}

const getters: { [key: string]: (state: typeof state) => any } = {
  articles: state => state.articles
}

const actions = {
  submitArticle ({ commit }: any, article: Article) {
    postArticle(article)
      .then(data => commit('prependArticle', data))
  }
}

const mutations = {
  prependArticle (state: typeof state, article: Article) {
    state.articles.unshift(article)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
