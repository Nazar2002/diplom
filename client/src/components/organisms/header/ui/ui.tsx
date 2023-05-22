import { FC } from 'react';

import { Link } from 'react-router-dom';

import { Button, Menu } from 'antd';

import Avatar from 'antd/es/avatar/avatar';

import { Header } from 'antd/es/layout/layout';

import { RoutesEnum } from '@common-types';

import { useHeaderModel } from '../model';

import './style.scss';

export const HeaderComponent: FC<{ selectKey: string }> = ({ selectKey }) => {
  const { width, user, visible, onLogoutClick, onOpenClick } = useHeaderModel();

  return (
    <Header className="header">
      <Link className="logo" to={RoutesEnum.SHOP}>
        DATATECH
      </Link>

      {width > 850 && (
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={[selectKey]}>
          <Menu.Item key="1">
            <Link to={RoutesEnum.SHOP}>Магазин</Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link to={RoutesEnum.MAIN}>Служба підтримки</Link>
          </Menu.Item>

          {user?.role === 'ADMIN' && (
            <Menu.Item key="3">
              <Link to={RoutesEnum.ADMIN}>Панель адміністратора</Link>
            </Menu.Item>
          )}

          {user && (
            <>
              <Menu.Item key="4">
                <Link to={RoutesEnum.BASKET}>Кошик</Link>
              </Menu.Item>

              <Menu.Item key="5">
                <Link to={RoutesEnum.CHAT}>Онлайн чат</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      )}

      {user ? (
        <div>
          <Button className="red-btn" onClick={onOpenClick}>
            Аккаунт
          </Button>

          {visible && (
            <div className="user-account">
              <div>
                <Avatar size={40} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                  {user?.firstName}
                </Avatar>
                <p>
                  {user?.firstName} {user?.lastName}
                </p>
                {width <= 768 && (
                  <>
                    <Link to={RoutesEnum.SHOP}>Магазин</Link>

                    <Link to={RoutesEnum.MAIN}>Служба підтримки</Link>

                    {user?.role === 'ADMIN' && (
                      <Link to={RoutesEnum.ADMIN}>Панель адміністратора</Link>
                    )}

                    <Link to={RoutesEnum.BASKET}>Кошик</Link>

                    <Link to={RoutesEnum.CHAT}>Онлайн чат</Link>
                  </>
                )}
                <Button className="red-btn" onClick={onLogoutClick}>
                  Вийти
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Button className="red-btn">
          <Link to={RoutesEnum.LOGIN}>Реєстрація</Link>
        </Button>
      )}
    </Header>
  );
};
