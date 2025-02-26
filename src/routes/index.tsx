import Layout from '@components/Layout/Layout';
import Home from '@pages/Home';
import SignUp from '@pages/SignUp';
import NotFound from '@pages/NotFound';

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
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
