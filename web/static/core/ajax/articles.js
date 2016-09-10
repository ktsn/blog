// @flow

import type Article from '../models/article'
import type Page from '../models/page'
import { fromAjax as pageFromAjax } from '../models/page-factory'
import { fromAjax as articleFromAjax } from '../models/article-factory'
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
