// @flow

/* global fetch */
import 'es6-promise'
import 'whatwg-fetch'

import { isObject } from 'lodash'

interface Options {
  body?: Object;
}

export function get (url: string, options: Options = {}): Promise<any> {
  return _fetch(url, { ...options, method: 'GET' })
}

export function post (url: string, options: Options = {}): Promise<any> {
  return _fetch(url, { ...options, method: 'POST' })
}

export function put (url: string, options: Options = {}): Promise<any> {
  return _fetch(url, { ...options, method: 'PUT' })
}

export function del (url: string, options: Options = {}): Promise<any> {
  return _fetch(url, { ...options, method: 'DELETE' })
}

function _fetch (url: string, options: any): Promise<any> {
  const opts: FetchOptions = {
    credentials: 'same-origin'
  }

  if (isObject(options.body)) {
    opts.body = JSON.stringify(options.body)
    opts.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  opts.method = options.method

  return fetch('/api/v1' + url, opts)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.json()
      } else {
        const error: any = new Error(res.statusText)
        error.response = res
        return Promise.reject(error)
      }
    })
}
