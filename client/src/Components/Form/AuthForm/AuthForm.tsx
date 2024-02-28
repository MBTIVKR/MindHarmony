import { Paths } from '@/App/Routes/types/Paths';
import { Label, Loader } from '@/Components';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {SignUp, logIn} from '@/Stores/Reducers/authSlice'

import './AuthForm.scss'
import { useAppDispatch, useTypedSelector } from '@/Stores';

type AuthFormProps = {
  isSignup: boolean;
};

export type FormValues = {
  email: string;
  password: string;
};

const AuthForm: FC<AuthFormProps> = ({ isSignup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onSubmit' });

    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const error = useTypedSelector(state => state.authReducer.error)
    const isLoading = useTypedSelector(state => state.authReducer.isLoading)


    const onSubmit = async ({email, password}: FormValues) => {
      if (isSignup) {
        const data = await dispatch(SignUp({email, password}))
        
        if(data) {
          navigate(Paths.Login);
        }
      } else {
        const data = await dispatch(logIn({email, password}))
        console.log(data);
        if(data) {
          navigate(Paths.Account);
        }
      }
    }

  return (
    <div className='authForm'>
      <form className='authForm__form' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='authForm__title'>{isSignup ? 'Signup' : 'Login'}</h1>
        <div className='authForm__inputs'>
          <Label
            title='Email'
            name='email'
            placeholder='Email'
            register={register}
            errors={errors.email}
            type='email'
          />
          <Label
            title='Password'
            name='password'
            placeholder='Password'
            register={register}
            errors={errors.password}
            rules={{ minLength: 3 }}
            type='text'
          />
        </div>
        {isSignup ? (
          <div className='authForm__quastion'>
            У вас есть аккаунт? {<Link to={Paths.Login}>Войти</Link>}
          </div>
        ) : (
          <div className='authForm__quastion'>
            Создать новый аккаунт?{' '}
            {<Link to={Paths.Signup}>Зарегестрироваться</Link>}
          </div>
        )}

        <button className='authForm__submitbtn' type='submit'>
           {isLoading ? (<Loader />) : (<span>{isSignup ? 'Register' : 'Login'}</span>)}
        </button>

        {error && <div className='authForm__respError'>{error}</div>}
      </form>
    </div>
  );
};

export { AuthForm };
