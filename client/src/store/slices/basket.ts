import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ThunkAction } from 'redux-thunk';

import { message } from 'antd';

import { BasketEnum, Product } from '../../common-types';

import { AppDispatch, RootState } from '../index';

import { axiosInstance } from '../../utils';

type BasketState = {
  load: boolean;

  point: boolean;

  basketList: Product[];
};

const initialState: BasketState = {
  load: false,

  point: false,

  basketList: []
};

const basketSlice = createSlice({
  name: 'basket',

  initialState,

  reducers: {
    setLoad: (state: BasketState, { payload }: PayloadAction<boolean>) => {
      state.load = payload;
    },

    setPoint: (state: BasketState, { payload }: PayloadAction<boolean>) => {
      state.point = payload;
    },

    setBasketList: (state: BasketState, { payload }: PayloadAction<Product[]>) => {
      state.basketList = payload;
    }
  }
});

const getBasketList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(basketAction.setLoad(true));

    const { data } = await axiosInstance.get(BasketEnum.BASKET);

    setTimeout(() => {
      dispatch(basketAction.setLoad(false));
    }, 200);

    dispatch(basketAction.setBasketList(data));
  } catch (e: any) {
    message.error(e.response.data.message);
    console.log(e);
  }
};

const setIntoBasket = (deviceId: string) => async () => {
  try {
    await axiosInstance.post(BasketEnum.BASKET, { deviceId });

    message.success('Даний продукт додано до вашої корзини');
  } catch (e: any) {
    message.error(e.response.data.message);
    console.log(e);
  }
};

const deleteFromBasket =
  (id: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch, getState) => {
    try {
      const { point } = getState().basketStore;

      dispatch(basketAction.setLoad(true));

      await axiosInstance.delete(BasketEnum.BASKET, { params: { id: id } });

      dispatch(basketAction.setPoint(!point));

      dispatch(basketAction.setLoad(false));

      message.success('Даний продукт був видалений з вашої корзини');
    } catch (e: any) {
      message.error(e.response.data.message);

      console.log(e);
    }
  };

const basketThunk = {
  getBasketList,

  setIntoBasket,

  deleteFromBasket
} as const;

const basketAction = basketSlice.actions;

const basketReducer = basketSlice.reducer;

export { basketSlice, basketAction, basketReducer, basketThunk };

export type { BasketState };
