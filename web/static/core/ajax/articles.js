// @flow

import { Page, fromAjax as pageFromAjax } from '../models/page'
import { Article, fromAjax as articleFromAjax } from '../models/article'
import { get, post } from './fetch'

export function getArticles (
  { page, size }: { page: number, size: number }
): Promise<{ page: Page, data: Article[] }> {
  return get('/articles', {
    params: {
      page,
      page_size: size
    }
  }).then(res => ({
    page: pageFromAjax(res.page),
    data: res.data.map(articleFromAjax)
  }))
}

export function postArticle (data: Article): Promise<Article> {
  return post('/articles', {
    body: {
      article: {
        title: data.title,
        body: data.body
      }
    }
  }).then(res => articleFromAjax(res.data))
}
