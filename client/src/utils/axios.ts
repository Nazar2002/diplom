import axios, { AxiosInstance } from 'axios';

import { authThunk } from '../store/slices';

import { API_PREFIX, CONTENT_TYPE_DEFAULT } from '../constants';

import { storeType } from '../store';

export let axiosInstance: AxiosInstance;

export const initAxios = (store: storeType) => {
  axiosInstance = axios.create({
    baseURL: API_PREFIX,
    headers: { 'Content-Type': CONTENT_TYPE_DEFAULT }
  });
  axiosInstance.interceptors.request.use(
    (config: any) => {
      const token = localStorage.getItem('access_token');

      config.headers = token
        ? {
            ...config.headers,
            Authorization: `Bearer ${token}`
          }
        : config.headers;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,

    (error) => {
      if (error.response.status === 401) {
        store.dispatch(authThunk.signOut());
      }

      return Promise.reject(error);
    }
  );
};
