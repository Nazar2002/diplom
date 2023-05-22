import { FC } from 'react';

import { Link } from 'react-router-dom';

import { Breadcrumb, Button, Form, Input, Select } from 'antd';

import { BigLoader } from '@components/atoms';

import { BasketItem } from '@components/molecules';

import { RoutesEnum } from '@common-types';

import { useBasketPageModel } from '../model';

import { LayoutView } from '@components/templates';

import './style.scss';

const { Item } = Form;

const BasketPage: FC = () => {
  const { load, basketList, onSubmitClick } = useBasketPageModel();

  if (load) {
    return <BigLoader />;
  }

  return (
    <LayoutView selectKey="4" hasLoad={load}>
      <div className="basket">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={RoutesEnum.SHOP}>Магазин</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>Корзина</Breadcrumb.Item>
        </Breadcrumb>

        <div className="basket-content">
          <Form
            className="form-basket"
            name="basic"
            onFinish={onSubmitClick}
            autoComplete="off"
            layout={'vertical'}>
            <Item
              label="Адресса"
              name="address"
              rules={[{ required: true, message: 'Будь ласка введіть вашу адрессу' }]}>
              <Input placeholder={'Адресса'} />
            </Item>

            <Item
              label="Метод доставки"
              name="lastName"
              rules={[{ required: true, message: 'Будь ласка введіть ваш метод доставки' }]}>
              <Select placeholder="Метод доставки">
                <Select.Option value="Ukrposhta">Укр Пошта</Select.Option>

                <Select.Option value="Novaposhta">Нова Пошта</Select.Option>

                <Select.Option value="Selfpickup">Самовивіз</Select.Option>
              </Select>
            </Item>

            <div className="button-wrap">
              <Button className="red-btn" htmlType="submit">
                Оформити замовлення
              </Button>
            </div>
          </Form>

          <div className="basket__list">
            <h4>Вибрані товари</h4>

            {basketList.length === 0 && <h2>Ваш кошик пустий</h2>}

            {basketList?.map((el) => (
              <BasketItem key={el.id} info={el.device} id={el?.id} />
            ))}
          </div>
        </div>
      </div>
    </LayoutView>
  );
};

export { BasketPage };
