// @flow

import { get, post } from 'core/ajax/fetch'
import { User, fromAjax } from 'core/models/user'

export function login (email: string, password: string): Promise<User> {
  return post('/login', {
    body: {
      auth: {
        email,
        password
      }
    }
  }).then(fromAjax)
}

export function verify (): Promise<boolean> {
  return get('/verify').then(res => {
    return res.body.authenticated
  })
}
