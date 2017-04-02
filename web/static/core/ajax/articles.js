// @flow

import type { ApiResponse } from '../models/api-response'
import { Page, fromAjax as pageFromAjax } from '../models/page'
import { Article, fromAjax as articleFromAjax } from '../models/article'
import { get, post } from './fetch'

export function getArticles (
  { page, size }: { page: number, size: number }
): Promise<ApiResponse<{ page: Page, data: Article[] }>> {
  return get('/articles', {
    params: {
      page,
      page_size: size
    }
  }).then(res => {
    return res.map(body => ({
      page: pageFromAjax(body.page),
      data: body.data.map(articleFromAjax)
    }))
  })
}

export function postArticle (data: Article): Promise<ApiResponse<Article>> {
  return post('/articles', {
    body: {
      article: {
        title: data.title,
        body: data.body
      }
    }
  }).then(res => {
    return res.map(body => articleFromAjax(body.data))
  })
}
