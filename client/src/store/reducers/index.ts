import { combineReducers } from '@reduxjs/toolkit';

import { authReducer, basketReducer, brandTypeReducer, deviceReducer } from '../slices';

export const rootReducer = combineReducers({
  authStore: authReducer,

  deviceStore: deviceReducer,

  basketStore: basketReducer,

  brandTypeStore: brandTypeReducer
});
