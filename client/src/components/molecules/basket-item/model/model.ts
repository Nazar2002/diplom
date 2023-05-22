import { basketThunk } from '@store';

import { useAppDispatch } from '@hooks';

import { Product } from '@common-types';

type BasketItemProps = {
  id: number;

  info: Product;
};

const useBasketModel = () => {
  const dispatch = useAppDispatch();

  const onDeleteClick = (id: number) => dispatch(basketThunk.deleteFromBasket(id));

  return {
    onDeleteClick
  };
};

export { useBasketModel };

export type { BasketItemProps };
