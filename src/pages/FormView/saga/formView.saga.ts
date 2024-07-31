import {Api} from './Api';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { 
  ApiResponse, 
  CityAutoSuggestPayload,
  CitySuggestionResponse,
  CompanyIdState, 
  CustomConfig, 
  ErrorResponse, 
  GstinList, 
  MasterTripIdState, 
  User, 
  ViewDetailsRequest 
} from '../utils/props';

import { 
  getViewDetails, 
  viewDetailsSuccess, 
  viewDetailsFailure, 
  prefetchSuccess, 
  prefetchError, 
  prefetchInit,
  getConvenienceFee,
  convenienceFeeSuccess,
  convenienceFeeError,
  getCustomConfig,
  customConfigSuccess,
  customConfigError,
  getManagerList,
  managerListSuccess,
  managerListError,
  gstInSuccess,
  gstInError,
  getGstIn,
  subtripSuccess,
  subtripError,
  getSubtripDetails,
  cityAutosuggestSuccess,
  cityAutosuggestError,
  getCityAutosuggest
} from '../slice/form.slice';
//TODO: remove constant value from companyIdSelector and masterTripIdSelector
const companyIdSelector = (state: CompanyIdState) => state?.corporateDetails?.companyName?.value?.companyId || '11237';

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
  const companyId: string | undefined = yield select(companyIdSelector);
  try {
    const response: ApiResponse = yield call(Api.getConvenienceFee, {companyId: companyId ?? ''});
    const content = response?.data?.data ?? {};
    yield put(convenienceFeeSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.data?.message ?? "An error occurred";
    yield put(convenienceFeeError(errorMessage));
  }
}

function* fetchCustomConfig() {
  const companyId: string | undefined = yield select(companyIdSelector);
  try {
    const response: ApiResponse = yield call(Api.getCustomConfig, {companyId: companyId ?? ''});
    const content = (response?.data?.data ?? {}) as CustomConfig | object;
    yield put(customConfigSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.data?.message ?? "An error occurred";
    yield put(customConfigError(errorMessage));
  }
}

function* fetchManagerList() {
  const companyId: string | undefined = yield select(companyIdSelector);
  try {
    const response: ApiResponse = yield call(Api.getManagerList,  {companyId: companyId ?? ''});
    const content = (response?.data?.data ?? {}) as User[] | [];
    yield put(managerListSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.data?.message ?? "An error occurred";
    yield put(managerListError(errorMessage));
  }
}

function* fetchGSTList() {
  const companyId: string | undefined = yield select(companyIdSelector);
  try {
    const response: ApiResponse = yield call(Api.getGstInList,  {companyId: companyId ?? ''});
    const content = (response?.data?.data ?? {}) as GstinList[] | [];
    yield put(gstInSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.data?.message ?? "An error occurred";
    yield put(gstInError(errorMessage));
  }
}

function* fetchSubtripDetails() {
  const companyId: string | undefined = yield select(companyIdSelector);
  const masterTripIdSelector = (state: MasterTripIdState) => state?.tripDetails?.tripId?.value || 'FVFNFVU';
  const masterTripId: string | undefined = yield select(masterTripIdSelector);
  
  const payload = {
    companyId: companyId ?? '',
    masterTripId: masterTripId ?? '',
    isBundle: false
  }
  try {
    const response: ApiResponse = yield call(Api.getSubtripDetails,  payload);
    const content = (response?.data?.data ?? []) as Array<object> | null;
    yield put(subtripSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.data?.message ?? "An error occurred";
    yield put(subtripError(errorMessage));
  }
}

function* fetchCities(action: PayloadAction<CityAutoSuggestPayload>) {
  console.log('fetchCities', action);
  try {
    const response: ApiResponse = yield call(Api.cityAutosuggest, action.payload);
    const content = (response?.data?.data ?? []) as CitySuggestionResponse;
    yield put(cityAutosuggestSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.data?.message ?? "An error occurred";
    yield put(cityAutosuggestError(errorMessage));
  }
}

function* fetchViewDetails() {
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
  yield takeLatest(getCustomConfig.type, fetchCustomConfig);
  yield takeLatest(getManagerList.type, fetchManagerList);
  yield takeLatest(getGstIn.type, fetchGSTList);
  yield takeLatest(getSubtripDetails.type, fetchSubtripDetails);
  yield takeLatest(getCityAutosuggest.type, fetchCities);
}