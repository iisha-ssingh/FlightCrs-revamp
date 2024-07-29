interface DetailItem {
    value: string;
    [key: string]: any;
  }
  
  interface Details {
    [key: string]: DetailItem;
  }
  
  interface ComponentProps {
    corporateDetails: Details;
    tripDetails: Details;
    bookingDetails: Details;
    flightDetails: Details;
  }

  interface StateDetail {
    [key: string]: any;
  }
  
  interface State {
    corporateDetails: StateDetail;
    tripDetails: StateDetail;
    bookingDetails: StateDetail;
    flightDetails: StateDetail;
  }
  
  interface CorporateDetails {
    companyName?: string;
    companyId?: string;
    companyGstDetail?: {
      gSTCompanyName?: string;
      gSTNumber?: string;
      gSTCompanyAddress?: string;
      gSTCompanyPinCode?: string;
    };
  }
  
  interface RelationshipManager {
    relationshipManagerName?: string;
    relationshipManagerPhone?: string;
    relationshipManagerEmail?: string;
  }
  
  interface FlightDetails {
    masterTripId?: string;
    flightTripId?: string;
    ticketingSource?: string;
    airline?: string;
    flightNumber?: string;
    class?: string;
    pnr?: string;
    depDateTime?: string;
    arrDateTime?: string;
    depTerminal?: string;
    arrTerminal?: string;
  }
  
  interface BookingDetails {
    origin?: string;
    destination?: string;
    depDate?: string;
    noOfTravellers?: string;
  }


  interface ViewData {
    corporateDetails?: CorporateDetails;
    relationshipManager?: RelationshipManager;
    flightDetails?: FlightDetails;
    bookingDetails?: BookingDetails;
  }
  
  interface ViewState extends ComponentProps{
    viewData: ViewData;
    viewLoading: boolean;
    viewError: boolean;
  }

  interface ViewDetailsRequest {
    companyId: string;
    bookingId: string;
  }
  
  interface ApiResponse {
    data?: {
      data?: any;
    },
    status?: number;
  }
  
  interface ErrorResponse {
    response?: {
      data?: {
        message?: string;
      };
    };
  }

  interface ViewDetailsParams {
    payload: {
      companyId: string;
      bookingId: string;
    };
  }
  

  export type{
    ViewState,
    Details,
    State,
    CorporateDetails,
    RelationshipManager,
    FlightDetails,
    BookingDetails,
    ComponentProps,
    ViewData,
    ViewDetailsRequest,
    ApiResponse,
    ErrorResponse,
    ViewDetailsParams
  }