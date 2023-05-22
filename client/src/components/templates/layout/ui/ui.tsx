import { FC } from 'react';

import { Layout } from 'antd';

import { Content, Footer } from 'antd/es/layout/layout';

import { HeaderComponent } from '@components/organisms';

import { BigLoader } from '@components/atoms';

import { LayoutProps } from '../model';

const LayoutView: FC<LayoutProps> = ({ selectedKey, hasLoad, children }) => {
  if (hasLoad) {
    return <BigLoader />;
  }

  return (
    <Layout style={{ background: 'rgba(223, 218, 221, 0.5)' }}>
      <HeaderComponent selectKey={selectedKey} />

      <Content
        className="site-layout"
        style={{ padding: '0 50px', minHeight: 'calc(100vh - 136px)' }}>
        <div className="site-layout-background" style={{ padding: 24 }}>
          {children}
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', background: 'white' }}>
        DATATECH ©2023 Створений в компанії
      </Footer>
    </Layout>
  );
};

export { LayoutView };
