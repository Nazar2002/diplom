import { FC } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Button, Form, Input, Layout } from 'antd';

import { useSignInPageModel } from '../model';

import '../../style.scss';

const { Item } = Form;

const SignIn: FC = () => {
  const navigate = useNavigate();

  const { onHandleSubmit, initState } = useSignInPageModel();

  return (
    <div className="auth-wrap">
      <Layout.Header className="header">
        <Link className="logo" to={'/shop'}>
          DATATECH
        </Link>
        <Button className="red-btn">
          <Link to={'/sign-up'}>Реєстрація</Link>
        </Button>
      </Layout.Header>
      <div className="auth-content">
        <p className="auth-title">Авторизація</p>
        <div className="auth-form">
          <div className="auth-form-content">
            <Form
              name="basic"
              initialValues={initState}
              onFinish={(values) => onHandleSubmit(values, navigate)}
              autoComplete="off"
              layout={'vertical'}>
              <Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'Введено не валідний email'
                  },
                  {
                    required: true,
                    message: 'Будь ласка введіть ваш email'
                  }
                ]}>
                <Input placeholder={'Введіть ваш email'} />
              </Item>

              <Item
                label="Пароль"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Будь ласка введіть ваш пароль!'
                  }
                ]}>
                <Input.Password placeholder={'Введіть ваш пароль'} />
              </Item>
              <div className="button-wrap">
                <Button className="red-btn" htmlType="submit">
                  Авторизуватись
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignIn };
