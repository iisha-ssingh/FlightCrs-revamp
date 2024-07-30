import Api from './Api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse, ErrorResponse, ViewDetailsRequest } from '../utils/props';
import { 
  getViewDetails, 
  viewDetailsSuccess, 
  viewDetailsFailure, 
  prefetchSuccess, 
  prefetchError, 
  prefetchInit,
  getConvenienceFee,
  convenienceFeeSuccess,
  convenienceFeeError
} from '../slice/form.slice';

function* fetchPrefetchSaga() {
  try {
    const response: ApiResponse = yield call(Api.getPrefetch);
    const content = response?.data?.data ?? {};
    yield put(prefetchSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.data?.message ?? "An error occurred";
    yield put(prefetchError(errorMessage));
  }
}

function* fetchConvenienceFee() {
  const tempRequest = {
    payload: {
      companyId: "11327",
    }
  };

  try {
    const response: ApiResponse = yield call(Api.getConvenienceFee, tempRequest);
    const content = response?.data?.data ?? {};
    yield put(convenienceFeeSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.data?.message ?? "An error occurred";
    yield put(convenienceFeeError(errorMessage));
  }
}

function* fetchViewDetails(action: PayloadAction<ViewDetailsRequest>) {
  const tempRequest = {
    payload: {
      companyId: "",
      bookingId: "FVFNFVU"
    }
  };

  try {
    const response: ApiResponse = yield call(Api.getViewDetails, tempRequest);
    const content = response?.data?.data ?? {};
    yield put(viewDetailsSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.data?.message ?? "An error occurred";
    yield put(viewDetailsFailure(errorMessage));
  }
}

export default function* FlightBookingCreate() {
  yield takeLatest(getViewDetails.type, fetchViewDetails);
  yield takeLatest(prefetchInit.type, fetchPrefetchSaga);
  yield takeLatest(getConvenienceFee.type, fetchConvenienceFee);
}