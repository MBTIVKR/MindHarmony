import { $authHost, $host } from '@/Services/instance/index';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { jwtDecode } from 'jwt-decode';
import { AxiosError, isAxiosError } from 'axios';
import {
  SignupFormValues,
  LoginFormValues,
  UserData as User,
  UserData,
  dev,
} from '@/Utils';
import { type AuthErrorType } from '@/Utils/types/Errors/Auth/Errors';

// import Cookies from 'universal-cookie';

//TODO Fix interfaces and other
export interface IAuthStore {
  isAuth: boolean;
  user: User;
  error: string;
  loading: boolean;
  register: ({
    Auth,
    Personal,
    Location,
    position,
  }: SignupFormValues) => Promise<User | undefined>;
  login: ({ Auth }: LoginFormValues) => Promise<User | undefined>;
  getAlluserData: (id: number) => Promise<UserData | undefined>;
  updateUserData: (id: number, newData: UserData | null) => Promise<User | void>;
  loguot: () => void;
  chaekAuth: () => Promise<User | undefined>;
}


export const useAuth = create<IAuthStore>()(immer(devtools((set, get) => ({
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
        dev.log(`Auth email: ${Auth.email} Auth password: ${Auth.password}`);
        try {
          set({ loading: true });
          const { data } = await $host.post('api/login', {
            Auth,
          });
          dev.log(data);
          localStorage.setItem('token', data.token);
          // cookie.set('token', data.token);
          const user = jwtDecode<User>(data.token);
          set({ user: user, isAuth: true });
          console.log(user);
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

      getAlluserData: async (id: number) => {
        try {
          const { data } = await $host.get(`api/users/${id}`);
          // console.log(data);
          set({ user: data });
          return data
        } catch (error) {
          if (isAxiosError(error)) {
            const err: AxiosError<AuthErrorType> = error;
            set({ error: err.response?.data.message });
          }
        }
      },

      updateUserData: async (userId: number, newData: UserData | null) => {
        try {
          const response = await $host.put(
            `api/users/update/${userId}`,
            newData
          );
          const updatedUserData = response.data.token;
          // Обновление данных пользователя в сторе
          set((state) => {
            state.user = updatedUserData;
          });

          console.log(response.data);
          localStorage.setItem('token', response.data.token);

          return updatedUserData;
        } catch (error) {
          throw error;
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
