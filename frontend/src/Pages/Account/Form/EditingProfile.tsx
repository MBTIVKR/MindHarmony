import React, { useState } from 'react';
import {
  Container,
  Title,
  Button,
  TextInput,
  Flex,
  PasswordInput,
  Text,
  Box,
  Divider,
  Stack,
  Select,
  CheckIcon,
} from '@mantine/core';
import { UserData } from '../Account';
import { API_URL } from '@/Share/Variables';
import { API } from '@/Components/App/Routing/types/API';
import { countryOptions } from '@/Pages/AuthPage/SignUp/utils/countryOptions';
import { optionsFilter } from '@/Pages/AuthPage/SignUp/utils/select';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { IMaskInput } from 'react-imask';

interface EditingProfileProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  message: string;
}

const PasswordsCheck = () => {
  return notifications.show({
    title: 'Ошибка',
    message: 'Пароли не совпадают!',
    color: 'red',
    icon: <IconX color='red' />,
  });
};

const EditingProfile: React.FC<EditingProfileProps> = ({
  userData,
  setUserData,
  onSubmit,
  onCancel,
  message,
}) => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);

  const handleSave = () => {
    const userId = localStorage.getItem('userId');

    if (newPassword !== confirmPassword) {
      setPasswordsMatch(false);
      PasswordsCheck();
      return;
    }

    if (userId) {
      const apiUrl = `${API_URL}${API.UserUpdate}/${userId}`;

      const requestData = {
        ...userData,
        auth: {
          ...userData.auth,
          password: newPassword ? newPassword : userData.auth.password,
        },
      };

      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then(() => {
          if (newPassword !== confirmPassword) {
            setPasswordsMatch(false);
            return;
          }
          notifications.show({
            title: 'Обновление данных профиля',
            message: 'Ваши данные профиля успешно обновлены',
            autoClose: true,
            withCloseButton: true,
            color: 'green',
            icon: <CheckIcon color='green' />,
          });
          onCancel();
        })
        .catch((error) => {
          console.error('Error:', error);
          notifications.show({
            title: 'Ошибка',
            message:
              'Не удалось отправить форму. Пожалуйста, попробуйте ещё раз...',
            color: 'red',
            icon: <IconX color='red' />,
          });
        });
    } else {
      console.error('User ID not found in localStorage');
    }
  };

  return (
    <Container size='lg' className='Private' pt={40} pb={50}>
      <Stack>
        <Title order={2}>Личный кабинет</Title>
        <Divider mt={5} mb={2} />
        <Title order={3} pt={0}>
          Аутентификационные данные
        </Title>
        <Divider mb={2} />
        <div className='user-profile profile_container'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e);
              handleSave();
            }}
          >
            <Flex direction='column' gap='xs'>
              <TextInput
                label='Имя пользователя'
                value={userData.auth.username}
                onChange={(e) =>
                  setUserData((prev: any) => ({
                    ...prev,
                    auth: { ...prev.auth, username: e.target.value },
                  }))
                }
                max={16}
              />
              <TextInput
                label='Email'
                value={userData.auth.email}
                onChange={(e) =>
                  setUserData((prev: any) => ({
                    ...prev,
                    auth: { ...prev.auth, email: e.target.value },
                  }))
                }
              />
              <TextInput
                mt='md'
                label='Телефон'
                placeholder='Телефон'
                component={IMaskInput}
                //@ts-ignore
                mask='+7 (000) 000-00-00'
                value={userData.personal.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUserData(
                    (prev: UserData | null) =>
                      ({
                        ...prev,
                        personal: {
                          ...prev?.personal,
                          phone: e.target.value,
                        },
                      } as UserData | null)
                  )
                }
              />

              <Box className='passwords-box'>
                <PasswordInput
                  label='Новый пароль'
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  // required
                />
                <PasswordInput
                  label='Подтвердите пароль'
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordsMatch(true);
                  }}
                  // required
                />
                {!passwordsMatch && (
                  <>
                    <Text c='red' pb={10}>
                      Пароли не совпадают
                    </Text>
                  </>
                )}
              </Box>
            </Flex>

            <Title order={3} pt={20}>
              Персональные данные
            </Title>
            <Divider mt={5} pb={20} />
            <Stack>
              <TextInput
                label='Имя'
                value={userData.personal.name}
                onChange={(e) =>
                  setUserData((prev: any) => ({
                    ...prev,
                    personal: { ...prev.personal, name: e.target.value },
                  }))
                }
              />
              <TextInput
                label='Фамилия'
                value={userData.personal.surname}
                onChange={(e) =>
                  setUserData((prev: any) => ({
                    ...prev,
                    personal: { ...prev.personal, surname: e.target.value },
                  }))
                }
              />
              <TextInput
                label='Отчество'
                value={userData.personal.patronymic}
                onChange={(e) =>
                  setUserData((prev: any) => ({
                    ...prev,
                    personal: { ...prev.personal, patronymic: e.target.value },
                  }))
                }
              />
              <TextInput
                label='Дата рождения'
                value={userData.personal.birthday}
                onChange={(e) =>
                  setUserData((prev: any) => ({
                    ...prev,
                    personal: { ...prev.personal, birthday: e.target.value },
                  }))
                }
              />
            </Stack>

            <Title order={3} pt={20}>
              Рабочие данные
            </Title>
            <Divider mt={5} pt={10} />
            <Stack>
              <TextInput
                label='Должность'
                value={userData.position}
                onChange={(e) =>
                  setUserData((prev: any) => ({
                    ...prev,
                    position: e.target.value,
                  }))
                }
              />

              <Select
                mt='md'
                label='Страна'
                placeholder='Страна'
                data={countryOptions}
                value={userData.location.country}
                filter={optionsFilter}
                searchable
                onChange={(selectedOption) => {
                  if (
                    typeof selectedOption === 'string' ||
                    selectedOption === null
                  ) {
                    setUserData((prev: any) => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        country: selectedOption || '',
                      },
                    }));
                  }
                }}
              />
              <TextInput
                label='Город'
                value={userData.location.city}
                onChange={(e) =>
                  setUserData((prev: any) => ({
                    ...prev,
                    location: { ...prev.location, city: e.target.value },
                  }))
                }
              />
            </Stack>

            <Flex gap='sm' pt={20}>
              <Button
                color='teal'
                className='save-btn profile-btn btn'
                type='submit'
              >
                Сохранить
              </Button>
              <Button
                className='cancel-btn profile-btn btn'
                type='button'
                onClick={onCancel}
              >
                Отмена
              </Button>
            </Flex>
          </form>
          {message && <p className='message'>{message}</p>}
        </div>
      </Stack>
    </Container>
  );
};

export default EditingProfile;
