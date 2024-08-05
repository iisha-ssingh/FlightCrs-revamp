import Request from '../../../utils/request';
import { URL } from '../constants/endpoints';
import { 
  ApiResponse, 
  CompanyIdPayload, 
  ApiData, 
  ViewDetailsParams, 
  SubtripPayload, 
  CityAutoSuggestPayload,
  SearchCompanyPayload,
} from '../utils/props';

const Api = {
  getViewDetails :  (params: ViewDetailsParams): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.post(URL.viewDetails, params.payload, URL.viewDetails);
  },
  getPrefetch :  (): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.get(URL.prefetch, {}, URL.prefetch);
  },
   getConvenienceFee :  (params: CompanyIdPayload): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.get(URL.convenienceFee, params, URL.convenienceFee);
  },
  search :  (params: ApiData): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.post(URL.search, params, URL.search);
  },
   getCustomConfig :  (params: CompanyIdPayload): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.get(URL.customConfig, params, URL.customConfig);
  },
  getManagerList : (params: CompanyIdPayload): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.post(URL.managerList, params, URL.managerList);
  },
  getGstInList : (params: CompanyIdPayload): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.get(URL.gstinList, params, URL.gstinList);
  },
  getSubtripDetails : (params: SubtripPayload): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.get(URL.subtripDetails, params, URL.subtripDetails);
  },
  cityAutosuggest : (params: CityAutoSuggestPayload): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.get(URL.cityAutosuggest, params, URL.cityAutosuggest);
  },
  // TODO: CORRECT THE TYPE OF THE PARAMS HERE
  getCorporateList : (params:SearchCompanyPayload): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.get(URL.companyName, params, URL.companyName);
  }
}

export  {Api};