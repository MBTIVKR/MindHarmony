import { Navigate } from 'react-router-dom';
import { useAuth } from '@/Store';
import { Loader } from '@mantine/core';
import { Paths } from '..';
import { ReactElement } from 'react';
import { dev } from '@/Utils';

export type TGuardProps = {
  children: ReactElement;
};

const AuthGuard = ({ children }: TGuardProps) => {
  const isAuth = useAuth((state) => state.isAuth);
  const isLoading = useAuth((state) => state.loading);

  dev.log('AuthGuard: ' + isAuth);

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
