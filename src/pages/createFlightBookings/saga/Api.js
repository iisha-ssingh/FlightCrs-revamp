import Request from '../../../utils/Request';
import { URL } from '../constants/endpoints';

function getViewDetails(params) {
    const api = new Request(false);
    return api.post(URL.viewDetails, params?.payload, URL.viewDetails);
  }

  export default { getViewDetails }