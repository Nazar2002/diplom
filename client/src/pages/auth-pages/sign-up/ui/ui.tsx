import { FC } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Button, Form, Input } from 'antd';

import { Header } from 'antd/es/layout/layout';

import { useSignUpPageModel } from '../model';

import '../../style.scss';

const { Item } = Form;

const SignUp: FC = () => {
  const navigate = useNavigate();

  const { onHandleSubmit } = useSignUpPageModel();

  return (
    <div className="auth-wrap">
      <Header className="header">
        <Link className="logo" to={'/shop'}>
          DATATECH
        </Link>
        <Button className="red-btn">
          <Link to={'/login'}>Авторизація</Link>
        </Button>
      </Header>

      <div className="auth-content">
        <p className="auth-title">Реєстрація</p>

        <div className="auth-form sign-up">
          <div className="auth-form-content">
            <Form
              name="basic"
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
                  { required: true, message: 'Будь ласка введіть ваш email' }
                ]}>
                <Input placeholder={'Введіть ваш email'} />
              </Item>
              <Item
                label="Прізвище"
                name="firstName"
                rules={[{ required: true, message: 'Будь ласка введіть ваше прізвище' }]}>
                <Input placeholder={'Введіть ваше прізвище'} />
              </Item>
              <Item
                label="Ім'я"
                name="lastName"
                rules={[{ required: true, message: 'Будь ласка введіть ваше ім"я' }]}>
                <Input placeholder={'Введіть ваше ім"я'} />
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
                  Зареєструвати мене
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignUp };
