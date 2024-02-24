import { useAppDispatch, useTypedSelector } from "@/Stores"
import { useEffect } from "react";
import {authActions} from '@/Stores/Reducers/authSlice';

export const useAuth = () => {
    const isAuth = useTypedSelector(state => state.authReducer.isAuth)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(authActions.getCookie())
      }, []);
  
    return {isAuth}
} 