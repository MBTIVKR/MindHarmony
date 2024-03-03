import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Title,
  Button,
  Stack,
  Text,
  Flex,
  Divider,
} from '@mantine/core';
import { API_URL } from '@/Share/Variables';
import EditingProfile from './Form/EditingProfile';
import { API } from '@/Components/App/Routing/types/API';
import { format, parseISO } from 'date-fns';

export interface UserData {
  auth: {
    username: string;
    email: string;
    password: string;
    role: string;
  };
  personal: {
    name: string;
    surname: string;
    patronymic: string;
    birthday: string;
    phone: string;
  };
  location: {
    country: string;
    city: string;
  };
  position: string;
  mbti: {
    type: string;
  };
}

const Account = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get(`${API_URL}/api/users/${localStorage.getItem('userId')}`)
      .then((response) => {
        if (response.data) {
          const user = response.data;
          setUserData(user);
        } else {
          console.error("Response does not contain 'data'");
        }
      })
      .catch((error) => {
        console.log(
          `Server: ${error.response?.data?.message || error.message}`
        );
        setMessage(error.response?.data?.message || error.message);
      });
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

    // Валидация пароля
    if (editing) {
      // Обновляем данные пользователя на сервере
      axios
        .get(`${API_URL}${API.Users}/${localStorage.getItem('userId')}`)
        .then((response) => {
          setMessage(response.data.message);

          // Обновляем данные пользователя в LocalStorage
          localStorage.setItem('userData', JSON.stringify(userData));
        })
        .catch((error) => {
          setMessage(error.response?.data?.message || error.message);
        });
    }
  };

  return (
    <>
      {userData ? (
        editing ? (
            <EditingProfile
            userData={userData}
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
                <Text c='dimmed'>{userData.auth.username}</Text>
              </Flex>
              <Flex gap={5}>
                <Text>EMail:</Text>
                <Text c='dimmed'>{userData.auth.email}</Text>
              </Flex>
              <Flex gap={5}>
                <Text>Телефон:</Text>
                <Text c='dimmed'>{userData.personal.phone}</Text>
              </Flex>
              <Flex gap={5}>
                <Text>Роль:</Text>
                <Text c='dimmed'>{userData.auth?.role}</Text>
              </Flex>
            </Stack>

            <Title order={3} pt={20}>
              Персональные данные
            </Title>
            <Divider mt={5} mb={2} />
            <Stack gap={5} pt={10} pb={10}>
              <Flex gap={5}>
                <Text>Имя:</Text>
                <Text c='dimmed'>{userData.personal.name}</Text>
              </Flex>
              <Flex gap={5}>
                <Text>Фамилия:</Text>
                <Text c='dimmed'>{userData.personal.surname}</Text>
              </Flex>
              <Flex gap={5}>
                <Text>Отчество:</Text>
                <Text c='dimmed'>{userData.personal.patronymic}</Text>
              </Flex>
              <Flex gap={5}>
                <Text>Дата рождения:</Text>
                <Text c='dimmed'>{format(parseISO(userData.personal.birthday), 'dd.MM.yyyy')}</Text>
              </Flex>
            </Stack>

            <Title order={3} pt={20}>
              Рабочие данные
            </Title>
            <Divider mt={5} mb={2} />
            <Stack gap={5} pt={10} pb={10}>
              <Flex gap={5}>
                <Text>Должность:</Text>
                <Text c='dimmed'>{userData.position}</Text>
              </Flex>
              <Flex gap={5}>
                <Text>Страна:</Text>
                <Text c='dimmed'>{userData.location.country}</Text>
              </Flex>
              <Flex gap={5}>
                <Text>Город:</Text>
                <Text c='dimmed'>{userData.location.city}</Text>
              </Flex>
              <Title order={5}>Тестирование</Title>
              <Flex gap={5}>
                <Text>MBTI тип:</Text>
                <Text c='dimmed'>{userData.mbti.type}</Text>
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
