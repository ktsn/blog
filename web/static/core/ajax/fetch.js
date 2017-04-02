// @flow

/* global fetch */
import 'es6-promise'
import 'whatwg-fetch'

import { isObject, toPairs } from 'lodash'
import { ApiResponse } from '../models/api-response'

interface Options {
  params?: Object;
  body?: Object;
}

export function get (url: string, options: Options = {}): Promise<ApiResponse<any>> {
  return _fetch(url, { ...options, method: 'GET' })
}

export function post (url: string, options: Options = {}): Promise<ApiResponse<any>> {
  return _fetch(url, { ...options, method: 'POST' })
}

export function put (url: string, options: Options = {}): Promise<ApiResponse<any>> {
  return _fetch(url, { ...options, method: 'PUT' })
}

export function del (url: string, options: Options = {}): Promise<ApiResponse<any>> {
  return _fetch(url, { ...options, method: 'DELETE' })
}

function _fetch (url: string, options: any): Promise<ApiResponse<any>> {
  const opts: RequestOptions = {
    credentials: 'same-origin'
  }

  if (isObject(options.params)) {
    const paramsStr = toPairs(options.params).map(pair => {
      return pair.join('=')
    }).join('&')

    url = url + '?' + paramsStr
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
    .then(res => Promise.all([res, res.json()]))
    .then(([res, data]: [Response, any]) => {
      return new ApiResponse(res, data)
    })
}
