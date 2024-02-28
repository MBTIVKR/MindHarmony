import { lazy } from 'react';
import { Loadable } from './Providers/Loadable';

// //@ Here reexports of the Lazy Components
export const Settings = Loadable(
  lazy(() => import('@/Pages/Settings/Settings'))
);
export const NotFoundPage = Loadable(
  lazy(() => import('@Pages/ErrorsPages/NotFound/NotFound'))
);
export const AuthPage = Loadable(
  lazy(() => import('@Pages/AuthPage/AuthPage'))
);
// export const CalendarPage = Loadable(
//   lazy(() => import('@Pages/CalendarPage/CalendarPage'))
// );
// export const AccauntPage = Loadable(
//   lazy(() => import('@/Pages/AccountPage/AccountPage'))
// );
// export const AuthPage = Loadable(
//   lazy(() => import('@Pages/AuthPage/AuthPage'))
// );
// export const TargetPage = Loadable(
//   lazy(() => import('@Pages/TargetPage/TargetPage'))
// );
// export const TodoPage = Loadable(
//   lazy(() => import('@Pages/TodoPage/TodoPage'))
// );
// export const StatisticPage = Loadable(
//   lazy(() => import('@Pages/StatisticPage/StatisticPage'))
// );

// export const ErrorPage = Loadable(
//   lazy(() => import('@Pages/ErrorPage/ErrorPage'))
// );