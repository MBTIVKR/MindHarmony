import { createBrowserRouter } from 'react-router-dom';
import { Paths } from '.';
import { Layout } from '@Components/Features/Layouts/Layout';
import {
  NotFoundPage,
  Settings,
  SignUp,
  Example,
  Landing,
  Account,
} from './Lazy';
import Login from '@Pages/AuthPage/Login/Login';

const Routing = () =>
  createBrowserRouter([
    {
      //@ Routes with sIdebar and global Container
      element: <Layout showSidebar={true} />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: Paths.Home,
          element: null,
        },
        {
          path: Paths.Account,
          element: <Account />,
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
    {
      //@ Routes without Sidebar and global Container
      element: <Layout showSidebar={false} noContainer={true} />,
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

export default Routing;

//? With Auth Guard

// const Routing = () =>
//   createBrowserRouter([
//     {
//       //@ Routes with sIdebar and global Container
//       element: <Layout showSidebar={true} />,
//       errorElement: <NotFoundPage />,
//       children: [
//         {
//           element: <AuthGuard />,
//           children: [
//             {
//               path: Paths.Home,
//               // element: <CalendarPage />,
//             },
//             {
//               path: Paths.Account,
//               // element: <AccauntPage />,
//             },
//             {
//               path: Paths.Settings,
//               element: <Settings />,
//             },
//             {
//               path: Paths.Example,
//               element: <Example />,
//             },
//           ],
//         },
//       ],
//     },
//     {
//       //@ Routes without Sidebar and global Container
//       element: <Layout showSidebar={false} noContainer={true}/>,
//       children: [
//         {
//           path: Paths.Root,
//           element: <Landing />,
//         },
//         {
//           path: Paths.Signup,
//           element: <SignUp />,
//         },
//         {
//           path: Paths.Login,
//           element: <Login />,
//         },
//       ],
//     },
//   ]);

// export default Routing;
