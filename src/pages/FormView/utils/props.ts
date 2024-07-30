interface DetailItem {
    value: string;
    [key: string]: any;
  }
  
  interface Details {
    [key: string]: DetailItem;
  }
  
  interface ComponentProps {
    journeyType : Details;
    corporateDetails: Details;
    tripDetails: Details;
    bookingDetails: Details;
    flightDetails: Details;
    stopDetails : Details;
    baggageDetails : Details;
    guestDetails : Details;
    paymentMode : Details;
    priceBreakup : Details;
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

  interface JourneyType{
    journeyType?: string;
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
    journeyType?: JourneyType;
    corporateDetails?: CorporateDetails;
    relationshipManager?: RelationshipManager;
    flightDetails?: FlightDetails;
    bookingDetails?: BookingDetails;
  }
  
  interface ViewState extends ComponentProps{
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
  
  interface MoleculeType{
    onChangeInput: (event: React.ChangeEvent<HTMLInputElement>, type : string) => void;
    onChangeDropdown: (event: React.ChangeEvent<HTMLSelectElement>,type : string) => void;
  }

  interface FormState {
    component: keyof ViewState, 
    field: string; 
    value: any 
  }

  export type{
    ViewState,
    Details,
    State,
    ComponentProps,
    ViewDetailsRequest,
    ApiResponse,
    ErrorResponse,
    ViewDetailsParams,
    MoleculeType,
    ViewData,
    FormState,
    CorporateDetails,
    RelationshipManager,
    BookingDetails,
    FlightDetails
  }