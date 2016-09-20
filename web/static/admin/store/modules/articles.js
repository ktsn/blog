// @flow

import { getArticles, postArticle } from 'core/ajax/articles'

import { Article } from 'core/models/article'
import { Page, empty as emptyPage } from 'core/models/page'

const state = {
  articles: ([]: Article[]),
  page: emptyPage()
}

const getters: { [key: string]: (state: typeof state) => any } = {
  articles: state => state.articles,
  articlePage: state => state.page
}

const actions = {
  fetchArticles (
    { commit, state }: any,
    { page, size }: { page: number, size: number }
  ) {
    page = page || 1
    size = size || state.page.pageSize

    return getArticles({ page, size })
      .then(data => commit('paginateArticles', data))
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

  paginateArticles (state: typeof state, { page, data }: { page: Page, data: Article[] }) {
    state.articles = data
    state.page = page
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
