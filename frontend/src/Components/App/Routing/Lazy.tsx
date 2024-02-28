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
export const Example = Loadable(
  lazy(() => import('@Pages/Example/Example'))
);
// export const AccauntPage = Loadable(
//   lazy(() => import('@/Pages/AccountPage/AccountPage'))
// );
// export const AuthPage = Loadable(
//   lazy(() => import('@Pages/AuthPage/AuthPage'))
// );