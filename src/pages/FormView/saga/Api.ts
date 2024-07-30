import Request from '../../../utils/Request';
import { URL } from '../constants/endpoints';
import { ApiResponse, ConvenienceFeeRequest, ViewDetailsParams } from '../utils/props';

class Api {
  static getViewDetails(params: ViewDetailsParams): Promise<ApiResponse> {
    const api = new Request(false);
    return api.post(URL.viewDetails, params.payload, URL.viewDetails);
  }

  static getPrefetch(): Promise<ApiResponse> {
    const api = new Request(false);
    return api.get(URL.prefetch, {} , URL.prefetch);
  }

  static getConvenienceFee(params:ConvenienceFeeRequest): Promise<ApiResponse> {
    const api = new Request(false);
    return api.get(URL.convenienceFee, params.payload , URL.convenienceFee);
  }

}

export default Api;