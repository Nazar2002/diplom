import { FC, useEffect } from 'react';

import { io } from 'socket.io-client';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  AdminPage,
  BasketPage,
  Chat,
  MainPage,
  ProductPage,
  ShopPage,
  SignIn,
  SignUp
} from '@pages';
import { authThunk } from '@store';

import { useAppDispatch } from '@hooks';

import { RoutesEnum } from '@common-types';

const App: FC = () => {
  const dispatch = useAppDispatch();

  const socket = io('http://localhost:5002');

  useEffect(() => {
    dispatch(authThunk.getUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesEnum.LOGIN} element={<SignIn />} />

        <Route path={RoutesEnum.SIGN_UP} element={<SignUp />} />

        <Route path={RoutesEnum.MAIN} element={<MainPage />} />

        <Route path={`${RoutesEnum.PRODUCT}/:id`} element={<ProductPage />} />

        <Route path={RoutesEnum.BASKET} element={<BasketPage />} />

        <Route path={RoutesEnum.SHOP} element={<ShopPage />} />

        <Route path={RoutesEnum.ADMIN} element={<AdminPage />} />

        <Route path={RoutesEnum.DEFAULT} element={<MainPage />} />

        <Route path={RoutesEnum.CHAT} element={<Chat socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
};

export { App };
