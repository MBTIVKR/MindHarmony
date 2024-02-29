import { FC } from 'react';
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
  Select,
  Input,
  Text,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconInfoCircle } from '@tabler/icons-react';
import { APP, APP_MODE } from '@/Share/Variables';
import { optionsFilter } from './utils/select';
import { countryOptions } from './utils/countryOptions';
import { IMaskInput } from 'react-imask';
import { useSignupForm } from './Form/useSignupForm';

const Signup: FC = () => {
  const { active, birthval, form, nextStep, prevStep, submitForm } =
    useSignupForm();

  //@ Dev success callback
  const DevSuccesSugnUP = () => (
    <>
      <Text>Completed! Form values:</Text>
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
            onChange={(value) => setBirthval(value)}
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
          <Input
            mt='md'
            label='Телефон'
            placeholder='Телефон'
            component={IMaskInput}
            mask='+7 (000) 000-00-00'
            error='Номер телефона введи'
            {...form.getInputProps('Personal.phone')}
          />
          <Select
            mt='md'
            label='Страна'
            placeholder='Страна'
            data={countryOptions}
            filter={optionsFilter}
            searchable
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
