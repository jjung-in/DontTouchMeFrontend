import Layout from '@_components/Layout/Layout';
import Home from '@_pages/Home';
import SignUp from '@_pages/SignUp';
import NotFound from '@_pages/NotFound';
import EventList from '@_pages/EventList/EventList';
import EventCreate from '@_pages/EventCreate/EventCreate';

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
        path: '/events',
        element: <EventList />,
      },
      {
        path: '/events/create',
        element: <EventCreate />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
