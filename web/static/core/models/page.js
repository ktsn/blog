// @flow

export default class Page {
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
