import Api from './Api';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getViewDetails, viewDetailsSuccess, viewDetailsFailure } from '../slice/viewDetails.slice';

function* fetchViewDetails(request) {
    try {
      const response = yield call(Api.getViewDetails, request);
      const content = response?.data?.data ?? {}
      yield put(viewDetailsSuccess(content));
    } catch ({ response: errorResponse = {} }) {
      const error = errorResponse?.data?.message ?? {};
      yield put(viewDetailsFailure(error));
    }
  }

  export default function* FlightBookingCreate() {
    yield takeLatest(getViewDetails.type, fetchViewDetails);
  }
  