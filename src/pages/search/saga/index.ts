import {call, put, select, takeLatest} from 'redux-saga/effects';

import {bookingsFetchingFailed, bookingsFetchingSucceeded, fetchBookings} from '../reducer';
import {FetchBookingApiBody, PAGE_CONTENT_LIMIT, SearchApiResponse,} from '../TypesAndConstants';
import {SearchAPI} from './api';
import {ClientError, ServerError} from "../../../layers/errors";
import NoInternetError from "../../../layers/errors/NoInternetError.ts";
import {PAGES} from "../../../navigation/TypesAndConstants.ts";
import {
    selectBookingId,
    selectCompanyId,
    selectFlightNumber,
    selectPageNumber,
    selectPnr
} from "../reducer/selector.ts";

function* _fetchBookingsData() {
    console.log("saga function called")
    try {
        const body: FetchBookingApiBody = {
            search: {
                companyId: yield select(selectCompanyId),
                flight: yield select(selectFlightNumber),
                pnr: yield select(selectPnr),
                bookingId: yield select(selectBookingId)
            },
            pageNo: yield select(selectPageNumber),
            limit: PAGE_CONTENT_LIMIT
        }
        const {data}: { data: SearchApiResponse } = yield call(SearchAPI.fetchBookings, body);
        yield put(bookingsFetchingSucceeded(data));
    } catch (error: Error | unknown) {
        if (error instanceof NoInternetError || error instanceof ServerError) {
            yield put(bookingsFetchingFailed({
                errorTitle: error?.data?.type || '',
                errorMessage: error?.message || '',
                onScreen: PAGES.SEARCH,
            }));
        } else if (error instanceof ClientError) {
            //     TODO: ?
        } else {
            // TODO: implement general error showing component - alerts.
            // Toast.show(ERROR_CONSTANTS.FETCHING_HOME_DATA, true);
        }
    }

}

function* watchSearchPageData() {
    yield takeLatest(fetchBookings.type, _fetchBookingsData);
}

export {watchSearchPageData as searchSaga};
