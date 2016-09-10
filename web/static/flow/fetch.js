// @flow

// Typings of fetch API

declare module 'es6-promise' {
  // no export
}

declare module 'whatwg-fetch' {
  // no export
}


interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: string | FormData;
  headers?: Object;
  credentials?: 'same-origin'
}

interface FetchResponse {
  status: number;
  statusText: string;
  json (): Promise<any>;
}

declare function fetch (url: string, options?: FetchOptions): Promise<FetchResponse>
