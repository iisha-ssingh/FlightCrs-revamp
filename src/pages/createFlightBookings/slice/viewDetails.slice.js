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
            state.view.viewData = [];
            state.view.viewLoading = true;
            state.view.viewError = false;
          },
  
          viewDetailsSuccess: (state, action) => {
            const viewData = pathOr({}, 'payload', action);
            state.view.viewData = viewData;
            state.view.viewLoading = false;
            state.view.viewError = false;
          },
          viewDetailsFailure: (state) => {
            state.view.viewData = [];
            state.view.viewLoading = false;
            state.view.viewError = true;
          }
    }
})

export const {
    getViewDetails,
    viewDetailsSuccess,
    viewDetailsFailure
} = flightViewBookings.actions;

export default flightViewBookings.reducer;
