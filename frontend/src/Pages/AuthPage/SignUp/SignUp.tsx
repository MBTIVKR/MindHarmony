import { useEffect, useState } from 'react';
import {
  Stepper,
  Button,
  Group,
  TextInput,
  PasswordInput,
  Code,
  Alert,
  Box,
  Anchor,
	rem,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { IconCheck, IconInfoCircle, IconX } from '@tabler/icons-react';
import { APP, APP_MODE } from '@/Share/Variables';
import { notifications } from '@mantine/notifications';
import { Paths } from '@Components/App/Routing/types/Paths';

const Signup = () => {
  const [active, setActive] = useState(0);
  const [birthval, setBirthval] = useState<Date | null>(null);
	const [registrationSuccess, setRegistrationSuccess] = useState(false);

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
          username:
            values.Auth.username.trim().length < 6
              ? 'Username must include at least 6 characters'
              : null,
          password:
            values.Auth.password.length < 6
              ? 'Password must include at least 6 characters'
              : null,
        };
      }

      if (active === 1) {
        return {
          name:
            values.Personal.name.trim().length < 2
              ? 'Name must include at least 2 characters'
              : null,
          email: /^\S+@\S+$/.test(values.Auth.email) ? null : 'Invalid email',
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
    fetch('http://localhost:4000/api/signup', {
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
          // notifications.show({
          //   title: 'Успешная регистрация',
          //   message: 'Ваша учётная запись была зарегистрирована! Вы',
          //   color: 'green',
          // });
					notifications.show({
						loading: true,
						title: 'Успешная регистрация',
						message: 'Вы будете перенаправлены на страницу авторизации через 5 секунд',
						autoClose: false,
						withCloseButton: false,
					});
					setTimeout(() => {
						notifications.update({
							id,
							color: 'teal',
							title: 'Data was loaded',
							message: 'Notification will close in 2 seconds, you can close this notification now',
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
      .then((data) => {
        // Handle the response from the server
        console.log('Server response:', data);
      })
      .catch((error) => {
        // Handle network errors
        console.error('Error submitting form:', error);
      });
  };

  //@ Dev success callback
  const DevSuccesSugnUP = () => (
    <>
      Completed! Form values:
      <Code block mt='xl'>
        {JSON.stringify(form.values, null, 2)}
      </Code>
    </>
  );
  //@ Production success callback
  const SuccesSugnUP = () => (
    <Box>
      <Alert
        variant='light'
        color='orange'
        title='Уведомление'
        icon={<IconInfoCircle />}
      >
        После нажатия на кнопку "Зарегистрироваться" будет создана ваша учетная
        запись внутри сервиса
        <Anchor href='/' target='blank'>
          {' '}
          {APP.FULLNAME}
        </Anchor>
      </Alert>
    </Box>
  );

	useEffect(() => {
    if (registrationSuccess) {
      const redirectTimer = setTimeout(() => {
        window.location.href = `${Paths.Login}`;
      }, 5000);

      return () => clearTimeout(redirectTimer);
    }
  }, [registrationSuccess]);

  return (
    <>
      <Stepper active={active} pt={70}>
        <Stepper.Step label='Регистрация' description='Данные для входа'>
          <TextInput
            label='Имя пользователя'
            placeholder='Имя пользователя'
            {...form.getInputProps('Auth.username')}
          />
          <TextInput
            label='Email'
            placeholder='Email'
            {...form.getInputProps('Auth.email')}
          />
          <PasswordInput
            mt='md'
            label='Пароль'
            placeholder='Пароль'
            {...form.getInputProps('Auth.password')}
          />
        </Stepper.Step>

        <Stepper.Step
          label='Личные данные'
          description='Информация о пользователе'
        >
          <TextInput
            label='Имя'
            placeholder='Имя'
            {...form.getInputProps('Personal.name')}
          />
          <TextInput
            mt='md'
            label='Фамилия'
            placeholder='Фамилия'
            {...form.getInputProps('Personal.surname')}
          />
          <TextInput
            mt='md'
            label='Отчество'
            placeholder='Отчество'
            {...form.getInputProps('Personal.patronymic')}
          />
          <DateInput
            mt='md'
            value={birthval}
            //@ts-ignore
            onChange={setBirthval}
            label='Дата рождения'
            placeholder='Дата рождения'
            {...form.getInputProps('Personal.birthday')}
          />
        </Stepper.Step>

        <Stepper.Step
          label='Рабочая информация'
          description='Данные о сотруднике'
        >
          <TextInput
            mt='md'
            label='Должность'
            placeholder='Должность'
            {...form.getInputProps('position')}
          />
          <TextInput
            mt='md'
            label='Телефон'
            placeholder='Телефон'
            {...form.getInputProps('Personal.phone')}
          />
          <TextInput
            mt='md'
            label='Страна'
            placeholder='Страна'
            {...form.getInputProps('Location.country')}
          />
          <TextInput
            mt='md'
            label='Город'
            placeholder='Город'
            {...form.getInputProps('Location.city')}
          />
        </Stepper.Step>
        <Stepper.Completed>
          {SuccesSugnUP()}
          {APP_MODE == 'dev' && DevSuccesSugnUP()}
        </Stepper.Completed>
      </Stepper>
      <Group justify='flex-end' mt='xl'>
        {active !== 0 && (
          <Button variant='default' onClick={prevStep}>
            Назад
          </Button>
        )}
        {active !== 3 ? (
          <Button onClick={nextStep}>Далее</Button>
        ) : (
          <Button onClick={submitForm}>Зарегистрироваться</Button>
        )}
      </Group>
    </>
  );
};

export default Signup;
