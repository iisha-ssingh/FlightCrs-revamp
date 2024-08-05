import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FLIGHT_FORM } from '../constants/strings';
import { 
  BOOKING_DETAILS, 
  CORPORATE_DETAILS, 
  FLIGHT_DETAILS, 
  TRIP_MAPPING,
  JOURNEY_TYPE,
  BAGGAGE_DETAILS,
  STOP_DETAILS,
  PASSENGER_DETAILS,
  PAYMENT_DETAILS,
  PRICE_BREAKUP,
  INITIAL_PREFETCH
} from '../constants/formState';
import { 
  corporateDetailsFormatter, 
  tripDetailsFormatter, 
  bookingDetailsFormatter,
  flightDetailsFormatter ,
  populatePrefetch
} from '../utils/apiDataFormatter';
import { 
  FormState, 
  ApiData, 
  FormView, 
  Company, 
  User, 
  CustomConfig, 
  CityAutoSuggestPayload, 
  GstinList,
  CitySuggestionResponse,
  SearchCompanyPayload,
  DependentFields,
  FormStateViaKey
} from '../utils/props';

const initialDependentFields: DependentFields = {
  tripCustomFieldConfigs: [],
  userCustomFieldConfigs: [],
  gstList: [],
  managerList: [],
  cancellationConvenienceFeeWithGst: 0,
  convenienceFeeWithGst: 0,
  errorEncountered: false,
  errorMessage: '',
  isReset: false,
};

const initialState: FormView = {
  screenLoading: false,
  screenError: false,
  prefetch : {
    ...INITIAL_PREFETCH,
  },
  convenienceFee : {},
  companyName : [],
  customConfig : {},
  managerList : [],
  gstInList:[],
  subtripDetails : [],
  cityAutosuggestList : [],
  journeyType: JSON.parse(JSON.stringify({ ...JOURNEY_TYPE })),
  corporateDetails: JSON.parse(JSON.stringify({ ...CORPORATE_DETAILS })),
  tripDetails: JSON.parse(JSON.stringify({ ...TRIP_MAPPING })),
  bookingDetails: JSON.parse(JSON.stringify({ ...BOOKING_DETAILS })),
  flightDetails: JSON.parse(JSON.stringify({ ...FLIGHT_DETAILS })),
  stopDetails : JSON.parse(JSON.stringify({ ...STOP_DETAILS })),
  baggageDetails : JSON.parse(JSON.stringify({ ...BAGGAGE_DETAILS })),
  guestDetails : JSON.parse(JSON.stringify({ ...PASSENGER_DETAILS })),
  paymentMode : JSON.parse(JSON.stringify({ ...PAYMENT_DETAILS })),
  priceBreakup : JSON.parse(JSON.stringify({ ...PRICE_BREAKUP})),
  dependentFields: initialDependentFields,
};

// TODO : PUT THIS FILE INSIDE THE UTILS FOLDER
export const formatGst = (gstOptionList: any[] = []): any[] => {
  if (!Array.isArray(gstOptionList)) {
    return [];
  }
  return gstOptionList.map((item) => ({
    ...item,
    value: item.gstin,
    text: item.entityName ?? '',//TODO: TO BE CHECKED WHAT TO PUT THE DEFAULT VALUE IN TEXT IF ENTITY NAME IS NULL
  }));
};
// TODO: PUT THIS FILE INSIDE THE UTILS FOLDER
export const formatManager = (corporateManagersData: any[] = []): any[] => {
  if (!Array.isArray(corporateManagersData)) {
    return [];
  }
  return corporateManagersData.map((item) => ({
    key: item.userId,
    id: item.userId,
    text: `${item.firstName} ${item.lastName}`,
    name: `${item.firstName} ${item.lastName}`,
    ...item,
  }));
};

const flightForm = createSlice({
  name: FLIGHT_FORM,
  initialState,
  reducers: {
    // Form State update
    updateFormState: (state, action: PayloadAction<{
      component: keyof typeof state,
      updates: Record<string, any>
    }>) => {
      const { component, updates } = action.payload;
      if (component in state && typeof state[component] === 'object') {
        (state[component] as Record<string, any>) = {
          ...(state[component] as Record<string, any>),
          ...updates
        };
      }
    },
    updateViaKeyFormState: (state, action: PayloadAction<FormStateViaKey>) => {
      const { component, field, key, value } = action.payload;
      if (component in state && typeof state[component] === 'object') {
        const formState = (state[component] as Record<string, unknown>)[field] as Record<string, unknown>;
        formState[key] = value;
      }
    },

    // Prefetch
    prefetchInit : (state) => {
      state.prefetch  = { ...INITIAL_PREFETCH };
    },
    prefetchSuccess : (state, action: PayloadAction<object>) => {
      state.prefetch  = populatePrefetch(action.payload);
    },
    prefetchError : (state, action: PayloadAction<string>) => {
      state.prefetch  = { ...INITIAL_PREFETCH };
    },


    //Convenience fee
    getConvenienceFee :( state ) => {
      state.convenienceFee = {}
    },
    convenienceFeeSuccess : (state, action: PayloadAction<object>) => {
      state.convenienceFee = {...action.payload};
    },
    convenienceFeeError : (state, action: PayloadAction<string>) => {
      state.convenienceFee = {}
    },  

    //Company name
    getCompanyName : (state,action : PayloadAction<SearchCompanyPayload | object>) => {
      state.companyName = []
    },
    companyNameSuccess : (state, action: PayloadAction<Company[]>) => {
      state.companyName = [...action.payload];
    },
    companyNameError : (state, action: PayloadAction<string>) => {
      state.convenienceFee = {}
      state.corporateDetails.companyName = {
        ...state.corporateDetails.companyName,
        value: '',
        isError : true,
        errorMessage: action.payload
      }
    },

    //Custom config
    getCustomConfig : (state) => {
      state.customConfig = {}
    },
    customConfigSuccess : (state, action: PayloadAction<CustomConfig | object>) => {
      state.customConfig = {...action.payload};
    },
    customConfigError : (state, action: PayloadAction<string>) => {
      state.customConfig = {}
    },

    //Manager List
    getManagerList : (state) => {
      state.managerList = []
    },
    managerListSuccess : (state, action: PayloadAction<User[] | []>) => {
      state.managerList = [...action.payload];
    },
    managerListError : (state, action: PayloadAction<string>) => {
      state.managerList = []
    },

     //GstIn
    getGstIn : (state) => {
      state.gstInList = []
    },
    gstInSuccess : (state, action: PayloadAction<GstinList[] | []>) => {
      state.gstInList = [...action.payload];
    },
    gstInError : (state, action: PayloadAction<string>) => {
      state.gstInList = []
    },

      //Subtrip details
      getSubtripDetails : (state) => {
        state.subtripDetails = []
      },
      subtripSuccess : (state, action: PayloadAction<Array<object> | null>) => {
        state.subtripDetails = [...(Array.isArray(action.payload) ? action.payload : [])];
      },
      subtripError : (state, action: PayloadAction<string>) => {
        state.subtripDetails = []
      },

        //City autosuggest
        getCityAutosuggest : (state, action : PayloadAction<CityAutoSuggestPayload | object> ) => {
          state.cityAutosuggestList = []
        },
        cityAutosuggestSuccess: (state, action: PayloadAction<CitySuggestionResponse | {}>) => {
          if ('suggestions' in action.payload) {
            state.cityAutosuggestList = [...action.payload.suggestions];
          } else {
            state.cityAutosuggestList = [];
          }
        },
        cityAutosuggestError : (state, action: PayloadAction<string>) => {
          state.cityAutosuggestList = []
        },

    // View Details
    getViewDetails: (state) => {
      state.screenLoading = true;
      state.screenError = false;
    },
    viewDetailsSuccess: (state, action: PayloadAction<ApiData>) => {
      const viewData = action.payload ?? {};
      const { 
        corporateDetails = {}, 
        relationshipManager = {}, 
        flightDetails = {} , 
        bookingDetails = {}
      } = viewData;

      state.screenLoading = false;
      state.screenError = false;
      state.corporateDetails = {
        ...state.corporateDetails,
        ...corporateDetailsFormatter(state, corporateDetails, relationshipManager)
      };
      state.tripDetails = {
        ...state.tripDetails,
        ...tripDetailsFormatter(state, flightDetails)
      };
      state.bookingDetails = {
        ...state.bookingDetails,
        ...bookingDetailsFormatter(state, bookingDetails)
      };
      state.flightDetails = {
        ...state.flightDetails,
        // ...flightDetailsFormatter(state,flightDetails)
      };
    },
    viewDetailsFailure: (state, action: PayloadAction<string>) => {
      state.screenLoading = false;
      state.screenError = true;
    },

    //= ================Dependent field===============
    getDependentField: (state) => {
      state.dependentFields.tripCustomFieldConfigs = [];
      state.dependentFields.userCustomFieldConfigs = [];
      state.dependentFields.gstList = [];
      state.dependentFields.managerList = [];
      state.dependentFields.cancellationConvenienceFeeWithGst = 0;
      state.dependentFields.convenienceFeeWithGst = 0;
      state.dependentFields.errorEncountered = false;
      state.dependentFields.isReset = false;
    },
    dependentFieldsSuccess: (state, action) => {
      const [gstList = {}, managerList = {}, configList = {}, conveFee = {}] = action.payload ?? []
      const gstDisplayList = gstList.data.data ?? [];
      const managerDisplayList = managerList.data.data ?? [];
      const { tripCustomFieldConfigs = [], userCustomFieldConfigs = []} = configList.data.data ?? {};
      const { convenienceFeeWithGst = 0, cancellationConvenienceFeeWithGst = 0 } = conveFee.data.data ?? {};
      state.dependentFields.tripCustomFieldConfigs = tripCustomFieldConfigs;
      state.dependentFields.userCustomFieldConfigs = userCustomFieldConfigs;
      state.dependentFields.gstList = formatGst(gstDisplayList);
      state.dependentFields.managerList = formatManager(managerDisplayList);
      state.dependentFields.cancellationConvenienceFeeWithGst =
        cancellationConvenienceFeeWithGst;
      state.dependentFields.convenienceFeeWithGst = convenienceFeeWithGst;
      state.dependentFields.errorEncountered = false;
    },
    dependentFieldsFailure: (state, action) => {
      // const error = pathOr('', 'payload', action);
      const error = action.payload ?? '';
      state.dependentFields.tripCustomFieldConfigs = [];
      state.dependentFields.userCustomFieldConfigs = [];
      state.dependentFields.gstList = [];
      state.dependentFields.managerList = [];
      state.dependentFields.cancellationConvenienceFeeWithGst = 0;
      state.dependentFields.convenienceFeeWithGst = 0;
      state.dependentFields.errorEncountered = true;
      state.dependentFields.errorMessage = error;
    },
    dependentFieldsReset: (state) => {
      state.dependentFields.errorEncountered = false;
      state.dependentFields.errorMessage = '';
      state.dependentFields.isReset = true;
      state.dependentFields.tripCustomFieldConfigs = [];
      state.dependentFields.userCustomFieldConfigs = [];
      state.dependentFields.gstList = [];
      state.dependentFields.managerList = [];
      state.dependentFields.cancellationConvenienceFeeWithGst = 0;
      state.dependentFields.convenienceFeeWithGst = 0;
    },
  }
});

export const {
  updateFormState,
  prefetchInit,
  prefetchSuccess,
  prefetchError,
  getViewDetails,
  viewDetailsSuccess,
  viewDetailsFailure,
  getConvenienceFee,
  convenienceFeeSuccess,
  convenienceFeeError,
  getCustomConfig,
  customConfigSuccess,
  customConfigError,
  getManagerList,
  managerListSuccess,
  managerListError,
  getGstIn,
  gstInSuccess,
  gstInError,
  getSubtripDetails,
  subtripSuccess,
  subtripError,
  getCityAutosuggest,
  cityAutosuggestSuccess,
  cityAutosuggestError,
  getCompanyName,
  companyNameSuccess,
  companyNameError,
  getDependentField,
  dependentFieldsSuccess,
  dependentFieldsFailure,
  dependentFieldsReset,
  updateViaKeyFormState,
} = flightForm.actions;

export default flightForm.reducer;