import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';

import { App } from './app';

import { store } from './store';

import './shared/styles/main.scss';

import 'antd/dist/antd.css';

const rootElement = document.querySelector('#root');

if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
