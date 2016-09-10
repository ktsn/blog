// @flow

import Article from './article'

export function empty (): Article {
  return new Article(null, '', '')
}

export function fromAjax (data: any): Article {
  return new Article(
    data.id,
    data.title,
    data.body
  )
}
