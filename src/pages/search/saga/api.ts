import {ApiParamsWithData, NetworkLayer} from "../../../layers/networkLayer.ts";
import {Urls} from "../../../api/Urls.ts";
import {FetchBookingApiBody} from "../TypesAndConstants.ts";

const fetchBookings = async (body: FetchBookingApiBody) => {
    // FIXME: why as ApiParamsWithData required
    await NetworkLayer.post({service: Urls.fetchBookings, data: {detail: body}} as ApiParamsWithData);
}

const getCorporateSuggestions = async (query: string) =>
    // FIXME: why as ApiParamsWithData required
    await NetworkLayer.get({service: Urls.corporateAutoSuggest(query)} as ApiParamsWithData);

export const SearchAPI = {fetchBookings, getCorporateSuggestions};
