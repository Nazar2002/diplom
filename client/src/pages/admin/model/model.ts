import { useAppDispatch } from '@hooks';

import { useEffect } from 'react';

import { brandTypeThunk } from '@store';

const useAdminPageModel = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(brandTypeThunk.getBrands());

    dispatch(brandTypeThunk.getTypes());
  }, []);

  return {};
};

export { useAdminPageModel };
