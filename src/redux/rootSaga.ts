import { call, all } from 'redux-saga/effects';
import createSaga from '../pages/FormView/saga/formView.saga';

// Define the return type for the generator function
function* rootSaga(): Generator {
  return yield all([call(createSaga)]);
}

export { rootSaga };