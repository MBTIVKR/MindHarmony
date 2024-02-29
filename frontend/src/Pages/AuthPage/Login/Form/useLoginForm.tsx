import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Paths } from '@Components/App/Routing';
import { APP_MODE } from '@/Share/Variables';
import { IconCheck } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { API } from '@/Components/App/Routing/types/API';

export interface LoginFormValues {
  Auth: {
    email: string;
    password: string;
  };
}

export const useLoginForm = () => {
  const [active, setActive] = useState(0);
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    if (loginSuccess) {
      const redirectTimer = setTimeout(() => {
        window.location.href = `${Paths.Home}`;
      }, 1000);

      return () => clearTimeout(redirectTimer);
    }
  }, [loginSuccess]);

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
            values.Auth.email.trim().length === 0
              ? 'Введите Email'
              : null,
          'Auth.password':
            values.Auth.password.length === 0 ? 'Введите пароль' : null,
        };
      }

      return {};
    },
  });

  const submitForm = () => {
    fetch(API.Login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.values),
    })
      .then((response) => {
        if (response.status === 401) {
          return response.json().then((data) => {
            notifications.show({
              title: 'Ошибка',
              message: 'Неверные учетные данные! 🤔',
              color: 'red',
            });
          });
        } else if (!response.ok) {
          notifications.show({
            title: 'Ошибка',
            message:
              'Не удалось отправить форму. Пожалуйста, попробуйте ещё раз...',
            color: 'red',
          });
        } else {
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
          setLoginSuccess(true);
        }
        {
          APP_MODE == 'dev' && response.json();
        }
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  };

  return {
    active,
    loginSuccess,
    form,
    submitForm,
  };
};
