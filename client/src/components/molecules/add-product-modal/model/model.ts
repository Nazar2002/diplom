import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks';

import { deviceThunk } from '@store';

import { Product } from '@common-types';

type AddProductModalProps = {
  open: boolean;

  onSubmitClick?: () => void;

  onCloseClick: () => void;
};

const useAddProductModel = () => {
  const useDispatch = useAppDispatch();

  const [allInfo, setAllInfo] = useState<Product>(null);

  const [info, setInfo] = useState<{ title: string; description: string; number: number }[]>([
    { title: '', description: '', number: Date.now() }
  ]);

  const [file, setFile] = useState(null);

  const disabled =
    !allInfo?.name ||
    !allInfo?.mainDescription ||
    !allInfo?.info?.length ||
    !allInfo?.price ||
    !allInfo?.brand ||
    !allInfo?.type ||
    !allInfo?.rating;

  const brands = useAppSelector((state) => state.brandTypeStore.brands);

  const types = useAppSelector((state) => state.brandTypeStore.types);

  const setAllInfoChange = (value: Product) =>
    setAllInfo({ ...value, img: file?.originFileObj, info });

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = (number: number) => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key: string, value: string, number: number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)));
  };

  const [open, setOpen] = useState(false);

  const onOpenClick = () => setOpen(true);

  const onCloseClick = () => setOpen(false);

  const onSubmitClick = (values) => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('mainDescription', values.mainDescription);
    formData.append('price', String(values.price));
    formData.append('rating', values.rating);
    formData.append('img', file?.originFileObj);
    formData.append('brandId', values.brand);
    formData.append('typeId', values.type);
    formData.append(
      'info',
      JSON.stringify(info.map((item) => ({ title: item.title, description: item.description })))
    );

    useDispatch(deviceThunk.setDevice(formData));
  };

  return {
    open,

    allInfo,

    brands,

    types,

    info,

    disabled,

    file,

    setFile,

    setAllInfoChange,

    addInfo,

    removeInfo,

    changeInfo,

    onSubmitClick,

    onOpenClick,

    onCloseClick
  };
};

export { useAddProductModel };

export type { AddProductModalProps };
