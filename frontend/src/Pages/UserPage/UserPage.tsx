//@ts-nocheck
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Title,
  Stack,
  Text,
  Flex,
  Divider,
  LoadingOverlay,
  Anchor,
  Breadcrumbs,
  Button,
} from "@mantine/core";
import axios from "axios";
import { AdminPaths } from "@/Components/App/Routing";
import { createPdf } from "./CreatePDF";

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading || !user) {
    return (
      <LoadingOverlay
        visible={true}
        overlayProps={{ radius: "lg", blur: 20 }}
      />
    );
  }

  const items = [
    { title: "Панель администратора", href: AdminPaths.Panel },
    { title: "Пользователи", href: AdminPaths.Users },
    { title: `${user?.auth?.username}`, href: "" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <Stack gap="lg" p="lg">
        <Flex
        direction={{ base: "column", sm: "row" }}
        m={{base: '0px auto', sm: '0px'}}>
          <Title order={2}>
            Профиль пользователя <b> {user?.auth?.username}</b>
          </Title>
          <Button ml="auto" onClick={() => createPdf(user)}>
            Скачать PDF
          </Button>
        </Flex>
        <Divider />
        <Breadcrumbs>{items}</Breadcrumbs>
        <Divider />
        <Stack gap="lg">
          <Flex align="center" gap={5}>
            <Text fw={700} size="xl" style={{ minWidth: 100 }}>
              Имя пользователя:
            </Text>
            <Text>{user?.auth?.username || "Нет данных"}</Text>
          </Flex>
          <Flex align="center">
            <Text fw={700} size="sm" style={{ minWidth: 100 }}>
              Email:
            </Text>
            <Text>{user?.auth?.email || "Нет данных"}</Text>
          </Flex>
          <Flex align="center">
            <Text fw={700} size="sm" style={{ minWidth: 100 }}>
              Роль:
            </Text>
            <Text>{user?.auth?.role || "Нет данных"}</Text>
          </Flex>
          {/* Персональные данные */}
          <Title order={3}>Персональные данные</Title>
          <Flex align="center">
            <Text fw={700} size="sm" style={{ minWidth: 100 }}>
              Имя:
            </Text>
            <Text>{user?.personal?.name || "Нет данных"}</Text>
          </Flex>
          <Flex align="center">
            <Text fw={700} size="sm" style={{ minWidth: 100 }}>
              Фамилия:
            </Text>
            <Text>{user?.personal?.surname || "Нет данных"}</Text>
          </Flex>
          <Title order={3}>Контактная информация</Title>
          <Flex align="center">
            <Text fw={700} size="sm" style={{ minWidth: 100 }}>
              Телефон:
            </Text>
            <Text>{user?.personal?.phone || "Нет данных"}</Text>
          </Flex>

          <Title order={3}>Рабочие данные</Title>
          <Flex align="center">
            <Text fw={700} size="sm" style={{ minWidth: 100 }}>
              Должность:
            </Text>
            <Text>{user?.position || "Нет данных"}</Text>
          </Flex>
          <Flex align="center">
            <Text fw={700} size="sm" style={{ minWidth: 100 }}>
              Страна:
            </Text>
            <Text>{user?.location?.country || "Нет данных"}</Text>
          </Flex>
          <Flex align="center">
            <Text fw={700} size="sm" style={{ minWidth: 100 }}>
              Город:
            </Text>
            <Text>{user?.location?.city || "Нет данных"}</Text>
          </Flex>

          <Title order={3}>Тестирования</Title>
          <Flex align="center">
            <Text fw={700} size="sm" style={{ minWidth: 100 }}>
              Тип MBTI:
            </Text>
            <Text>{user?.mbti?.type || "Отсутствует"}</Text>
          </Flex>
        </Stack>
      </Stack>
    </>
  );
};

export default UserPage;
