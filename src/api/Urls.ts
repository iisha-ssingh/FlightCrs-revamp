enum ApiVersion {
    V1 = 'v1'
}

const getBaseUrl = (apiVersion: ApiVersion) => {
    return `admin/flightcrs/flightaggregation/${apiVersion}/`;
};

const Urls = {

    // Search  POST
    // searchBookings: "https://crs.fabhotels.com/admin/flightcrs/flightaggregation/v1/flight/crs/booking/list",
    fetchBookings: getBaseUrl(ApiVersion.V1) + 'flight/crs/booking/list',
    //  {search: {companyId: 0, flight: null, pnr: null, bookingId: "f"}, pageNo: 1, limit: 10}
    // {search: {companyId: 0, flight: null, pnr: null, bookingId: "f"}, pageNo: 2, limit: 10}
    // {search: {companyId: 0, flight: "AI-591", pnr: "Z2CL7C", bookingId: "f"}, pageNo: 1, limit: 10}
    // {search: {companyId: 51395, flight: "AI-591", pnr: "Z2CL7C", bookingId: "f"}, pageNo: 1, limit: 10}

    // GET
    // autosuggest: "https://crs.fabhotels.com/admin/flightcrs/flightaggregation/v1/corporate/search?companyName=tra",
    // autosuggestC: getBaseUrlC(ApiVersion.V1) + 'corporate/search?companyName=tra',
    corporateAutoSuggest: (name: string) => getBaseUrl(ApiVersion.V1) + `corporate/search?companyName=${name}`,
};

export {Urls};
