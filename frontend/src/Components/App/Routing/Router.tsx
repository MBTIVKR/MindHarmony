import { createBrowserRouter } from 'react-router-dom';
import { Paths } from '.';
import { Layout } from '@Components/Features/Layouts/Layout';
import {
  NotFoundPage,
  Settings,
  AuthPage,
  SignUp,
  Example,
} from './Lazy';
import Login from '@Pages/AuthPage/Login/Login';

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
          element: <SignUp />,
        },
        {
          path: Paths.Login,
          element: <Login />,
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