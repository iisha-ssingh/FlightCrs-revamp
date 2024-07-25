import Api from './Api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getViewDetails, viewDetailsSuccess, viewDetailsFailure } from '../slice/viewDetails.slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse, ErrorResponse, ViewDetailsRequest } from '../utils/propType';



function* fetchViewDetails(action: PayloadAction<ViewDetailsRequest>) {
  const tempRequest = {
    payload: {
      companyId: "",
      bookingId: "FSONDIY"
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
}