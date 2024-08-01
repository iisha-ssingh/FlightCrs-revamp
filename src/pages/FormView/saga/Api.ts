import { NetworkLayer, ApiResponse } from '../../../layers/networkLayer';
import Request from '../../../utils/Request';
import { URL } from '../constants/endpoints';
import { 
  // ApiResponse, 
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
  getViewDetails :  (params: BookingIdPayload) => {
   const headers = { uri: URL.viewDetails };
    return NetworkLayer.post({service : URL.viewDetails, data : {...params}, options : {headers}});
  },
  getPrefetch :  () => {
   const headers = { uri: URL.prefetch };
    return NetworkLayer.get({service : URL.prefetch,data :{}, options : {headers}});
  },
   getConvenienceFee :  (params: CompanyIdPayload) => {
   const headers = { uri: URL.convenienceFee };
    return NetworkLayer.get({service : URL.convenienceFee, data: {...params}, options : {headers}});
  },
  search :  (params: ApiData) => {
   const headers = { uri: URL.search };
    return NetworkLayer.post({service : URL.search, data : JSON.parse(JSON.stringify({...params})),  options : {headers}});
  },
   getCustomConfig :  (params: CompanyIdPayload) => {
   const headers = { uri: URL.customConfig };
    return NetworkLayer.get({service : URL.customConfig, data : {...params}, options :{headers}});
  },
  getManagerList : (params: CompanyIdPayload) => {
   const headers = { uri: URL.managerList };
    return NetworkLayer.post({service : URL.managerList, data : {...params}, options :{headers}});
  },
  getGstInList : (params: CompanyIdPayload) => {
   const headers = { uri: URL.gstinList };
    return NetworkLayer.get({service : URL.gstinList, data : {...params}, options :{headers}});
  },
  getSubtripDetails : (params: SubtripPayload) => {
   const headers = { uri: URL.subtripDetails };
    return NetworkLayer.get({service : URL.subtripDetails, data: {...params}, options :{headers}});
  },
  cityAutosuggest : (params: CityAutoSuggestPayload) => {
   const headers = { uri: URL.cityAutosuggest };
    return NetworkLayer.get({service : URL.cityAutosuggest, data: {...params}, options :{headers}});
  },
  corporateUserSearch : (params: CorporateUserAutosuggest) => {
    const headers = { uri: URL.corporateUserSearch };
    return NetworkLayer.get({service : URL.corporateUserSearch, data : {...params}, options :{headers}});
  },
  downloadDocument : (params: DownloadDocumentRequest) => {
    const headers = { uri: URL.downloadDocument };
    return NetworkLayer.get({service : URL.downloadDocument, data : {...params}, options :{headers}});
  },
  downloadVoucher : (params: DownloadVoucherRequest) => {
    const headers = { uri: URL.downloadVoucher };
    return NetworkLayer.get({service : URL.downloadVoucher, data : {...params}, options :{headers}})
  },
  editGst : (params: GstDetails) => {
    const headers = { uri: URL.editGst };
    return NetworkLayer.post({service: URL.editGst, data : {...params}, options: { headers } });
  },
  editGstAuthorisation: () => {
    const headers = { uri: URL.editGstAuthorisation };
    return NetworkLayer.get({service: URL.editGstAuthorisation,data : {}, options: { headers } });
  },
  cancelModificationRequest: (params: BookingIdPayload) => {
    const headers = { uri: URL.cancelModificationRequestURI };
    const url = URL.cancelModificationRequest.replace('${bookingId}', params.bookingId);
    return NetworkLayer.post({service : url, data: {}, options: { headers }});
  }
}

export  {Api};