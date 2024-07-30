import Request from '../../../utils/Request';
import { URL } from '../constants/endpoints';
import { ApiResponse, ViewDetailsParams } from '../utils/props';

class Api {
  static getViewDetails(params: ViewDetailsParams): Promise<ApiResponse> {
    const api = new Request(false);
    return api.post(URL.viewDetails, params.payload, URL.viewDetails);
  }
}

export default Api;