import { FC } from 'react';

import { Link, useParams } from 'react-router-dom';

import { Breadcrumb, Button, Rate } from 'antd';

import { RoutesEnum } from '@common-types';

import { LayoutView } from '@components/templates';

import { REACT_APP_API_URL } from '@constants';

import { useProductModel } from '../model';

import './style.scss';

const ProductPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { load, device, onAddIntoBasket } = useProductModel(id);

  return (
    <LayoutView selectedKey="1" hasLoad={load}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={RoutesEnum.SHOP}>Магазин</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>{device?.name}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="product">
        <h1>{device?.name}</h1>

        <div className="product-info">
          <img src={REACT_APP_API_URL + device?.img} alt="img" />

          <div className="product-info__main">
            <h4>{device?.name}</h4>

            <hr />

            <div>
              <h4>Ціна</h4>

              <p>{device?.price} грн</p>
            </div>

            <hr />

            <div className="product__rating">
              <h4>Рейтинг</h4>

              <Rate value={device?.rating} disabled={true} />
            </div>

            <hr />

            <div>
              <h4>Опис</h4>

              <p>{device?.mainDescription}</p>
            </div>
          </div>
        </div>

        <div className="product__basket">
          <p>Сподобався товар?</p>

          <p>Ви можете добавити його в ваш кошик</p>

          <Button onClick={onAddIntoBasket(device?.id)} className="red-btn">
            Добавити в кошик
          </Button>
        </div>

        <div className="product__description">
          <h4>Основні харектеристики</h4>

          {device?.info.map((el: any) => (
            <div key={el.id}>
              <p>{el.title}</p>
              <span>{el.description}</span>
            </div>
          ))}
        </div>
      </div>
    </LayoutView>
  );
};

export { ProductPage };
