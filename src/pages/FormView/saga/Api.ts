import Request from '../../../utils/Request';
import { URL } from '../constants/endpoints';
import { 
  ApiResponse, 
  CompanyIdPayload, 
  ApiData, 
  SubtripPayload, 
  CityAutoSuggestPayload, 
  CorporateUserAutosuggest,
  DownloadDocumentRequest,
  DownloadVoucherRequest,
  GstDetails,
  BookingIdPayload
} from '../utils/props';

const Api = {
  getViewDetails :  (params: BookingIdPayload): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.post(URL.viewDetails, params, URL.viewDetails);
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
  corporateUserSearch : (params: CorporateUserAutosuggest): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.get(URL.corporateUserSearch, params, URL.corporateUserSearch);
  },
  downloadDocument : (params: DownloadDocumentRequest): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.get(URL.downloadDocument, params, URL.downloadDocument);
  },
  downloadVoucher : (params: DownloadVoucherRequest): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.get(URL.downloadVoucher, params, URL.downloadVoucher);
  },
  editGst : (params: GstDetails): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.post(URL.editGst, params, URL.editGst);
  },
  editGstAuthorisation : (): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.get(URL.editGstAuthorisation, {}, URL.editGstAuthorisation);
  },
  cancelModificationRequest : (params : BookingIdPayload): Promise<ApiResponse> => {
    const api = new Request(false);
    return api.post(URL.cancelModificationRequest, params, URL.cancelModificationRequest);
  }

}

export  {Api};