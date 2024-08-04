import {RootState} from '../../../store';

// FIXME: Only for demo purpose
export const selectCompanyId = (state: RootState) => state.searchReducer?.companyId;
export const selectFlightNumber = (state: RootState) => state.searchReducer?.flightNumber;
export const selectPnr = (state: RootState) => state.searchReducer?.pnr;
export const selectBookingId = (state: RootState) => state.searchReducer?.bookingId;
export const selectPageNumber = (state: RootState) => state.searchReducer?.pageNo;
