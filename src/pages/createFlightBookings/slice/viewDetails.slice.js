import { createSlice } from '@reduxjs/toolkit';
import { CORPORATE_DETAILS } from '../constants/formState';
import { VIEW_FLIGHT } from '../constants/strings';
const initialState = {
      viewData: {},
      viewLoading: false,
      viewError: false,
    //   corporateDetails : JSON.parse(JSON.stringify({ ...CORPORATE_DETAILS })),
  };

  const flightViewBookings = createSlice({
    name: VIEW_FLIGHT,
    initialState,
    reducers: {
        getViewDetails: (state) => {
            state.viewData = [];
            state.viewLoading = true;
            state.viewError = false;
          },
  
          viewDetailsSuccess: (state, action) => {
            const viewData = pathOr({}, 'payload', action);
            state.viewData = viewData;
            state.viewLoading = false;
            state.viewError = false;
          },
          viewDetailsFailure: (state) => {
            state.viewData = [];
            state.viewLoading = false;
            state.viewError = true;
          }
    }
})

export const {
    getViewDetails,
    viewDetailsSuccess,
    viewDetailsFailure
} = flightViewBookings.actions;

export default flightViewBookings.reducer;
