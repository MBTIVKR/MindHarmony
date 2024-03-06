import { Navigate } from 'react-router-dom';
import { useAuth } from '@/Store';
import { Loader } from '@mantine/core';
import { Paths } from '..';
import { ReactElement } from 'react';
import { APP_MODE } from '@/Share/Variables';

export type TGuardProps = {
  children: ReactElement;
};

const AuthGuard = ({ children }: TGuardProps) => {
  const isAuth = useAuth((state) => state.isAuth);
  const isLoading = useAuth((state) => state.loading);

  if (APP_MODE == 'dev') {
    console.log('AuthGuard: ' + isAuth);
  }

  if (isLoading) {
    return (
      <div className='loading-sket'>
        <Loader />
      </div>
    );
  }
  if (isAuth) {
    return children;
  } else {
    return <Navigate to={Paths.Login} />;
  }
};

export { AuthGuard };
