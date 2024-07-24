import Request from '../../../utils/Request';
import { URL } from '../constants/endpoints';

function getViewDetails(params) {
    const api = new Request(false);
    return api.get(URL.viewDetails, params?.payload, URL.viewDetails);
  }

  export default { getViewDetails }