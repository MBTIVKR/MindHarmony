import { createBrowserRouter } from 'react-router-dom';
// import { Loading, Notification } from '@/Components';
import { Paths } from '.';
import { Layout } from '@/Components/Features/Layouts/Layout';
import {
  NotFoundPage,
  Settings,
  AuthPage,
} from './Lazy';

const Routing = () =>
  createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: Paths.Home,
          // element: <CalendarPage />,
        },
        {
          path: Paths.Account,
          // element: <AccauntPage />,
        },
        {
          path: Paths.Signup,
          element: <AuthPage />,
        },
        {
          path: Paths.Login,
          element: <AuthPage />,
        },
        {
          path: Paths.Settings,
          element: <Settings />,
        },
      ],
    },
  ]);

export default Routing;