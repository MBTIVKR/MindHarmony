import { createBrowserRouter } from 'react-router-dom';
import { Paths, PathsDashboard } from '.';
import { Layout } from '@Components/Features/Layouts/Layout';
import {
  NotFoundPage,
  Settings,
  SignUp,
  Example,
  Landing,
  Account,
  Home,
  MBTITest,
  TestsPage,
  SMILTest,
} from './Lazy';
import Login from '@Pages/AuthPage/Login/Login';
import { AuthGuard } from './Providers/AuthGuard';

const Routing = () => {
  return createBrowserRouter([
    {
      //@ Routes with sIdebar and global Container
      path: Paths.Dashbord,
      element: <Home />,
      children: [
        {
          path: PathsDashboard.Main,
          element: (
            <AuthGuard>
              <Example />
            </AuthGuard>
          ),
        },
        {
          path: PathsDashboard.Account,
          element: (
            <AuthGuard>
              <Account />
            </AuthGuard>
          ),
        },
        {
          path: PathsDashboard.Settings,
          element: (
            <AuthGuard>
              <Settings />
            </AuthGuard>
          ),
        },
        {
          path: PathsDashboard.Tests,
          element: (
            <AuthGuard>
              <TestsPage />
            </AuthGuard>
          ),
        },
        {
          path: PathsDashboard.MBTI,
          element: (
            <AuthGuard>
              <MBTITest />
            </AuthGuard>
          ),
        },
        {
          path: PathsDashboard.SMIL,
          element: (
            <AuthGuard>
              <SMILTest />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      //@ Routes without Sidebar and global Container
      element: <Layout showSidebar={false} noContainer={true} />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: Paths.Root,
          element: <Landing />,
        },
        {
          path: Paths.Signup,
          element: <SignUp />,
        },
        {
          path: Paths.Login,
          element: <Login />,
        },
      ],
    },
  ]);
};

export default Routing;
