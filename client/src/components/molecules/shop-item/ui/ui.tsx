import { FC } from 'react';

import { Link } from 'react-router-dom';

import { Button } from 'antd';

import { RoutesEnum } from '@common-types';

import { REACT_APP_API_URL } from '@constants';

import { ShopItemProps } from '../model';

import './style.scss';

const ShopItem: FC<ShopItemProps> = ({ item }) => {
  return (
    <div className="item-card">
      <div className="item-card__content">
        <img src={REACT_APP_API_URL + item.img} alt="img" />

        <p>{item.name}</p>

        <span>{item.price} грн</span>
      </div>

      <Button className="red-btn">
        <Link to={`${RoutesEnum.PRODUCT}/${item.id}`}>Розглянути</Link>
      </Button>
    </div>
  );
};

export { ShopItem };
