import { createBrowserRouter } from 'react-router-dom';
import { Paths } from '.';
import { Layout } from '@Components/Features/Layouts/Layout';
import {
  NotFoundPage,
  Settings,
  AuthPage,
  Example,
} from './Lazy';

const Routing = () =>
  createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: Paths.Root,
          // element: <CalendarPage />,
        },
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
        {
          path: Paths.Example,
          element: <Example />,
        },
      ],
    },
  ]);

export default Routing;