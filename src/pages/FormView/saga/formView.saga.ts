import { Api } from './Api';
import { call, debounce, put, select, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  ApiResponse,
  BookingIdState,
  CityAutoSuggestPayload,
  CitySuggestionResponse,
  CompanyIdState,
  CorporateUser,
  CorporateUserAutosuggest,
  CustomConfig,
  GenericResponse,
  DownloadDocumentRequest,
  DownloadVoucherRequest,
  ErrorResponse,
  GstinList,
  MasterTripIdState,
  StateDetail,
  User,
  ViewDetailsRequest,
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
  getCityAutosuggest,
  getCorporateUsers,
  corporateUsersSuccess,
  corporateUsersError,
  downloadDocumentSuccess,
  downloadDocumentError,
  downloadDocumentAction,
  downloadVoucherSuccess,
  downloadVoucherError,
  downloadVoucherAction,
  editGstAction,
  postSuccess,
  postError,
  editGstAuthorisationAction,
  cancelModificationRequestAction,
} from '../slice/form.slice';
//TODO: remove constant value from companyIdSelector and masterTripIdSelector
const companyIdSelector = (state: CompanyIdState) =>
  state?.formView?.corporateDetails?.companyName?.value?.companyId || '11237';
const masterTripIdSelector = (state: MasterTripIdState) =>
  state?.formView?.tripDetails?.tripId?.value || 'TPFHURMHU';
const bookingIdSelector = (state: BookingIdState) =>
  state?.formView?.bookingDetails?.bookingId?.value || 'FXHPJDX';

function* fetchPrefetchSaga() {
  try {
    const response: ApiResponse = yield call(Api.getPrefetch);
    const content = response?.data?.data ?? {};
    yield put(prefetchSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.message ?? 'An error occurred';
    yield put(prefetchError(errorMessage));
  }
}

function* fetchConvenienceFee() {
  const companyId: string | undefined = yield select(companyIdSelector);
  try {
    const response: ApiResponse = yield call(Api.getConvenienceFee, {
      companyId: companyId ?? '',
    });
    const content = response?.data?.data ?? {};
    yield put(convenienceFeeSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.message ?? 'An error occurred';
    yield put(convenienceFeeError(errorMessage));
  }
}

function* fetchCustomConfig() {
  const companyId: string | undefined = yield select(companyIdSelector);
  try {
    const response: ApiResponse = yield call(Api.getCustomConfig, {
      companyId: companyId ?? '',
    });
    const content = (response?.data?.data ?? {}) as CustomConfig | object;
    yield put(customConfigSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.message ?? 'An error occurred';
    yield put(customConfigError(errorMessage));
  }
}

function* fetchManagerList() {
  const companyId: string | undefined = yield select(companyIdSelector);
  try {
    const response: ApiResponse = yield call(Api.getManagerList, {
      companyId: companyId ?? '',
    });
    const content = (response?.data?.data ?? {}) as User[] | [];
    yield put(managerListSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.message ?? 'An error occurred';
    yield put(managerListError(errorMessage));
  }
}

function* fetchGSTList() {
  const companyId: string | undefined = yield select(companyIdSelector);
  try {
    const response: ApiResponse = yield call(Api.getGstInList, {
      companyId: companyId ?? '',
    });
    const content = (response?.data?.data ?? {}) as GstinList[] | [];
    yield put(gstInSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.message ?? 'An error occurred';
    yield put(gstInError(errorMessage));
  }
}

function* fetchSubtripDetails() {
  const companyId: string | undefined = yield select(companyIdSelector);
  const masterTripId: string | undefined = yield select(masterTripIdSelector);

  const payload = {
    companyId: companyId ?? '',
    masterTripId: masterTripId ?? '',
    isBundle: false,
  };
  try {
    const response: ApiResponse = yield call(Api.getSubtripDetails, payload);
    const content = (response?.data?.data ?? []) as Array<object> | null;
    yield put(subtripSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.message ?? 'An error occurred';
    yield put(subtripError(errorMessage));
  }
}

function* fetchCities(action: PayloadAction<CityAutoSuggestPayload>) {
  try {
    const response: ApiResponse = yield call(
      Api.cityAutosuggest,
      action.payload,
    );
    const content = (response?.data?.data ?? []) as CitySuggestionResponse;
    yield put(cityAutosuggestSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.message ?? 'An error occurred';
    yield put(cityAutosuggestError(errorMessage));
  }
}

function* fetchCorporateUsers(action: PayloadAction<CorporateUserAutosuggest>) {
  try {
    const response: ApiResponse = yield call(
      Api.corporateUserSearch,
      action.payload,
    );
    const content = (response?.data ?? []) as CorporateUser[] | [];
    yield put(corporateUsersSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.message ?? 'An error occurred';
    yield put(corporateUsersError(errorMessage));
  }
}

function* downloadDocument(action: PayloadAction<DownloadDocumentRequest>) {
  const masterTripId: string | undefined = yield select(masterTripIdSelector);

  const payload = {
    masterBookingId: masterTripId ?? '',
    docType: action.payload.docType,
  };
  try {
    const response: ApiResponse = yield call(Api.downloadDocument, payload);
    const content = (response?.data ?? []) as GenericResponse;
    yield put(downloadDocumentSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.message ?? 'An error occurred';
    yield put(downloadDocumentError(errorMessage));
  }
}

function* downloadVoucher(action: PayloadAction<DownloadVoucherRequest>) {
  const masterTripId: string | undefined = yield select(masterTripIdSelector);
  const companyId: string | undefined = yield select(companyIdSelector);

  const payload = {
    masterBookingId: masterTripId ?? '',
    companyId: companyId ?? '',
  };
  try {
    const response: ApiResponse = yield call(Api.downloadVoucher, payload);
    const content = (response?.data ?? []) as GenericResponse;
    yield put(downloadVoucherSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.message ?? 'An error occurred';
    yield put(downloadVoucherError(errorMessage));
  }
}

function* editGst() {
  const corporateDetailsSelector = (state: CompanyIdState) =>
    state?.formView?.corporateDetails;
  const corporateDetails: StateDetail = yield select(corporateDetailsSelector);
  const {
    gstEntityName,
    gSTNumber,
    gSTCompanyName,
    gSTCompanyAddress,
    gSTCompanyPinCode,
  } = corporateDetails || {};
  const bookingId: string = yield select(bookingIdSelector);

  const payload = {
    bookingId: bookingId,
    gstEntityName: gstEntityName.value || 'Ajay entity 2',
    gSTNumber: gSTNumber.value || '06XYZDD3009C2ZE',
    gSTCompanyName: gSTCompanyName.value || null,
    gSTCompanyAddress: gSTCompanyAddress.value || 'Test new GST 1',
    gSTCompanyPinCode: gSTCompanyPinCode.value || '122001',
  };

  try {
    const response: ApiResponse = yield call(Api.editGst, payload);
    const content = (response ?? []) as GenericResponse;
    yield put(postSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.message ?? 'An error occurred';
    yield put(postError(errorMessage));
  }
}

function* editGstAuthorisation() {
  try {
    const response: ApiResponse = yield call(Api.editGstAuthorisation);
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.message ?? 'An error occurred';
    yield put(postError(errorMessage));
  }
}

function* cancelModificationRequest() {
  const bookingId: string = yield select(bookingIdSelector);
  try {
    const response: ApiResponse = yield call(Api.cancelModificationRequest, {
      bookingId: bookingId ?? '',
    });
    const content = (response?.data ?? []) as GenericResponse;
    yield put(postSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.message ?? 'An error occurred';
    yield put(postError(errorMessage));
  }
}

function* fetchViewDetails() {
  const tempRequest = {
    companyId: '',
    bookingId: 'FVFNFVU',
  };

  try {
    const response: ApiResponse = yield call(Api.getViewDetails, tempRequest);
    const content = response?.data?.data ?? {};
    yield put(viewDetailsSuccess(content));
  } catch (error) {
    const errorResponse = (error as ErrorResponse).response ?? {};
    const errorMessage = errorResponse?.message ?? 'An error occurred';
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
  yield debounce(300, getCityAutosuggest.type, fetchCities);
  yield debounce(300, getCorporateUsers.type, fetchCorporateUsers);
  yield takeLatest(downloadDocumentAction.type, downloadDocument);
  yield takeLatest(downloadVoucherAction.type, downloadVoucher);
  yield takeLatest(editGstAction.type, editGst);
  yield takeLatest(editGstAuthorisationAction.type, editGstAuthorisation);
  yield takeLatest(
    cancelModificationRequestAction.type,
    cancelModificationRequest,
  );
}
