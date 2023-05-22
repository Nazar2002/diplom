import { FC } from 'react';

import { Rate } from 'antd';

import exitIcon from '../../../../shared/assets/icons/exit-5636.png';

import { BasketItemProps, useBasketModel } from '../model';

import { REACT_APP_API_URL } from '@constants';

import './style.scss';

const BasketItem: FC<BasketItemProps> = ({ info, id }) => {
  const { onDeleteClick } = useBasketModel();

  return (
    <div className="basket-item">
      <img src={REACT_APP_API_URL + info?.img} alt="img" />
      <div className="basket-item__info">
        <h4>{info?.name}</h4>
        <div>
          <h4>Price</h4>
          <p>{info?.price} грн</p>
        </div>
        <div className="product__rating">
          <h4>Rating</h4>
          <Rate value={info?.rating} />
        </div>
      </div>
      <img className="exit-icon" src={exitIcon} alt="img" onClick={() => onDeleteClick(id)} />
    </div>
  );
};

export { BasketItem };
