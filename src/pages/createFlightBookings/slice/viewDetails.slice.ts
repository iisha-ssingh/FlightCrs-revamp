import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VIEW_FLIGHT } from '../constants/strings';
import { 
  BOOKING_DETAILS, 
  CORPORATE_DETAILS, 
  FLIGHT_DETAILS, 
  TRIP_MAPPING 
} from '../constants/formState';
import { 
  corporateDetailsFormatter, 
  tripDetailsFormatter, 
  bookingDetailsFormatter,
  flightDetailsFormatter 
} from '../utils/dataFormatter';
import { ViewData, ViewState } from '../utils/propType';

const initialState: ViewState = {
  viewData: {},
  viewLoading: false,
  viewError: false,
  corporateDetails: JSON.parse(JSON.stringify({ ...CORPORATE_DETAILS })),
  tripDetails: JSON.parse(JSON.stringify({ ...TRIP_MAPPING })),
  bookingDetails: JSON.parse(JSON.stringify({ ...BOOKING_DETAILS })),
  flightDetails: JSON.parse(JSON.stringify({ ...FLIGHT_DETAILS })),
};

const flightViewBookings = createSlice({
  name: VIEW_FLIGHT,
  initialState,
  reducers: {
    getViewDetails: (state) => {
      state.viewData = {};
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

      state.viewData = viewData;
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
      state.viewData = {};
      state.viewLoading = false;
      state.viewError = true;
    }
  }
});

export const {
  getViewDetails,
  viewDetailsSuccess,
  viewDetailsFailure
} = flightViewBookings.actions;

export default flightViewBookings.reducer;