import { useEffect } from 'react';

import { basketThunk, deviceThunk } from '@store';

import { useAppDispatch, useAppSelector } from '@hooks';

const useProductModel = (id?: string) => {
  const dispatch = useAppDispatch();

  const { device, load } = useAppSelector((state) => state.deviceStore);

  useEffect(() => {
    dispatch(deviceThunk.getOneDevice(id ?? ''));
  }, []);

  const onAddIntoBasket = (id: string) => () => {
    dispatch(basketThunk.setIntoBasket(id));
  };
  return {
    load,

    device,

    onAddIntoBasket
  };
};

export { useProductModel };
