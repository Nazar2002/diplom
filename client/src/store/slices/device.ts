import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ThunkAction } from 'redux-thunk';

import { message } from 'antd';

import { Brand, DeviceEnum, Product, Type } from '../../common-types';

import { AppDispatch, RootState } from '../index';

import { axiosInstance } from '../../utils';

import { CONTENT_TYPE_FILE } from '../../constants';

type DeviceTypeState = {
  load: boolean;

  deviceList: Product[] | null;

  device: Product | null;

  brand: Brand | null;

  type: Type | null;

  filterConfig: {
    brandId?: number | null;

    typeId?: number | null;
  };
};

const initialState: DeviceTypeState = {
  load: false,

  deviceList: null,

  device: null,

  brand: null,

  type: null,

  filterConfig: {
    brandId: null,

    typeId: null
  }
};

const deviceSlice = createSlice({
  name: 'device',

  initialState,

  reducers: {
    setLoad: (state, { payload }: PayloadAction<boolean>) => {
      state.load = payload;
    },

    setDeviceList: (state, { payload }: PayloadAction<Product[]>) => {
      state.deviceList = payload;
    },

    setDevice: (state, { payload }: PayloadAction<Product>) => {
      state.device = payload;
    },

    setBrand: (state, { payload }: PayloadAction<Brand>) => {
      state.brand = payload;
    },

    setType: (state, { payload }: PayloadAction<Type>) => {
      state.type = payload;
    },

    setFilterConfig: (
      state,
      {
        payload
      }: PayloadAction<{
        brandId?: number | null;

        typeId?: number | null;
      }>
    ) => {
      state.filterConfig = { ...state.filterConfig, ...payload };
    }
  }
});

const getDeviceList =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch, getState) => {
    try {
      dispatch(deviceAction.setLoad(true));
      const { filterConfig } = getState().deviceStore;

      const filterParams = Object.keys(filterConfig).reduce((acc, key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (filterConfig[key]) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return { ...acc, [key]: filterConfig[key] };
        }
        return acc;
      }, {});

      const { data } = await axiosInstance.get(DeviceEnum.DEVICE_LIST, {
        params: { ...filterParams }
      });

      setTimeout(() => dispatch(deviceAction.setLoad(false)), 200);

      dispatch(deviceAction.setDeviceList(data));
    } catch (e: any) {
      message.error(e.response.data.message);

      console.log(e);
    }
  };

const getOneDevice = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(deviceAction.setLoad(true));

    const { data } = await axiosInstance.get(`${DeviceEnum.DEVICE}/${id}`);

    dispatch(deviceAction.setDevice(data));

    setTimeout(() => dispatch(deviceAction.setLoad(false)), 200);
  } catch (e: any) {
    message.error(e.response.data.message);

    console.log(e);
  }
};

const setDevice = (device: Product) => async () => {
  try {
    await axiosInstance.post(`${DeviceEnum.DEVICE}`, device, {
      headers: { 'Content-Type': CONTENT_TYPE_FILE }
    });

    message.success('Продукт успішно доданий');
  } catch (e: any) {
    message.error(e.response.data.message);

    console.log(e);
  }
};

const deviceThunk = {
  getOneDevice,

  setDevice,

  getDeviceList
} as const;

const deviceAction = deviceSlice.actions;

const deviceReducer = deviceSlice.reducer;

export { deviceSlice, deviceAction, deviceReducer, deviceThunk };

export type { DeviceTypeState };
