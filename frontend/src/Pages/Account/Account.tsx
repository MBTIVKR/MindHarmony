import React, { useState, useEffect, FC } from 'react';
import axios from 'axios';
import { Title, Button, Stack, Text, Flex, Divider, rem } from '@mantine/core';
import { API_URL } from '@/Share/Variables';
import { API } from '@/Components/App/Routing/types/API';
import { format, parseISO } from 'date-fns';
import EditingProfile from './Form/EditingProfile';
import { useAuth } from '@/Store/store';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { UserData } from '@/Utils';


const Account: FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const userID = useAuth((state) => state.user.id);
  const getUserData = useAuth((state) => state.getAlluserData);
  const user = useAuth((state) => state.user);

  useEffect(() => {
    getUserData(userID).then(data => console.log(data))
  }, []);

  const handleEditProfile = () => {
    setEditing(true);
  };

  const handleViewProfile = () => {
    setEditing(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.defaults.headers.post['Content-Type'] = 'application/json';

    //@ Валидация пароля
    // if (editing) {
    //   getUserData(userID)
    //   // axios
    //   //   .get(`${API_URL}${API.Users}/${localStorage.getItem('userId')}`)
    //   //   .then((response) => {
    //   //     setMessage(response.data.message);

    //   //     // Обновляем данные пользователя в LocalStorage
    //   //     // localStorage.setItem('userData', JSON.stringify(userData));
    //   //   })
    //   //   .catch((error) => {
    //   //     setMessage(error.response.data?.message || error.message);
    //   //   });
    // }
  };

  return (
    <>
      {user ? (
        editing ? (
          <EditingProfile
            userData={user}
            setUserData={setUserData}
            onSubmit={handleSubmit}
            onCancel={handleViewProfile}
            message={message}
          />
        ) : (
          <Stack>
            <Title pt={20}>Личный кабинет</Title>
            <Title order={3} pt={20}>
              Аутентификационные данные
            </Title>
            <Divider mt={5} mb={2} />
            <Stack gap={5} pt={10} pb={10}>
              <Flex gap={2}>
                <Text>Имя пользователя:</Text>
                <Text c='dimmed'>{user.auth?.username}</Text>
              </Flex>
              <Flex gap={5}>
                <Text>EMail:</Text>
                <Text c='dimmed'>{user.auth?.email}</Text>
              </Flex>
              <Flex gap={5}>
                <Text>Телефон:</Text>
                <Text c='dimmed'>{user.personal?.phone}</Text>
              </Flex>
              <Flex gap={5}>
                <Text>Роль:</Text>
                <Text c='dimmed'>{user.auth?.role}</Text>
              </Flex>
            </Stack>

            <Title order={3} pt={20}>
              Персональные данные
            </Title>
            <Divider mt={5} mb={2} />
            <Stack gap={5} pt={10} pb={10}>
              <Flex gap={5}>
                <Text>Имя:</Text>
                <Text c='dimmed'>{user.personal?.name}</Text>
              </Flex>
              <Flex gap={5}>
                <Text>Фамилия:</Text>
                <Text c='dimmed'>{user.personal?.surname}</Text>
              </Flex>
              <Flex gap={5}>
                <Text>Отчество:</Text>
                <Text c='dimmed'>{user.personal?.patronymic}</Text>
              </Flex>
              <Flex gap={5}>
                <Text>Дата рождения:</Text>
                <Text c='dimmed'>
                  {/* {format(parseISO(user.personal?.birthday), 'dd.MM.yyyy')} */}
                  DR 
                </Text>
              </Flex>
            </Stack>

            <Title order={3} pt={20}>
              Рабочие данные
            </Title>
            <Divider mt={5} mb={2} />
            <Stack gap={5} pt={10} pb={10}>
              <Flex gap={5}>
                <Text>Должность:</Text>
                <Text c='dimmed'>{user?.position}</Text>
              </Flex>
              <Flex gap={5}>
                <Text>Страна:</Text>
                <Text c='dimmed'>{user.location?.country}</Text>
              </Flex>
              <Flex gap={5}>
                <Text>Город:</Text>
                <Text c='dimmed'>{user.location?.city}</Text>
              </Flex>
              <Title order={5}>Тестирование</Title>
              <Flex gap={5}>
                <Text>MBTI тип:</Text>
                <Text c='dimmed'>{user.mbti?.type}</Text>
              </Flex>
            </Stack>
            <Button mt={20} onClick={handleEditProfile}>
              Редактировать профиль
            </Button>
          </Stack>
        )
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Account;
