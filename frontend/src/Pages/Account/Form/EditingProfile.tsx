import { FC, useEffect, useState } from 'react';
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
import { countryOptions } from '@/Pages/AuthPage/SignUp/utils/countryOptions';
import { optionsFilter } from '@/Pages/AuthPage/SignUp/utils/select';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { IMaskInput } from 'react-imask';
import { UserData } from '@/Utils';
import { useAuth } from '@/Store';

interface EditingProfileProps {
  // userData: UserData;
  // setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  // onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  user: UserData;
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

const EditingProfile: FC<EditingProfileProps> = ({
  user,
  onCancel,
  message,
}) => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [newUserData, setNewUserData] = useState<UserData>({} as UserData);

  // const user = useAuth((state) => state.user);
  // const userID = useAuth((state) => state.user.id);
  const updateUserData = useAuth((state) => state.updateUserData);

  // const apiUrl = `${API_URL}${API.UserUpdate}/${user.id}`;

  useEffect(() => {
    setNewUserData(user);
    console.log('newUserData: ', newUserData);
    console.log('user: ', user);
    console.log('userID: ', user.id);
  }, []);

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      setPasswordsMatch(false);
      PasswordsCheck();
      return;
    }

    updateUserData(user.id, newUserData);
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
          <form onSubmit={handleSave}>
            <Flex direction='column' gap='xs'>
              <TextInput
                label='Имя пользователя'
                value={newUserData?.auth?.username}
                onChange={(e) =>
                  setNewUserData((prev: any) => ({
                    ...prev,
                    auth: { ...prev.auth, username: e.target.value },
                  }))
                }
                max={16}
              />
              <TextInput
                label='Email'
                value={newUserData?.auth?.email}
                onChange={(e) =>
                  setNewUserData((prev: any) => ({
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
                value={newUserData?.personal?.phone}
                onChange={(e) =>
                  setNewUserData((prev: any) => ({
                    ...prev,
                    personal: { ...prev.personal, phone: e.target.value },
                  }))
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
                value={newUserData?.personal?.name}
                onChange={(e) =>
                  setNewUserData((prev: any) => ({
                    ...prev,
                    personal: { ...prev.personal, name: e.target.value },
                  }))
                }
              />
              <TextInput
                label='Фамилия'
                value={newUserData?.personal?.surname}
                onChange={(e) =>
                  setNewUserData((prev: any) => ({
                    ...prev,
                    personal: { ...prev.personal, surname: e.target.value },
                  }))
                }
              />
              <TextInput
                label='Отчество'
                value={newUserData?.personal?.patronymic}
                onChange={(e) =>
                  setNewUserData((prev: any) => ({
                    ...prev,
                    personal: { ...prev.personal, patronymic: e.target.value },
                  }))
                }
              />
              <TextInput
                label='Дата рождения'
                value={newUserData?.personal?.birthday}
                onChange={(e) =>
                  setNewUserData((prev: any) => ({
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
                value={newUserData?.position}
                onChange={(e) =>
                  setNewUserData((prev: any) => ({
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
                value={newUserData?.location?.country}
                filter={optionsFilter}
                searchable
                onChange={(selectedOption) => {
                  if (
                    typeof selectedOption === 'string' ||
                    selectedOption === null
                  ) {
                    setNewUserData((prev: any) => ({
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
                value={newUserData?.location?.city}
                onChange={(e) =>
                  setNewUserData((prev: any) => ({
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
