import Layout from '@_components/Layout/Layout';
import Home from '@_pages/Home';
import SignUp from '@_pages/Auth/SignUp/SignUp';
import LogIn from '@_pages/Auth/LogIn/LogIn';
import NotFound from '@_pages/NotFound/NotFound';
import EventList from '@_pages/Event/EventList/EventList';
import EventCreate from '@_pages/Event/EventCreate/EventCreate';
import EventDetail from '@_pages/Event/EventDetail/EventDetail';
import EventUpdate from '@_pages/Event/EventUpdate/EventUpdate';
import RecordList from '@_pages/Records/RecordList/RecordList';
import RecordCreate from '@_pages/Records/RecordCreate/RecordCreate';
import RecordUpdate from '@_pages/Records/RecordUpdate/RecordUpdate';
import PrivateRoute from './PrivateRoute';
import AuthSuccess from '@_pages/Auth/Success/AuthSuccess';
import CardSend from '@_pages/Card/CardSend/CardSend';
import CardComplete from '@_pages/Card/CardComplete/CardComplete';

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
        path: '/login',
        element: <LogIn />,
      },
      {
        path: '/auth/success',
        element: <AuthSuccess />,
      },
      {
        path: '/events',
        element: (
          <PrivateRoute>
            <EventList />
          </PrivateRoute>
        ),
      },
      {
        path: '/events/:eventId',
        element: (
          <PrivateRoute>
            <EventDetail />
          </PrivateRoute>
        ),
      },
      {
        path: '/events/create',
        element: (
          <PrivateRoute>
            <EventCreate />
          </PrivateRoute>
        ),
      },
      {
        path: '/events/:eventId/update',
        element: (
          <PrivateRoute>
            <EventUpdate />
          </PrivateRoute>
        ),
      },
      {
        path: '/events/:eventId/records',
        element: (
          <PrivateRoute>
            <RecordList />
          </PrivateRoute>
        ),
      },
      {
        path: '/events/:eventId/records/create',
        element: (
          <PrivateRoute>
            <RecordCreate />
          </PrivateRoute>
        ),
      },
      {
        path: '/events/:eventId/records/update',
        element: (
          <PrivateRoute>
            <RecordUpdate />
          </PrivateRoute>
        ),
      },
      {
        path: '/events/:eventId/card',
        element: (
          <PrivateRoute>
            <CardSend />
          </PrivateRoute>
        ),
      },
      {
        path: '/events/:eventId/card/complete',
        element: (
          <PrivateRoute>
            <CardComplete />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
