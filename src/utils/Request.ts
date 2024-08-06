import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { httpStatusCodes, isEmpty } from './common';
import { ErrorFunction, RequestConfig } from './propType';

declare global {
  interface Window {
    tenantToken?: string;
  }
}

class Request {
  private authorize: boolean;
  private errorFn: ErrorFunction;

  constructor(authorize: boolean = true, errorFn: ErrorFunction = () => {}) {
    this.authorize = authorize;
    this.errorFn = typeof errorFn === 'function' ? errorFn : () => {};
  }

  static get baseUrl(): string {
    return '/admin/flightcrs/';
  }

  private instance(uri: string, config: RequestConfig = {}): AxiosInstance {
    const headers: RequestConfig = {
      uri: uri,
    };

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

    instance.interceptors.response.use(undefined, (error: AxiosError) => {
      const status = error.response?.status;
      if (status === httpStatusCodes.UNAUTHORIZED) {
        const currentURL = window.location.href;
        const { host } = window.location;
        console.log(process);
        if (process.env.NODE_ENV === 'development') {
          window.location.href = `http://localhost:5200/admin/marvel/login/user?redirect=${currentURL}`;
        } else {
          window.location.href = `https://${host}/admin/marvel/login/user?redirect=${currentURL}`;
        }
      }
      return Promise.reject(error);
    });

    return instance;
  }

  get(
    url: string = '',
    params: any = {},
    uri: string = '',
    config: RequestConfig = {},
  ): Promise<AxiosResponse> {
    if (this.authorize) {
      return Promise.resolve(this.errorFn([], {}, httpStatusCodes.BAD_REQUEST));
    }
    return this.instance(uri, config).get(url, { params });
  }

  post(
    url: string = '',
    params: any = {},
    uri: string = '',
    config: RequestConfig = {},
  ): Promise<AxiosResponse> {
    if (this.authorize) {
      return Promise.resolve(this.errorFn([], {}, httpStatusCodes.BAD_REQUEST));
    }
    return this.instance(uri, config).post(url, params);
  }

  delete(
    url: string = '',
    params: any = {},
    uri: string = '',
    config: RequestConfig = {},
  ): Promise<AxiosResponse> {
    if (this.authorize) {
      return Promise.resolve(this.errorFn([], {}, httpStatusCodes.BAD_REQUEST));
    }
    return this.instance(uri, config).delete(url, { params });
  }

  put(
    url: string = '',
    params: any = {},
    uri: string = '',
    config: RequestConfig = {},
  ): Promise<AxiosResponse> {
    if (this.authorize) {
      return Promise.resolve(this.errorFn([], {}, httpStatusCodes.BAD_REQUEST));
    }
    return this.instance(uri, config).put(url, params);
  }

  patch(
    url: string = '',
    params: any = {},
    uri: string = '',
    config: RequestConfig = {},
  ): Promise<AxiosResponse> {
    if (this.authorize) {
      return Promise.resolve(this.errorFn([], {}, httpStatusCodes.BAD_REQUEST));
    }
    return this.instance(uri, config).patch(url, params);
  }
}

export default Request;
