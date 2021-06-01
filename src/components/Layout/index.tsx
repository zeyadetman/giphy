import React from 'react';
import { Header, Footer } from '@components/scss';

interface LayoutInterface {
  children?: React.ReactElement;
  contentWidth: number;
}
const Layout: React.FC<any> = (props: LayoutInterface) => {
  return (
    <div
      style={{
        width: `${props.contentWidth}%`,
        margin: '0 auto',
      }}
    >
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
