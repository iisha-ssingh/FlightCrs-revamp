import ServerError from './errors/ServerError';
import CustomError from './errors/CustomError';
import ClientError from './errors/ClientError';
import UnauthorizedAccessError from './errors/UnauthorizedAccessError';
import { logError } from './loggingService';
import ForbiddenError from './errors/ForbiddenError';
import Constants from './utils/StringLiterals';
import type { JsonObjectType } from './utils';
import { isEmpty } from '../utils/common';
// import {ApiResponse} from "../pages/FormView/utils/props.ts";

const STRINGS = Constants.NETWORK_LAYER;

enum RequestType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Data = JsonObjectType | FormData;

type CustomOptions = RequestInit & {
  logErrorToRemote?: boolean;
  timeout?: number;
  headers?: object;
};

export type ApiParamsWithData = {
  service: string;
  data: Data;
  options?: CustomOptions;
  prefixHost?: boolean;
};

type ApiParamsWithoutData = {
  service: string;
  options?: CustomOptions;
  prefixHost?: boolean;
};

type FetchDataParams = {
  method: RequestType;
  url: string;
  data?: Data;
  options?: CustomOptions;
};

export interface ApiResponse<T = any> {
  message: string;
  data: T;
  status: number;
}

const NetworkLayer = (() => {
  let isNetworkConnected: boolean | null = navigator.onLine;
  let responseHandlerCallback: ((response: Response) => void) | null = null;
  let getCookie: () => string;
  let appApiHeaders: () => RequestInit['headers'];

  const generateUrl = (service: string, prefixHost = true) => {
    return prefixHost ? `${process.env.BASE_URL}${service}` : service;
  };

  const generateHeaders = (extraHeaders?: RequestInit['headers']) => {
    return {
      'Content-Type': 'application/json',
      Connection: 'keep-alive',
      'Set-Cookie': getCookie?.(),
      ...appApiHeaders?.(),
      ...extraHeaders,
    };
  };

  const parseResponse = async (apiResponse: Response) => {
    try {
      const responseJson = await apiResponse.json();
      return { ...responseJson, status: apiResponse.status };
    } catch (e) {
      throw new ServerError(STRINGS.DATA_ERROR);
    }
  };
  (() => {
    const updateNetworkStatus = () => {
      isNetworkConnected = navigator.onLine;
      console.log(`Network is ${isNetworkConnected ? 'online' : 'offline'}`);
    };
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    updateNetworkStatus();
  })();

  const fetchData = async ({ method, url, data, options }: FetchDataParams) => {
    let response: ApiResponse = {
      message: '',
      data: undefined,
      status: 0,
    };
    // Making logErrorToRemote false by default due to JSON.stringify in logError causing issues
    const logErrorToRemote = options?.logErrorToRemote ?? false;
    try {
      if (!isNetworkConnected) {
        throw new ServerError(STRINGS.NO_INTERNET_SUBHEADING, {
          title: STRINGS.NO_INTERNET_HEADING,
        });
      }
      const headers = generateHeaders(options?.headers);
      let requestUrl = url;
      if (method === 'GET' && !isEmpty(data)) {
        const queryParams = new URLSearchParams(
          data as Record<string, string>,
        ).toString();
        requestUrl = `${url}?${queryParams}`;
      }
      const body =
        headers['Content-Type'] === 'multipart/form-data;'
          ? (data as FormData)
          : JSON.stringify(data);

      const apiResponse = await fetch(requestUrl, {
        ...(options ?? {}),
        method,
        headers,
        body: method !== 'GET' ? body : undefined,
      });

      responseHandlerCallback?.(apiResponse);
      response = await parseResponse(apiResponse);
      if (!apiResponse.ok) {
        throw createHttpError(apiResponse.status, response);
      }
      return response;
    } catch (error) {
      handleFetchError(error, { url, data, logErrorToRemote }, response);
    }
  };

  const createHttpError = (
    status: number,
    response: ApiResponse,
  ): CustomError => {
    if (status >= 400 && status < 500) {
      switch (status) {
        case 401:
          return new UnauthorizedAccessError(response.message);
        case 403:
          return new ForbiddenError(response.message, response.status);
        default:
          return new ClientError(response.message, response.data, status);
      }
    } else if (status >= 500 && status < 600) {
      return new ServerError(response.message, response.data, status);
    }
    return new CustomError(response.message, response.data, status);
  };

  const handleFetchError = (
    error: unknown,
    extraInfo: {
      logErrorToRemote: boolean;
      data: JsonObjectType | FormData | undefined;
      url: string;
    },
    response: ApiResponse | undefined,
  ) => {
    if (extraInfo.logErrorToRemote) {
      const err = `API Failure ${JSON.stringify({
        // TODO: Figure out JS version
        // jsVersion: ,
        url: extraInfo.url,
        request: extraInfo.data,
        response,
      })}`;
      logError(err, error);
    }

    if (error instanceof Error && error?.name === 'AbortError') {
      throw new ServerError(STRINGS.SOMETHING_WENT_WRONG);
    }

    if (error instanceof CustomError) {
      throw error;
    }

    if (
      error instanceof TypeError &&
      error.message === STRINGS.NETWORK_REQUEST_FAILED
    ) {
      throw new ServerError(STRINGS.PLEASE_TRY_AGAIN);
    }

    throw error;
  };

  console.info('Network layer initialized');
  return {
    // isNetworkConnected: () => isNetworkConnected,
    // init: () => {
    //   console.info('Network layer initialized');
    // },
    isNetworkConnected: () => isNetworkConnected,
    get: async ({ service, data, options, prefixHost }: ApiParamsWithData) => {
      return await fetchData({
        method: RequestType.GET,
        url: generateUrl(service, prefixHost),
        data,
        options,
      });
    },
    post: async ({ service, data, options, prefixHost }: ApiParamsWithData) => {
      return await fetchData({
        method: RequestType.POST,
        url: generateUrl(service, prefixHost),
        data,
        options,
      });
    },
    put: async ({ service, data, options, prefixHost }: ApiParamsWithData) => {
      return await fetchData({
        method: RequestType.PUT,
        url: generateUrl(service, prefixHost),
        data,
        options,
      });
    },
    patch: async ({
      service,
      data,
      options,
      prefixHost,
    }: ApiParamsWithData) => {
      return await fetchData({
        method: RequestType.PATCH,
        url: generateUrl(service, prefixHost),
        data,
        options,
      });
    },
    //FIXME: Body should not be sent in delete api
    delete: async ({
      service,
      data,
      options,
      prefixHost,
    }: ApiParamsWithData) => {
      return await fetchData({
        method: RequestType.DELETE,
        url: generateUrl(service, prefixHost),
        data,
        options,
      });
    },
    // unsubscribe: () => {
    //   unsubscribeNetworkListener?.();
    // },
    getResponseHandler: (cb: (response: Response) => void) => {
      responseHandlerCallback = cb;
    },
    getCookieHandler: (cb: () => string) => {
      getCookie = cb;
    },
    getAPIHeaders: () => {
      return generateHeaders();
    },
    setAPIHeaders: (headers: () => RequestInit['headers']) => {
      appApiHeaders = headers;
    },
  };
})();

export { NetworkLayer };
