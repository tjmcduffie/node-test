/*global */
/**
 *
 * @flow
 */

"use strict";

type AcceptedRequestMethods =
  | 'delete'
  | 'get'
  | 'head'
  | 'options'
  | 'patch'
  | 'post'
  | 'put';

type ResponseTypes =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream';

type AxiosConfig = {
  adapter?: (config: Object) => Promise<*>,
  auth?: {
    username: string,
    password: string,
  },
  baseURL?: string,
  cancelToken: string,
  data?: Object,
  headers?: Object,
  maxContentLength: number,
  maxRedirects: number,
  method: AcceptedRequestMethods,
  onDownloadProgress?: (e: Object) => void,
  onUploadProgress?: (e: Object) => void,
  params?: Object,
  paramsSerializer?: (params: Object) => string,
  responseType: ResponseTypes,
  timeout: number,
  transformRequest?: Array<(data: Object | string) => Object | string>,
  transformResponse?: Array<(data: Object) => Object>,
  url: string,
  validateStatus?: (status: number) => boolean,
  withCredentials: boolean,
};

const axios = require('axios');
const CancelToken = axios.CancelToken;

const BASE_URL = 'http://localhost:3000';

class AsyncRequest {
  _cancelCallback: ?Function;
  _config: AxiosConfig;

  constructor(url: string) {
    this._config = {
      baseURL: BASE_URL,
      cancelToken: new CancelToken((c: Function) => {this._cancelCallback = c}),
      maxContentLength: 2000,
      maxRedirects: 5,
      method: 'get',
      responseType: 'json',
      timeout: 1000,
      url,
      withCredentials: false,
    };
  }

  cancel() {
    if (typeof this._cancelCallback !== 'function') {
      throw new Error('Cannot cancel current request');
    }
    this._cancelCallback();
  }

  setData(data: Object): AsyncRequest {
    this._config.data = data;
    return this;
  }

  delete(): Promise<*> {
    this._config.method = 'delete';
    return this.send();
  }

  get(): Promise<*> {
    this._config.method = 'get';
    return this.send();
  }

  post(): Promise<*> {
    if (!this._config.data) {
      throw new Error('There is no data to send via post');
    }
    this._config.method = 'post';
    return this.send();
  }

  put(): Promise<*> {
    if (!this._config.data) {
      throw new Error('There is no data to send via put');
    }
    this._config.method = 'put';
    return this.send();
  }

  send(): Promise<*> {
    return new Promise((resolve, reject) => {
      axios(this._config)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
    });
  }
}

module.exports = AsyncRequest
