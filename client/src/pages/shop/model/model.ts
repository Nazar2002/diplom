import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks';

import { brandTypeThunk, deviceAction, deviceThunk } from '@store';

const useShopPageModel = () => {
  const dispatch = useAppDispatch();

  const { deviceList, filterConfig, load, brand, type } = useAppSelector(
    (state) => state.deviceStore
  );

  const { brands, types } = useAppSelector((state) => state.brandTypeStore);

  useEffect(() => {
    dispatch(deviceThunk.getDeviceList());

    dispatch(brandTypeThunk.getBrands());

    dispatch(brandTypeThunk.getTypes());
  }, [filterConfig]);

  const onBrandChange = (values: string) => {
    dispatch(deviceAction.setFilterConfig({ brandId: values }));

    dispatch(deviceAction.setBrand(values));
  };

  const onTypeChange = (values: string) => {
    dispatch(deviceAction.setFilterConfig({ typeId: values }));

    dispatch(deviceAction.setType(values));
  };

  return {
    filterConfig,

    deviceList,

    load,

    brand,

    type,

    brands,

    types,

    onBrandChange,

    onTypeChange
  };
};

export { useShopPageModel };
