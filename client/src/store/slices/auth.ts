import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { message } from 'antd';

import { AuthEnum, RoutesEnum, User } from '../../common-types';

import { AppDispatch } from '../index';

import { axiosInstance } from '../../utils';

type AuthState = {
  load: boolean;

  user: User | null;
};

const initialState: AuthState = {
  load: false,

  user: null
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    setLoad: (state: AuthState, { payload }: PayloadAction<boolean>) => {
      state.load = payload;
    },

    setUser: (state: AuthState, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },

    resetUser: (state: AuthState) => {
      state.user = null;
    }
  }
});

const signIn = (user: User, navigate: any) => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axiosInstance.post(AuthEnum.SIGN_IN, {
      ...user
    });

    localStorage.setItem('access_token', data?.jsonWebToken);

    dispatch(authAction.setUser(data.user));

    navigate(RoutesEnum.SHOP);
  } catch (e: any) {
    message.error(e.response.data.message);

    console.log(e);
  }
};

const signUp = (user: User, navigate: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(authAction.setLoad(true));

    const { data } = await axiosInstance.post(AuthEnum.SIGN_UP, {
      ...user
    });

    dispatch(authAction.setUser(data.user));

    navigate(RoutesEnum.LOGIN);
  } catch (e: any) {
    message.error(e.response.data.message);

    console.log(e);
  }
};

const getUser = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axiosInstance.get(AuthEnum.AUTHENTICATE);

    dispatch(authAction.setUser(data.user));
  } catch (error) {
    console.error(error);

    message.error('Не зареєстрований');
  }
};

const signOut = () => async (dispatch: AppDispatch) => {
  dispatch(authAction.resetUser());

  localStorage.removeItem('access_token');
};

const authAction = authSlice.actions;

const authReducer = authSlice.reducer;

const authThunk = {
  signIn,

  signUp,

  getUser,

  signOut
} as const;

export { authSlice, authAction, authReducer, authThunk };

export type { AuthState };
