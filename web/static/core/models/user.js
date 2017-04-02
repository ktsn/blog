// @flow

export class User {
  id: number;
  email: string;

  constructor (id: number, email: string) {
    this.id = id
    this.email = email
  }
}

export function fromAjax (data: any): User {
  return new User(
    data.id,
    data.email
  )
}
