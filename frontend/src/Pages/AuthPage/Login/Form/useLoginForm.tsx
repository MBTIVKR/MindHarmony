import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Paths } from '@Components/App/Routing';
import { APP_MODE } from '@/Share/Variables';
import { IconCheck } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { API } from '@/Components/App/Routing/types/API';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/Store/store';
import { LoginValues } from '@/Utils';

export interface LoginFormValues {
  Auth: {
    email: string;
    password: string;
  };
}

export const useLoginForm = () => {
  const [active, setActive] = useState(0);
  // const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const setLogin = useAuth((state) => state.login);
  const error = useAuth((state) => state.error);
  // const loading = useAuth((state) => state.loading);


  const form = useForm<LoginFormValues>({
    initialValues: {
      Auth: {
        email: '',
        password: '',
      },
    },

    validate: (values) => {
      if (active === 0) {
        return {
          'Auth.email':
            values.Auth.email.trim().length === 0 ? 'Введите Email' : null,
          'Auth.password':
            values.Auth.password.length === 0 ? 'Введите пароль' : null,
        };
      }

      return {};
    },
  });

  const submitForm = async ({ Auth }: LoginFormValues) => {
    console.log(Auth.email, Auth.password);
    const user = await setLogin({ Auth });
    if (user && !error) {
      notifications.show({
        icon: (
          <IconCheck
            style={{ width: rem(18), height: rem(18), color: 'green' }}
          />
        ),
        title: 'Успешный вход',
        message:
          'Вы будете перенаправлены на вашу личную страницу через пару секунд',
        loading: false,
        withCloseButton: true,
        color: 'teal',
      });
      navigate(Paths.Home);
      // {
      //   APP_MODE == 'dev' && user.json();
      // }
    } else {
      notifications.show({
        title: 'Ошибка',
        message: 'Неверные учетные данные! 🤔',
        color: 'red',
      });
    }
  };

  return {
    active,
    // loginSuccess,
    form,
    submitForm,
  };
};
