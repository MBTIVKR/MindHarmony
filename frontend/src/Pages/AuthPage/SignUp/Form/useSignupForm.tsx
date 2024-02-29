import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Paths } from '@Components/App/Routing';
import { APP_MODE } from '@/Share/Variables';
import { IconCheck } from '@tabler/icons-react';
import { rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { API } from '@/Components/App/Routing/types/API';

export const useSignupForm = () => {
  const [active, setActive] = useState(0);
  const [birthval, setBirthval] = useState<Date | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    if (registrationSuccess) {
      const redirectTimer = setTimeout(() => {
        window.location.href = `${Paths.Login}`;
      }, 5000);

      return () => clearTimeout(redirectTimer);
    }
  }, [registrationSuccess]);

  const form = useForm({
    initialValues: {
      Auth: {
        username: '',
        email: '',
        password: '',
      },
      Personal: {
        name: '',
        surname: '',
        patronymic: '',
        birthday: '',
        phone: '',
      },
      Location: {
        country: '',
        city: '',
      },
      position: '',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          'Auth.username':
            values.Auth.username.trim().length < 3
              ? 'Имя пользователя должно содержать не менее 3 символов.'
              : null,
          'Auth.email':
            values.Auth.email.trim().length === 0
              ? 'Введите email'
              : !/^\S+@\S+\.\S+$/.test(values.Auth.email)
              ? 'Некорректный формат email'
              : null,
          'Auth.password':
            values.Auth.password.length < 6
              ? 'Пароль должен содержать не менее 6 символов'
              : null,
        };
      }

      if (active === 1) {
        return {
          'Personal.name':
            values.Personal.name.trim().length < 2
              ? 'Имя должно содержать не менее 2 символов'
              : null,
        };
      }

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const submitForm = () => {
    fetch(API.SignUP, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.values),
    })
      .then((response) => {
        if (response.status === 409) {
          return response.json().then((data) => {
            notifications.show({
              title: 'Ошибка',
              message: 'Такой Email уже существует! 🤥',
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
            loading: true,
            title: 'Успешная регистрация',
            message:
              'Вы будете перенаправлены на страницу авторизации через 5 секунд',
            autoClose: false,
            withCloseButton: false,
          });
          setTimeout(() => {
            notifications.update({
              color: 'teal',
              title: 'Data was loaded',
              message:
                'Notification will close in 2 seconds, you can close this notification now',
              icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
              loading: false,
              autoClose: 2000,
            });
          }, 3000);
          setRegistrationSuccess(true);
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
    birthval,
    registrationSuccess,
    form,
    nextStep,
    prevStep,
    submitForm,
  };
};
