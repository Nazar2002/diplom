import { FC } from 'react';

import { Link } from 'react-router-dom';

import { Breadcrumb, Button } from 'antd';

import { LayoutView } from '@components/templates';

import {
  AddBrandModal,
  AddProductModal,
  AddTypeModal,
  useAddBrandModel,
  useAddProductModel,
  useAddTypeModel
} from '@components/molecules';

import { RoutesEnum } from '@common-types';

import { useAdminPageModel } from '../model';

import './style.scss';

const AdminPage: FC = () => {
  const productModel = useAddProductModel();

  const brandModel = useAddBrandModel();

  const typeModel = useAddTypeModel();

  useAdminPageModel();

  return (
    <LayoutView selectedKey="3">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={RoutesEnum.SHOP}>Магазин</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>Адмін панель</Breadcrumb.Item>
      </Breadcrumb>

      <div className="admin-page">
        <h1>Панель адмініністратора</h1>

        <div className="admin-page-content">
          <div className="content-section">
            <h3>Додавання нового продукту до магазину</h3>

            <Button type="primary" className="red-btn" onClick={productModel.onOpenClick}>
              Добавити продукт
            </Button>
          </div>

          <div className="content-section">
            <h3>Додавання нового бренду до магазину</h3>

            <Button type="primary" className="red-btn" onClick={brandModel.onOpenClick}>
              Добавити бренд
            </Button>
          </div>

          <div className="content-section">
            <h3>Додавання нового типу продукту до магазину</h3>

            <Button type="primary" className="red-btn" onClick={typeModel.onOpenClick}>
              Добавити тип
            </Button>
          </div>
        </div>

        <AddProductModal
          open={productModel.open}
          onSubmitClick={productModel.onSubmitClick}
          onCloseClick={productModel.onCloseClick}
        />

        <AddBrandModal
          open={brandModel.open}
          onSubmitClick={brandModel.onSubmitClick}
          onCloseClick={brandModel.onCloseClick}
        />

        <AddTypeModal
          open={typeModel.open}
          onSubmitClick={typeModel.onSubmitClick}
          onCloseClick={typeModel.onCloseClick}
        />
      </div>
    </LayoutView>
  );
};

export { AdminPage };
