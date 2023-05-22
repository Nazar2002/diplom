import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { message } from 'antd';

import { Brand, BrandTypeEnum, Type } from '../../common-types';

import { axiosInstance } from '../../utils';

import { AppDispatch } from '../index';

type BrandTypeState = {
  load: boolean;

  brands: Brand[];

  types: Type[];
};

const initialState: BrandTypeState = {
  load: false,

  brands: [],

  types: []
};

const brandTypeSlice = createSlice({
  name: 'brandType',

  initialState,

  reducers: {
    setLoad: (state: BrandTypeState, { payload }: PayloadAction<boolean>) => {
      state.load = payload;
    },

    setBrands: (state: BrandTypeState, { payload }: PayloadAction<Brand[]>) => {
      state.brands = payload;
    },

    setTypes: (state: BrandTypeState, { payload }: PayloadAction<Type[]>) => {
      state.types = payload;
    }
  }
});

const getBrands = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axiosInstance.get(BrandTypeEnum.BRAND);

    dispatch(brandTypeAction.setBrands(data));
  } catch (e: any) {
    message.error(e.response.data.message);

    console.log(e);
  }
};

const setBrand = (name: string) => async () => {
  try {
    await axiosInstance.post(BrandTypeEnum.BRAND, { name });

    message.success('Бренд був успішно доданий');
  } catch (e: any) {
    message.error(e.response.data.message);

    console.log(e);
  }
};

const getTypes = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axiosInstance.get(BrandTypeEnum.TYPE);

    dispatch(brandTypeAction.setTypes(data));
  } catch (e: any) {
    message.error(e.response.data.message);

    console.log(e);
  }
};

const setType = (name: string) => async () => {
  try {
    await axiosInstance.post(BrandTypeEnum.TYPE, { name });

    message.success('Тип був успішно доданий');
  } catch (e: any) {
    message.error(e.response.data.message);

    console.log(e);
  }
};

const brandTypeThunk = {
  getTypes,

  getBrands,

  setBrand,

  setType
} as const;

const brandTypeAction = brandTypeSlice.actions;

const brandTypeReducer = brandTypeSlice.reducer;

export { brandTypeSlice, brandTypeAction, brandTypeReducer, brandTypeThunk };

export type { BrandTypeState };
