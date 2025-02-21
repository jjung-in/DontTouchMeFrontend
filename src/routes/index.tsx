import Layout from '../components/Layout/Layout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';

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
