import { lazy } from 'react';
import { Loadable } from '@App/Providers/Loadable';

// @Mains Pages Lazy

export const MainPage = Loadable(
    lazy(() => import('@Pages/MainPage/MainPage'))
);
export const AccountPage = Loadable(
    lazy(() => import('@Pages/AccountPage/AccountPage'))
);
export const EternalMemoryPage = Loadable(
    lazy(() => import('@Pages/EternalMemoryPage/EternalMemoryPage'))
);

// @Childrens EternalMemoryPage

export const WhatIsItPage = Loadable(
    lazy(() => import('@Pages/EternalMemoryPage/ChildrenPages/WhatIsItPage/WhatIsItPage'))
);
export const WorkingPage = Loadable(
    lazy(() => import('@Pages/EternalMemoryPage/ChildrenPages/WorkingPage/WorkingPage'))
);

// @Auth Page

export const AuthPage = Loadable(
    lazy(() => import('@Pages/AuthPage/AuthPage'))
);