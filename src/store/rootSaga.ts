import {all, call} from 'redux-saga/effects';
import createSaga from '../pages/FormView/saga/formView.saga';
import {searchSaga} from "../pages/search/saga";

export function* rootSaga(): Generator {
    return yield all([
        call(createSaga),
        call(searchSaga),
    ]);
}
