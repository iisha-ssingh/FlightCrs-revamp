import axios from 'axios';

import {
  getObjectValue,
  httpStatusCodes,
  isEmpty,
} from './common';

class Request {
  constructor(authorize = true, errorFn = () => {}) {
    this.authorize = authorize;
    this.errorFn = typeof errorFn === 'function' ? errorFn : () => {};
  }

  static get baseUrl() {
    return '/admin/flightcrs/';
    // return ''
  }

  /**
   * GET axios instance and do things that are common for every request
   */
  instance(uri, config) {
    const headers = {};
    headers.uri = uri;
    if (typeof window !== 'undefined' && window.tenantToken) {
      headers['tenant-token'] = window.tenantToken;
    }
    if (
      !isEmpty(config) &&
      Object.prototype.hasOwnProperty.call(config, 'content-type')
    ) {
      headers['content-type'] = config['content-type'];
    }

    const instance = axios.create({
      baseURL: Request.baseUrl,
      headers,
    });

    // Response Interceptor
    instance.interceptors.response.use(undefined, (error) => {
      const status = error?.response?.status;
      if (status === httpStatusCodes.UNAUTHORIZED) {
        // Unauthorized User
        const currentURL = window.location.href;
        const { host } = window.location;
        if (process.env.NODE_ENV === 'development') {
          window.location = `http://localhost:5200/admin/marvel/login/user?redirect=${currentURL}`;
        } else {
          window.location = `https://${host}/admin/marvel/login/user?redirect=${currentURL}`;
        }
      }

      return Promise.reject(error);
    });

    return instance;
  }

  /**
   * Make GET Requests
   * @param {string} url
   * @param {object} params
   */
  get(url = '', params = {}, uri = '', config = {}) {
    if (this.authorize ) {
      return this.errorFn([], {}, httpStatusCodes.BAD_REQUEST);
    }
    return this.instance(uri, config).get(url, { params });
  }

  /**
   * Make POST Requests
   * @param {string} url
   * @param {object} params
   */
  post(url = '', params = {}, uri = '', config = {}) {
    if (this.authorize ) {
      return this.errorFn([], {}, httpStatusCodes.BAD_REQUEST);
    }
    return this.instance(uri, config).post(url, params);
  }

  /**
   * Make DELETE Requests
   * @param {string} url
   * @param {object} params
   */
  delete(url = '', params = {}, uri = '', config = {}) {
    if (this.authorize) {
      return this.errorFn([], {}, httpStatusCodes.BAD_REQUEST);
    }
    return this.instance(uri, config).delete(url, { params });
  }

  /**
   * Make PUT Requests
   * @param {string} url
   * @param {object} params
   */
  put(url = '', params = {}, uri = '', config = {}) {
    if (this.authorize) {
      return this.errorFn([], {}, httpStatusCodes.BAD_REQUEST);
    }
    return this.instance(uri, config).put(url, params);
  }

  /**
   * Make PATCH Requests
   * @param {string} url
   * @param {object} params
   */
  patch(url = '', params = {}, uri = '', config = {}) {
    if (this.authorize) {
      return this.errorFn([], {}, httpStatusCodes.BAD_REQUEST);
    }
    return this.instance(uri, config).patch(url, params);
  }

}

export default Request;
