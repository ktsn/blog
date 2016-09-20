// @flow

export class Article {
  id: ?number;
  title: string;
  body: string;

  constructor (id: ?number, title: string, body: string) {
    this.id = id
    this.title = title
    this.body = body
  }

  clone (): Article {
    return new Article(
      this.id,
      this.title,
      this.body
    )
  }
}

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
