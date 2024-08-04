import {SearchSliceProps} from "../TypesAndConstants.ts";
import {createSlice} from "@reduxjs/toolkit";
import {FetchBookingsData,} from '../TypesAndConstants';


const initialState: SearchSliceProps = {
    flightNumber: '',
    pnr: '',
    companyId: 0,
    bookingId: '',
    pageNo: 1,
    bookings: [],
    searchDataLoading: false,
    bookingsServerError: ''
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        fetchBookings: (state, _: FetchBookingsData) => {
            state.searchDataLoading = true;
        },
        bookingsFetchingSucceeded: (state, action) => {
            state.flightNumber = '';
            state.pnr = '';
            state.companyId = 0;
            state.bookingId = '';
            state.pageNo = action.payload.bookings;
            state.bookings = action.payload.bookings;
            state.searchDataLoading = false;
            state.bookingsServerError = '';
        },

        bookingsFetchingFailed: (state, action) => {
            state.searchDataLoading = false;
            state.bookingsServerError = action.payload.error;
        },
    }
});

export const {
    fetchBookings,
    bookingsFetchingSucceeded,
    bookingsFetchingFailed
} = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
