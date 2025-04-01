import { Outlet } from 'react-router-dom';
import Header from './header/Header.tsx';
import Footer from './footer/Footer.tsx';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
