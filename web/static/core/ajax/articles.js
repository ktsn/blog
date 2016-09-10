// @flow

import type Article from '../models/article'
import { fromAjax } from '../models/article-factory'
import { get, post } from './fetch'

export function getArticles (): Promise<Article[]> {
  return get('/articles')
    .then(res => res.data.map(fromAjax))
}

export function postArticle (data: Article): Promise<Article> {
  return post('/articles', {
    body: {
      article: {
        title: data.title,
        body: data.body
      }
    }
  }).then(res => fromAjax(res.data))
}
