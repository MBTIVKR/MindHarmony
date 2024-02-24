import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import './AuthPage.scss'
import { Paths } from '@/App/Routes/types/Paths'
import { AuthForm } from '@/Components'

import './AuthPage.scss'
import { ArrowLeftFromLine } from 'lucide-react'

const AuthPage = () => {
    
    const location = useLocation()
    const isSignup = location.pathname === Paths.Signup

    return (
        <div className="AuthPage">

            <div className="AuthPage__link-back">
                <Link to={Paths.Home}>
                    <ArrowLeftFromLine />
                    <span>Назад</span>
                </Link>
            </div>

            <AuthForm isSignup={isSignup}/>
        </div>
    )
}

export default AuthPage