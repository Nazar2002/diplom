import { FC } from 'react';

import { Select } from 'antd';

import { BigLoader } from '@components/atoms';

import { ShopItem } from '@components/molecules';

import { LayoutView } from '@components/templates';

import { useShopPageModel } from '../model';

import './style.scss';

const { Option } = Select;

const ShopPage: FC = () => {
  const { load, types, onTypeChange, onBrandChange, brand, type, brands, deviceList } =
    useShopPageModel();

  if (load) {
    return <BigLoader />;
  }

  return (
    <LayoutView selectedKey="1" hasLoad={load}>
      <div className="shop">
        <h1>Список Товарів</h1>
        <div className="filters">
          <div className="select-filter">
            <Select placeholder="Виберіть бренд" value={brand as any} onChange={onBrandChange}>
              {brands?.map((el) => (
                <Option key={el.id} value={el.id}>
                  {el.name}
                </Option>
              ))}
            </Select>
          </div>

          <p>Кількість знайдених товарів: {deviceList?.length}</p>

          <div className="select-filter">
            <Select placeholder="Виберіть категорію" value={type} onChange={onTypeChange}>
              {types?.map((el) => (
                <Option key={el.id} value={el.id}>
                  {el.name}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        <div className="shop__list">
          {deviceList?.map((item) => (
            <ShopItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </LayoutView>
  );
};

export { ShopPage };
