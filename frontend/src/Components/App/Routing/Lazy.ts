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
//@ Copyright
export const Copyright = Loadable(
  lazy(() => import('@Components/Features/Layouts/Copyright/Copyright'))
);
//@ Features
export const Features = Loadable(
  lazy(() => import('@Pages/Landing/Parts/Features/Features'))
);
//@ FAQ
export const FAQ = Loadable(lazy(() => import('@Pages/Landing/Parts/FAQ/FAQ')));
//@ Hero
export const Hero = Loadable(
  lazy(() => import('@Pages/Landing/Parts/Hero/Hero'))
);
//@ GetInTouch
export const GetInTouch = Loadable(
  lazy(() => import('@Pages/Landing/Parts/GetInTouch/GetInTouch'))
);
//@ MBTI
export const MBTI = Loadable(
  lazy(() => import('@Pages/Landing/Parts/MBTI/MBTI'))
);
//@ Reviews
export const Reviews = Loadable(
  lazy(() => import('@Pages/Landing/Parts/Reviews/Reviews'))
);
//@ TopScroll Affix
export const TopScroll = Loadable(
  lazy(() => import('@Components/Features/Affix/Affix'))
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
export const Account = Loadable(lazy(() => import('@Pages/Account/Account')));
export const EditingProfile = Loadable(lazy(() => import('@Pages/Account/Form/EditingProfile')));
//@ Error pages
export const NotFoundPage = Loadable(
  lazy(() => import('@Pages/ErrorsPages/NotFound/NotFound'))
);
//@ Example Pages
export const Example = Loadable(lazy(() => import('@Pages/Example/Example')));

//! Utils
//@ NowYear util
export const NowYear = Loadable(lazy(() => import('@/Utils/NowYear/NowYear')));

// export const AccauntPage = Loadable(
//   lazy(() => import('@/Pages/AccountPage/AccountPage'))
// );import { Footer } from '@/Layouts';
