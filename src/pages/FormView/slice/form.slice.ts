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
  flightDetailsFormatter 
} from '../utils/dataFormatter';
import { FormState, ViewData, ViewState } from '../utils/props';
import { populatePrefetch } from '../utils/sagaFormatter';


const initialState: ViewState = {
  screenLoading: false,
  screenError: false,
  prefetch : { ...INITIAL_PREFETCH },
  convenienceFee : {},
  journeyType: JSON.parse(JSON.stringify({ ...JOURNEY_TYPE })),
  corporateDetails: JSON.parse(JSON.stringify({ ...CORPORATE_DETAILS })),
  tripDetails: JSON.parse(JSON.stringify({ ...TRIP_MAPPING })),
  bookingDetails: JSON.parse(JSON.stringify({ ...BOOKING_DETAILS })),
  flightDetails: JSON.parse(JSON.stringify({ ...FLIGHT_DETAILS })),
  stopDetails : JSON.parse(JSON.stringify({ ...STOP_DETAILS })),
  baggageDetails : JSON.parse(JSON.stringify({ ...BAGGAGE_DETAILS })),
  guestDetails : JSON.parse(JSON.stringify({ ...PASSENGER_DETAILS })),
  paymentMode : JSON.parse(JSON.stringify({ ...PAYMENT_DETAILS })),
  priceBreakup : JSON.parse(JSON.stringify({ ...PRICE_BREAKUP}))
};

const flightForm = createSlice({
  name: FLIGHT_FORM,
  initialState,
  reducers: {
    // Form State update
    updateFormState: (state, action: PayloadAction<FormState>) => {
      const { component, field, value } = action.payload;
      if (component in state && typeof state[component] === 'object') {
        const formState = (state[component] as Record<string, unknown>)[field] as { value: object };
        formState.value = value;
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
      flightForm.caseReducers.prefetchInit(state);
    },


    //Convenience fee
    getConvenienceFee :( state ) => {
      state.convenienceFee = {}
    },
    convenienceFeeSuccess : (state, action: PayloadAction<object>) => {
      state.convenienceFee = {...action.payload};
    },
    convenienceFeeError : (state, action: PayloadAction<string>) => {
      flightForm.caseReducers.getConvenienceFee(state);
    },  

    // View Details
    getViewDetails: (state) => {
      state.screenLoading = true;
      state.screenError = false;
    },
    viewDetailsSuccess: (state, action: PayloadAction<ViewData>) => {
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
    }
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
  convenienceFeeError
} = flightForm.actions;

export default flightForm.reducer;