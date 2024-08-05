// TODO: CHANGED THE TYPE OF VALUE IN KEYVALUE INTERFACE TO ANY FROM STRING BECAUSE IT COULD BE AN OBJECT ALSO
interface KeyValue {
    value: any;
    [key: string]: unknown;
  }
  
  interface Details {
    [key: string]: KeyValue;
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


  interface ApiData {
    journeyType?: JourneyType;
    corporateDetails?: CorporateDetails;
    relationshipManager?: RelationshipManager;
    flightDetails?: FlightDetails;
    bookingDetails?: BookingDetails;
  }

  type ConvenienceFees = {
    convenienceFeeWithGst: number;
    reissueConvenienceFeeWithGst: number;
    cancellationConvenienceFeeWithGst: number;
    internationalConvenienceFeeWithGst: number;
    internationalReissueConvenienceFeeWithGst: number;
    internationalCancellationConvenienceFeeWithGst: number;
  };

  type Company = {
    uuid: string;
    id: number;
    companyName: string;
    btcEnabled: boolean;
    lastBtcBookingDate: string | null;
    salesPocName: string | null;
  };

  type PrefetchData = {
    airlines: Array<{ code: string; name: string }>;
    stops: Array<{ id: string; name: string }>;
    cabinClasses: Array<{ id: string; name: string }>;
    paymentModes: Array<{ id: string; name: string }>;
    paymentOptions: Array<{ id: string; name: string }>;
    genders: Array<{ id: string; name: string }>;
    ticketingSources: Array<{ id: string; name: string }>;
    terminals: Array<{ id: string; name: string }>;
    isdCodes: Array<{ code: string; country: string }>;
    journeyTypes: Array<{ id: string; name: string }>;
    guestType: Array<{ id: string; name: string }>;
    seatTypes: Array<{ id: string; name: string }>;
  };
  
  interface User {
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    countryCode: string;
    panNo: string | null;
    corporateMapping: CorporateMapping[];
  }
  
  interface CorporateMapping {
    companyId: string;
    status: boolean;
    mappingId: string;
  }
  interface GstinList {
    stateId: number;
    gstin: string;
    address: string;
    entityName: string | null;
    stateName: string;
    pinCode: string;
    isDefault: boolean;
  }
  
  interface SubtripPayload extends CompanyIdPayload {
    masterTripId: string;
    isBundle : boolean;
  }

  interface CitySuggestion {
    city: string;
    airportCode: string;
    airportName: string;
    northEastLat: number;
    northEastLng: number;
    southWestLat: number;
    southWestLng: number;
    cityId: number;
    state: string;
    country: string;
  }

  type CitySuggestionResponse = {
    suggestions: CityAutoSuggestPayload[];
  }

  interface FormView extends ComponentProps{
    screenLoading: boolean;
    screenError: boolean;
    prefetch: PrefetchData;
    convenienceFee: ConvenienceFees | Object;    
    companyName : Company[] | Array<Object>;
    customConfig : CustomConfig | Object;
    managerList : User[] | Array<Object>;
    gstInList : GstinList[] | Array<Object>;
    subtripDetails : Array<Object>; //TODO: Add type
    cityAutosuggestList : CitySuggestion[] | Array<Object>; 
    dependentFields: DependentFields;
  }
  
  // TODO: NEED TO ADD THE TYPE FOR GSTLIST, MANAGERLIST, tripCustomFieldConfigs, userCustomFieldConfigs
  interface DependentFields {
    tripCustomFieldConfigs: any[];
    userCustomFieldConfigs: any[];
    gstList: any[];
    managerList: any[];
    cancellationConvenienceFeeWithGst: number;
    convenienceFeeWithGst: number;
    errorEncountered: boolean;
    errorMessage: string;
    isReset: boolean;
  }
  interface ViewDetailsRequest {
    companyId: string;
    bookingId: string;
  }

  type CompanyIdPayload = {
    companyId: string | number
  }

  type CityAutoSuggestPayload = {
    query: string | null
  }

  type SearchCompanyPayload = {
    companyName: string | null
  }
  
  interface ApiResponse {
    data?: {
      data?: unknown;
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
    component: keyof FormView, 
    field: string; 
    value: any 
  }

  interface FormStateViaKey {
    component: keyof FormView;
    field: string;
    key: string;
    value: any;
  }

  interface CustomConfig {
    tripCustomFieldConfigs: TripCustomFieldConfig[] | null;
    tripStaticData: StaticData | null;
    userCustomFieldConfigs: UserCustomFieldConfig[] | null;
    userStaticData: StaticData | null;
  }
  interface CustomFieldConfig{
    fieldName: string;
    fieldValue: null;
    fieldType: KeyValue;
    dropDownValues: string[] | null;
    mandatory: KeyValue;
    createdOn: string;
    applicableOn: KeyValue[];
  }
  
  interface UserCustomFieldConfig extends CustomFieldConfig {
    userCustomFieldConfigId: string;
    userCustomFieldId: null;
  }
  interface TripCustomFieldConfig extends CustomFieldConfig {
    tripCustomFieldConfigId: string;
    tripCustomFieldId: null;
  }
  
  type StaticData = {
    fieldType: KeyValue[];
    applicableOn: KeyValue[];
    mandatory: KeyValue[];
    actions: KeyValue[];
}

interface CompanyIdState {
  corporateDetails: {
    companyName: {
      value?: {
        companyId?: string;
      };
    };
  };
}
 

interface MasterTripIdState {
  tripDetails: {
    tripId: {
      value: string;
    };
  };
}
 


  export type{
    Details,
    State,
    ComponentProps,
    ViewDetailsRequest,
    ApiResponse,
    ErrorResponse,
    ViewDetailsParams,
    MoleculeType,
    ApiData,
    FormState,
    CorporateDetails,
    RelationshipManager,
    BookingDetails,
    FlightDetails,
    CompanyIdPayload,
    Company,
    FormView,
    CustomConfig,
    User,
    CompanyIdState,
    SubtripPayload,
    MasterTripIdState,
    CityAutoSuggestPayload,
    GstinList,
    CitySuggestionResponse,
    SearchCompanyPayload,
    DependentFields,
    FormStateViaKey,
    PrefetchData,
  }