// @flow

import type Article from '../models/article'
import { fromAjax } from '../models/article-factory'
import { post } from './fetch'

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
