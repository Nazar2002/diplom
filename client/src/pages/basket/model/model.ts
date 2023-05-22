import { useEffect } from 'react';

import { message } from 'antd';

import { useAppDispatch, useAppSelector } from '@hooks';

import { basketThunk } from '@store';

const useBasketPageModel = () => {
  const dispatch = useAppDispatch();

  const { basketList, load, point } = useAppSelector((state) => state.basketStore);

  const onSubmitClick = () => {
    message.success("Дякую за замовлення, за 5хв наші оператори зв'яжуться з вами");
  };

  useEffect(() => {
    dispatch(basketThunk.getBasketList());
  }, [point]);

  return {
    basketList,

    point,

    load,

    onSubmitClick
  };
};

export { useBasketPageModel };
