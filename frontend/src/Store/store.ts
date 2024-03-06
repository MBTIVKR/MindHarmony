import { $authHost, $host } from '@/Services/instance/index';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { jwtDecode } from 'jwt-decode';
import { AxiosError, isAxiosError } from 'axios';
// import { User } from '@/utils/Types/User';
import {
  SignupFormValues,
  LoginFormValues,
  LoginValues,
  UserData as User,
  UserData,
} from '@/Utils';
import { type AuthErrorType } from '@/Utils/types/Errors/Auth/Errors';
// import Cookies from 'universal-cookie';

//TODO Fix interfaces and other
export interface IAuthStore {
  isAuth: boolean,
  user: User,
  error: string,
  loading: boolean,
  register: ({
    Auth,
    Personal,
    Location,
    position,
  }: SignupFormValues) => Promise<User | undefined>;
  login: ({ Auth }: LoginFormValues) => Promise<User | undefined>;
  getAlluserData: (id: string) => Promise<User | void>;
  loguot: () => void;
  chaekAuth: () => Promise<User | undefined>;
}

export const useAuth = create<IAuthStore>()(
  immer(
    devtools((set) => ({
      isAuth: false,
      user: {} as User,
      error: '',
      loading: false,

      register: async ({ Auth, Personal, Location, position }) => {
        // const cookie = new Cookies();
        try {
          set({ loading: true });
          const { data } = await $host.post('api/signup', {
            Auth,
            Personal,
            Location,
            position,
            // role: 'user',
          });
          // console.log(data);
          localStorage.setItem('token', data.token);
          // cookie.set('token', data.token);
          const user = jwtDecode<User>(data.token);
          set({ user: user });
          return user;
        } catch (error) {
          if (isAxiosError(error)) {
            const err: AxiosError<AuthErrorType> = error;
            set({ error: err.response?.data.message });
          }
        } finally {
          set({ loading: false });
          setTimeout(() => set({ error: '' }), 5000);
        }
      },

      login: async ({ Auth }) => {
        // const cookie = new Cookies();
        console.log(Auth.email, Auth.password);
        try {
          set({ loading: true });
          const { data } = await $host.post('api/login', {
            Auth,
          });
          console.log(data);
          localStorage.setItem('token', data.token);
          // cookie.set('token', data.token);
          const user = jwtDecode<User>(data.token);
          set({ user: user, isAuth: true });
          return user;
        } catch (error) {
          if (isAxiosError(error)) {
            const err: AxiosError<AuthErrorType> = error;
            set({ error: err.response?.data.message });
          }
        } finally {
          set({ loading: false });
          setTimeout(() => set({ error: '' }), 5000);
        }
      },

      getAlluserData: async (id: string) => {
        try {
          const { data } = await $host.get(`api/users/${id}`);
          set({ user: data });
        } catch (error) {
          if (isAxiosError(error)) {
            const err: AxiosError<AuthErrorType> = error;
            set({ error: err.response?.data.message });
          }
        }
      },

      chaekAuth: async () => {
        // const cookie = new Cookies();
        set({ loading: true });
        try {
          const { data } = await $authHost.get('api/user/auth');
          // cookie.set('token', data.token);
          localStorage.setItem('token', data.token);
          const user = jwtDecode<User>(data.token);
          set({ user: user, isAuth: true });
          return user;
        } catch (error) {
          if (isAxiosError(error)) {
            const err: AxiosError<AuthErrorType> = error;
            set({ error: err.response?.data.message });
          }
        } finally {
          set({ loading: false });
          setTimeout(() => set({ error: '' }), 1000);
        }
      },

      loguot: async () => {
        // const cookie = new Cookies();
        set({ loading: true });
        try {
          localStorage.removeItem('token');
          // cookie.remove('token');
          set({ user: {} as User, isAuth: false });
        } catch (error) {
          if (isAxiosError(error)) {
            const err: AxiosError<AuthErrorType> = error;
            set({ error: err.response?.data.message });
          }
        } finally {
          set({ loading: false });
        }
      },
    }))
  )
);
