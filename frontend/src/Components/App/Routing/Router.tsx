import { createBrowserRouter } from "react-router-dom";
import { AdminPaths, Paths, PathsDashboard } from ".";
import { Layout } from "@Components/Features/Layouts/Layout";
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
  AdminUsers,
  AdminTests,
} from "./Lazy";
import Login from "@Pages/AuthPage/Login/Login";
import { AuthGuard } from "./Providers/AuthGuard";
import {
  AdminPanelPage,
  ResetPasswordPage,
  ResetPasswordRequest,
  UserPage,
} from "@/Pages";

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
        {
          //! Admin access
          path: PathsDashboard.PublicUserProfile,
          element: (
            <AuthGuard>
              <UserPage />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      //@ Routes with sIdebar and global Container
      path: Paths.Admin,
      element: <Home />,
      children: [
        {
          //! Admin access
          path: AdminPaths.Panel,
          element: (
            <AuthGuard isAdmin>
              <AdminPanelPage />
            </AuthGuard>
          ),
        },
        {
          //! Admin access
          path: AdminPaths.Users,
          element: (
            <AuthGuard isAdmin>
              <AdminUsers />
            </AuthGuard>
          ),
        },
        {
          //! Admin access
          path: AdminPaths.Tests,
          element: (
            <AuthGuard isAdmin>
              <AdminTests />
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
        {
          path: Paths.ForgotPassword,
          element: <ResetPasswordRequest />,
        },
        {
          path: Paths.ResetPassword,
          element: <ResetPasswordPage />,
        },
      ],
    },
  ]);
};

export default Routing;
