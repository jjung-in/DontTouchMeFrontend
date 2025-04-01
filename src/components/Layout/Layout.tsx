import { Outlet } from 'react-router-dom';
import Header from './header/Header.tsx';
import Footer from './Footer';

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
