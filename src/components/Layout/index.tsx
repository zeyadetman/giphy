import React from 'react';
import { Header, Footer } from '@components/scss';
import { useWindowSize } from 'src/Hooks/useWindowSize';

interface LayoutInterface {
  children: any;
  showSearchBar?: boolean;
}
const Layout: React.FC<LayoutInterface> = ({ children, showSearchBar }) => {
  const { width } = useWindowSize();
  const contentWidth = width >= 768 ? 80 : 100;

  return (
    <div
      style={{
        width: `${contentWidth}%`,
        margin: '0 auto',
      }}
    >
      <Header showSearchBar={showSearchBar} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
