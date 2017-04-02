// @flow

export class ApiResponse<T> {
  originalResponse: Response;
  body: T;
  status: number;

  constructor (response: Response, body: T) {
    this.body = body
    this.status = response.status
    this.originalResponse = response
  }

  map <U>(f: (body: T) => U): ApiResponse<U> {
    return new ApiResponse(this.originalResponse, f(this.body))
  }
}
