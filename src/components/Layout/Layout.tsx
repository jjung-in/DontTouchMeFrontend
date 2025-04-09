import { Outlet } from 'react-router-dom';
import Header from './header/Header.tsx';
import Footer from './footer/Footer.tsx';

const Layout = () => {
  return (
    <div style={{ minWidth: '1024px' }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
