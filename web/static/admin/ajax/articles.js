// @flow

import * as Ajax from 'core/ajax/articles'
import { extractBody, ensureAuthenticated } from 'core/ajax/middlewares'
import type { Page } from 'core/models/page'
import type { Article } from 'core/models/article'

import { redirectToLogin } from '../router/helpers'

export function getArticles (
  params: { page: number, size: number }
): Promise<{ page: Page, data: Article[] }> {
  return Ajax.getArticles(params)
    .then(extractBody)
}

export function postArticle (data: Article): Promise<Article> {
  return Ajax.postArticle(data)
    .then(ensureAuthenticated(redirectToLogin))
    .then(extractBody)
}
