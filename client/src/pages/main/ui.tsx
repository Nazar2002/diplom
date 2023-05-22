import { FC } from 'react';

import { Link } from 'react-router-dom';

import { Breadcrumb, Button, Checkbox, Form, Input, message } from 'antd';

import TextArea from 'antd/es/input/TextArea';

import { RoutesEnum } from '@common-types';

import { LayoutView } from '@components/templates';

import './style.scss';

const MainPage: FC = () => {
  const [form] = Form.useForm();

  const plainOptions = ['Кошик', 'Список товарів', 'Фільтрація', 'Сторінка  товару', 'Інше'];

  const handleSubmit = () => {
    message.success('Дякуємо вам за ваш відгук');

    form.resetFields();
  };

  return (
    <LayoutView selectedKey="2">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={RoutesEnum.SHOP}>Магазин</Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>Служба підтримки</Breadcrumb.Item>
      </Breadcrumb>

      <div className="main-page">
        <h1>Служба підтримки</h1>

        <div className="main-page-content">
          <h3>Виникли певні питання, або хочете допомогти нашому проекту</h3>

          <Form
            name="basic"
            autoComplete="off"
            onFinish={handleSubmit}
            layout={'vertical'}
            className="contact-form">
            <Form.Item
              name="name"
              label="Ім'я"
              rules={[{ required: true, message: 'Це обов"язкове поле' }]}>
              <Input placeholder="Введіть ваше ім'я" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: 'email',
                  message: 'Введений email не є валідним'
                },
                {
                  required: true,
                  message: 'Це обов"язкове поле'
                }
              ]}>
              <Input placeholder="Введіть ваш email" />
            </Form.Item>

            <Form.Item
              name="type"
              label="Тип проблеми"
              rules={[
                {
                  required: true,
                  message: 'Це обов"язкове поле'
                }
              ]}>
              <Checkbox.Group options={plainOptions} />
            </Form.Item>

            <Form.Item
              name="Опис"
              label="Message*"
              rules={[
                {
                  required: true,
                  message: 'Це обов"язкове поле'
                }
              ]}>
              <TextArea placeholder="Опис" />
            </Form.Item>

            <Button type="primary" htmlType="submit" className="red-btn">
              Відправити смс
            </Button>
          </Form>
        </div>
      </div>
    </LayoutView>
  );
};

export { MainPage };
