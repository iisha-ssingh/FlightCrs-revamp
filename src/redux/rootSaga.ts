import { call, all } from 'redux-saga/effects';
import createSaga from '../pages/createFlightBookings/saga/createFlightBookings.saga';

function* rootSaga() {
  return yield all([call(createSaga)]);
}

export { rootSaga };