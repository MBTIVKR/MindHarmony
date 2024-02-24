import { Navigate, Outlet } from 'react-router-dom';
import { Paths } from '../Routes/types/Paths';
import { useTypedSelector } from '@/Stores';

interface IAuthGuardProps {
  isAuth?: boolean
}

const AuthGuard = ({isAuth}: IAuthGuardProps) => {
    const isLoading = useTypedSelector(state => state.authReducer.isLoading)
    // const isAuth = useTypedSelector(state => state.authReducer.isAuth)
    
    // const token = localStorage.getItem('token')
      console.log(isAuth);
      

      if (isLoading) {
        return <div>loading...</div>
      } 
      
      if (isAuth) {
        return <Outlet/>
      } else {
        return <Navigate to={Paths.Login}/>
      }
      
};

export { AuthGuard };

