// @flow

export class Page {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalEntries: number;

  constructor (
    pageNumber: number,
    pageSize: number,
    totalPages: number,
    totalEntries: number
  ) {
    this.pageNumber = pageNumber
    this.pageSize = pageSize
    this.totalPages = totalPages
    this.totalEntries = totalEntries
  }
}

export function empty (): Page {
  return new Page(1, 10, 1, 0)
}

export function fromAjax (data: any): Page {
  return new Page(
    data.page_number,
    data.page_size,
    data.total_pages,
    data.total_entries
  )
}
