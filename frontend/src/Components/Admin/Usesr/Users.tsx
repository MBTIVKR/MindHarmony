import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Text,
  Select,
  Group,
  Box,
  Tooltip,
  Divider,
  Breadcrumbs,
  Title,
  Anchor,
} from "@mantine/core";
import { $host } from "@/Services/instance";
import { useNavigate } from "react-router-dom";
import { IconUserCancel, IconUserFilled } from "@tabler/icons-react";
import { AdminPaths } from "@/Components/App/Routing";
import { exportToExcel } from "./exportToExel";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchSections();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await $host.get(`/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchSections = async () => {
    try {
      const response = await $host.get(`/api/sections`);
      setSections(response.data);
    } catch (error) {
      console.error("Failed to fetch sections:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authentication token is not available.");
        return;
      }

      const response = await $host.delete(`/api/users/${userId}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        fetchUsers();
        console.log("User deleted successfully");
      } else {
        console.error(
          "Failed to delete user, server responded with status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
    setIsModalOpen(false);
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user might not be logged in");
        return;
      }

      const response = await $host.put(
        `/api/users/update-role/${userId}`,
        {
          newRole: newRole,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchUsers();
        console.log("Role updated successfully");
      } else {
        console.error(
          "Failed to update role, server responded with status: ",
          response.status
        );
      }
    } catch (error) {
      console.error("Failed to update user role:", error);
    }
  };

  const handleChangeSection = async (userId, sectionId, sectionName) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user might not be logged in");
        return;
      }

      const response = await $host.put(
        `/api/users/update-section/${userId}`,
        { section_id: parseInt(sectionId), section_name: sectionName }, // Добавляем section_name
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        await fetchUsers();
        console.log("Section updated successfully");
      } else {
        console.error(
          "Failed to update section, server responded with status: ",
          response.status
        );
      }
    } catch (error) {
      console.error("Failed to update user section:", error);
    }
  };

  const items = [
    { title: "Панель администратора", href: AdminPaths.Panel },
    { title: "Пользователи", href: AdminPaths.Users },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  return (
    <>
      <Title order={1} pt={20} mb={20}>
        Пользователи
      </Title>
      <Button mb={20} onClick={() => exportToExcel(users, "UsersList")}>
        Скачать как Excel
      </Button>
      <Divider />
      <Breadcrumbs pt={20} pb={20}>
        {items}
      </Breadcrumbs>
      <Divider />
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>username</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Роль</Table.Th>
            <Table.Th>Имя</Table.Th>
            <Table.Th>Фамилия</Table.Th>
            <Table.Th>Дата рождения</Table.Th>
            <Table.Th>Отдел</Table.Th>
            <Table.Th>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.map((user) => (
            <Table.Tr key={user?.id}>
              <Table.Td>{user?.id}</Table.Td>
              <Table.Td>{user?.auth.username}</Table.Td>
              <Table.Td>{user?.auth?.email}</Table.Td>
              <Table.Td>
                <Select
                  value={user?.auth?.role.toString()}
                  onChange={(value) => handleChangeRole(user?.id, value)}
                  data={[
                    { value: "admin", label: "Admin" },
                    { value: "user", label: "User" },
                  ]}
                />
              </Table.Td>
              <Table.Td>
                {user?.personal?.name || <Text c={"dark"}>Отсутствует</Text>}
              </Table.Td>
              <Table.Td>
                {user?.personal?.surname || <Text c={"dark"}>Отсутствует</Text>}
              </Table.Td>
              <Table.Td>
                {user?.personal?.birthday || (
                  <Text c={"dark"}>Отсутствует</Text>
                )}
              </Table.Td>
              <Table.Td>
              <Select
                value={user?.position || "none"}
                onChange={(value) => handleChangeSection(user?.id, value, user?.section?.position_name || "")} // Передаем section_name или пустую строку
                data={sections.map((section) => ({
                  value: section?.id.toString(), // Используем id отдела как значение
                  label: section?.position_name || "Не указано",
                }))}
              />
              </Table.Td>

              <Table.Td>
                <Group gap="sm">
                  <Tooltip label="Профиль">
                    <IconUserFilled
                      onClick={() => navigate(`/dashboard/users/${user?.id}`)}
                    />
                  </Tooltip>
                  <Tooltip label="Удалить">
                    <IconUserCancel
                      color="red"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsModalOpen(true);
                      }}
                    />
                  </Tooltip>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Deletion"
      >
        <Box>
          <Text>
            Вы действительно хотите удалить пользователя{" "}
            <b>{selectedUser?.auth?.username}</b>?
          </Text>
        </Box>
        <Button color="red" onClick={() => handleDelete(selectedUser?.id)}>
          Delete User
        </Button>
      </Modal>
    </>
  );
};

export default Users;
