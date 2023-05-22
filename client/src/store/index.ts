import { AnyAction, configureStore, EnhancedStore } from '@reduxjs/toolkit';

import { ThunkMiddlewareFor } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

import { initAxios } from '@utils';

import { rootReducer } from './reducers';

export const store = configureStore({ reducer: rootReducer });

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

type storeType = EnhancedStore<RootState, AnyAction, [ThunkMiddlewareFor<RootState>]>;

initAxios(store);

export type { RootState, AppDispatch, storeType };
