// @ Here reexports of the Lazy Components
import { lazy } from 'react';
import { Loadable } from './Providers/Loadable';

//! Components
//@ Header
export const Header = Loadable(
  lazy(() => import('@Components/Features/Layouts/Header/Header'))
);
//@ Footer
export const Footer = Loadable(
  lazy(() => import('@Components/Features/Layouts/Footer/Footer'))
);

//! Pages
//@ Landing Page
export const Landing = Loadable(lazy(() => import('@/Pages/Landing/Landing')));
//@ Settings Page
export const Settings = Loadable(
  lazy(() => import('@/Pages/Settings/Settings'))
);
//@ Auth Pages
export const SignUp = Loadable(
  lazy(() => import('@Pages/AuthPage/SignUp/SignUp'))
);
export const Login = Loadable(
  lazy(() => import('@Pages/AuthPage/Login/Login'))
);
//@ Error pages
export const NotFoundPage = Loadable(
  lazy(() => import('@Pages/ErrorsPages/NotFound/NotFound'))
);
//@ Example Pages
export const Example = Loadable(lazy(() => import('@Pages/Example/Example')));

// export const AccauntPage = Loadable(
//   lazy(() => import('@/Pages/AccountPage/AccountPage'))
// );import { Footer } from '@/Layouts';
