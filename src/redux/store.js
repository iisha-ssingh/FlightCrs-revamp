import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: true,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export { store };
