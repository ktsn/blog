// @flow

import { getArticles, postArticle } from 'core/ajax/articles'

import type Article from 'core/models/article'
import type Page from 'core/models/page'
import { empty as emptyPage } from 'core/models/page-factory'

import { replace } from 'core/utils'

const state = {
  articles: ([]: Article[]),
  page: emptyPage()
}

const getters: { [key: string]: (state: typeof state) => any } = {
  articles: ({ articles, page }) => articles.slice(page.pageNumber - 1, page.pageSize),
  articlePage: state => state.page
}

const actions = {
  fetchArticles ({ commit }: any) {
    return getArticles().then(data => commit('paginateArticles', data))
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
    replace(state.articles, data, page.pageNumber - 1)
    state.page = page
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
