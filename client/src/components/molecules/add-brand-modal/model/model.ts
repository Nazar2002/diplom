import { useState } from 'react';

import { useAppDispatch } from '@hooks';

import { brandTypeThunk } from '@store';

type AddBrandModalProps = {
  open: boolean;

  onSubmitClick: () => void;

  onCloseClick: () => void;
};

const useAddBrandModel = () => {
  const useDispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const onOpenClick = () => setOpen(true);

  const onCloseClick = () => setOpen(false);

  const onSubmitClick = (values: { brand: string }) => {
    useDispatch(brandTypeThunk.setBrand(values.brand));
  };

  return {
    open,

    onSubmitClick,

    onOpenClick,

    onCloseClick
  };
};

export { useAddBrandModel };

export type { AddBrandModalProps };
