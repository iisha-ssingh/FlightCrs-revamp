import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import {rootSaga} from './rootSaga';
import {rootReducer} from './rootReducer';
import {useAppDispatch, useAppSelector} from './storeHooks';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: true,
        }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export {store, useAppDispatch, useAppSelector};
