import { useState } from 'react';

import { brandTypeThunk } from '@store';

import { useAppDispatch } from '@hooks';

type AddTypeModalProps = {
  open: boolean;

  onSubmitClick: () => void;

  onCloseClick: () => void;
};

const useAddTypeModel = () => {
  const useDispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const onOpenClick = () => setOpen(true);

  const onCloseClick = () => setOpen(false);

  const onSubmitClick = (values: { type: string }) => {
    useDispatch(brandTypeThunk.setType(values.type));
  };

  return {
    open,

    onSubmitClick,

    onOpenClick,

    onCloseClick
  };
};

export { useAddTypeModel };

export type { AddTypeModalProps };
