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
  PRICE_BREAKUP
} from '../constants/formState';
import { 
  corporateDetailsFormatter, 
  tripDetailsFormatter, 
  bookingDetailsFormatter,
  flightDetailsFormatter 
} from '../utils/dataFormatter';
import { FormState, ViewData, ViewState } from '../utils/props';

const initialState: ViewState = {
  viewLoading: false,
  viewError: false,
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

    updateFormState: (state, action: PayloadAction<FormState>) => {
      const { component, field, value } = action.payload;
      if (component in state && typeof state[component] === 'object') {
        const formState = (state[component] as Record<string, unknown>)[field] as { value: object };
        formState.value = value;
      }
    },

    getViewDetails: (state) => {
      state.viewLoading = true;
      state.viewError = false;
    },

    viewDetailsSuccess: (state, action: PayloadAction<ViewData>) => {
      const viewData = action.payload ?? {};
      const { 
        corporateDetails = {}, 
        relationshipManager = {}, 
        flightDetails = {} , 
        bookingDetails = {}
      } = viewData;

      state.viewLoading = false;
      state.viewError = false;
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
      state.viewLoading = false;
      state.viewError = true;
    }
  }
});

export const {
  updateFormState,
  getViewDetails,
  viewDetailsSuccess,
  viewDetailsFailure
} = flightForm.actions;

export default flightForm.reducer;