import Toast from '@_components/Common/Toast/Toast.tsx';
import { useToastStore } from '@_store/toastStore.ts';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer.tsx';
import Header from './header/Header.tsx';

const Layout = () => {
  const { isVisible } = useToastStore();

  return (
    <div style={{ minWidth: '1280px' }}>
      <Header />
      <Outlet />
      <Footer />
      {isVisible && <Toast />}
    </div>
  );
};

export default Layout;
