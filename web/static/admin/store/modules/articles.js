// @flow

import { getArticles, postArticle } from 'core/ajax/articles'
import type Article from 'core/models/article'

const state = {
  articles: []
}

const getters: { [key: string]: (state: typeof state) => any } = {
  articles: state => state.articles
}

const actions = {
  fetchArticles ({ commit }: any) {
    return getArticles().then(data => commit('replaceArticles', data))
  },

  submitArticle ({ commit }: any, article: Article) {
    return postArticle(article)
      .then(data => commit('prependArticle', data))
  }
}

const mutations = {
  prependArticle (state: typeof state, article: Article) {
    state.articles.unshift(article)
  },

  replaceArticles (state: typeof state, articles: Article[]) {
    state.articles = articles
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
