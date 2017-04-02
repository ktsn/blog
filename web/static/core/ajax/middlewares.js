// @flow

import type { ApiResponse } from '../models/api-response'

export function extractBody <T>(res: ApiResponse<T>): Promise<T> {
  if (res.status >= 200 && res.status < 300) {
    return Promise.resolve(res.body)
  } else {
    return Promise.reject(createError(res))
  }
}

export function ensureAuthenticated <T>(
  unauthorized: (res: ApiResponse<T>) => any
): (res: ApiResponse<T>) => Promise<ApiResponse<T>> {
  return res => {
    if (res.status === 401) {
      unauthorized(res)
      return Promise.reject(createError(res))
    } else {
      return Promise.resolve(res)
    }
  }
}

function createError <T>(res: ApiResponse<T>): Error {
  const error: any = new Error(res.originalResponse.statusText)
  error.response = res
  return error
}
