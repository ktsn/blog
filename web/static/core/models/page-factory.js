// @flow

import Page from './page'

export function empty (): Page {
  return new Page(1, 0, 1, 0)
}

export function fromAjax (data: any): Page {
  return new Page(
    data.page_number,
    data.page_size,
    data.total_pages,
    data.total_entries
  )
}
