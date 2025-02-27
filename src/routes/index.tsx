import Layout from '@_components/Layout/Layout';
import Home from '@_pages/Home';
import SignUp from '@_pages/SignUp';
import LogIn from '@_pages/LogIn';
import NotFound from '@_pages/NotFound';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path : '/login',
        element : <LogIn />,
      }
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
