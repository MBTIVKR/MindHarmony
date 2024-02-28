import { createBrowserRouter, useLocation } from 'react-router-dom';
import { Paths, PathsEternalMemory } from './types/Paths';
import { AccountPage, AuthPage, EternalMemoryPage, MainPage, WhatIsItPage } from './Lazy';
import { LayoutMain, LayoutEternalMemory } from '@/Layouts';
import { AuthGuard } from '../Providers/AuthGuard';
// import { useAppDispatch, useTypedSelector } from '@/Stores';
// import { useEffect } from 'react';
// import { authActions } from '@/Stores/Reducers/authSlice';
import { useAuth } from '@/Utils/Hooks';



const Router = () => {

    const {isAuth} = useAuth()

    // const dispatch = useAppDispatch()
    // useEffect(() => {
    //     const token = localStorage.getItem('token')
    //     if (token) {
    //         dispatch(authActions.getCookie())
    //     }
    //   }, [dispatch]);



    return createBrowserRouter([
        {
            path: Paths.Login,
            element: <AuthPage />,
        },
        {
            path: Paths.Signup,
            element: <AuthPage />,
        },
        {
            element: <LayoutMain/>,
            children: [
                {
                    path: Paths.Home,
                    element: <MainPage/>
                },
                {
                    element: <AuthGuard isAuth={isAuth}/>,
                    children: [
                        {
                            path: Paths.Account,
                            element: <AccountPage/>
                        },
                    ]
                },
                {
                    element: <LayoutEternalMemory/>,
                    children: [
                        {
                            path: PathsEternalMemory.EternalMemory,
                            element: <EternalMemoryPage/>,
                        },
                        {
                            path: PathsEternalMemory.Question,
                            element: <WhatIsItPage/>,
                        },
                        {
                            path: PathsEternalMemory.Working,
                            element: <WhatIsItPage/>,
                        }
                    ]
                }
            ]
        },
    ])
    
}

    export {Router};
