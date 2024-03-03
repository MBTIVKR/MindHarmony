import { FC } from 'react';
import {
  Button,
  Group,
  TextInput,
  PasswordInput,
  Text,
  Title,
  Box,
  Container,
} from '@mantine/core';
import { useLoginForm } from './Form/useLoginForm';
import { Paths } from '@Components/App/Routing/types/Paths';
import { Link } from '@/Components/Shared';
import { Header } from '@/Components/Features/Layouts';
import { APP_MODE } from '@/Share/Variables';

const Login: FC = () => {
  const { form, submitForm } = useLoginForm();

  //@ Dev success callback
  const DevSuccessLogin = () => (
    <Text>Completed! Form values: {JSON.stringify(form.values, null, 2)}</Text>
  );

  const handleLogin = async () => {
    await submitForm();

    // After successful form submission
    // Check if the cookie 'token' is set
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );

    if (token) {
      // Parse and decode the token
      const decodedToken = JSON.parse(atob(token.split('.')[1]));

      // Extract the 'id' from the decoded token
      const userId = decodedToken.id;

      // Save userId to localStorage, replacing the existing value
      localStorage.setItem('userId', userId);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Box pt={70} w={{ base: '90%', sm: '40%' }} m={'0px auto'}>
          <Title style={{ textAlign: 'center', paddingBottom: '20px' }}>
            Авторизация
          </Title>
          <TextInput
            label='Email'
            placeholder='Email'
            required
            {...form.getInputProps('Auth.email')}
          />
          <PasswordInput
            mt='md'
            label='Пароль'
            placeholder='Пароль'
            required
            {...form.getInputProps('Auth.password')}
          />
          <Text pt={10}>
            Ещё нет аккаунта? {'  '}
            <Link underline={true} to={Paths.Signup}>
              Зарегистрируйтесь!
            </Link>
          </Text>
          <Group justify='center' mt='xl'>
            <Button onClick={handleLogin}>Войти</Button>
          </Group>
          {APP_MODE == 'dev' && DevSuccessLogin()}
        </Box>
      </Container>
    </>
  );
};

export default Login;
