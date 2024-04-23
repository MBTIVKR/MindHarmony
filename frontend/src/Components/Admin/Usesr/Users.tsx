import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Text,
  Group,
  Box,
  Tooltip,
  Divider,
  Breadcrumbs,
  Title,
  Anchor,
  Select,
} from "@mantine/core";
import { $host } from "@/Services/instance";
import { useNavigate } from "react-router-dom";
import { IconUserCancel, IconUserFilled, Icon123 } from "@tabler/icons-react";
import { AdminPaths } from "@/Components/App/Routing";
import { exportToExcel } from "./exportToExel";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState({
    id: "",
    position_name: "",
  });
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

  const handleChangeSection = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, user might not be logged in");
        return;
      }
  
      if (!selectedSection || !selectedSection.id) {
        console.error("Please select a section");
        return;
      }
  
      const sectionId = selectedSection.id.toString(); // Ensure it's a string
      const section = sections.find(
        (section) => section.id.toString() === sectionId
      );
      if (!section) {
        console.error("Section not found");
        return;
      }
  
      const response = await $host.put(
        `/api/users/update-section/${userId}`,
        {
          section_id: section.id,
          section_name: section.name,
        },
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

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
              <Table.Td>{user?.auth?.username}</Table.Td>
              <Table.Td>{user?.auth?.email}</Table.Td>
              <Table.Td>
                <Select
                  value={user?.auth?.role ? user.auth.role.toString() : ""}
                  onChange={(value) => handleChangeRole(user?.id, value)}
                  data={[
                    { value: "admin", label: "Admin" },
                    { value: "user", label: "User" },
                  ].map((option) => ({
                    value: option.value.toString(),
                    label: option.label,
                  }))}
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
                {user?.section?.name|| (
                  <Text c={"dark"}>Отсутствует</Text>
                )}
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
                      onClick={() => openModal(user)}
                    />
                  </Tooltip>
                  <Tooltip label="Перевод">
                    <Icon123 onClick={() => openModal(user)} />
                  </Tooltip>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal
        opened={isModalOpen}
        onClose={closeModal}
        title="Перевод пользователя в другой отдел"
      >
        <Box>
          <Text>Выберите новый отдел для пользователя:</Text>
          <Select
            value={selectedSection.id ? selectedSection.id.toString() : ""}
            onChange={(value) => {
              const section = sections.find(
                (section) => section.id.toString() === value
              );
              setSelectedSection(section || { id: "", position_name: "" });
            }}
            data={sections.map((section) => ({
              value: String(section?.id),
              label: section?.position || section?.name || "", // Используйте position или name в зависимости от структуры данных
            }))}
          />
          <Button
            color="blue"
            mt={10}
            onClick={() => {
              handleChangeSection(selectedUser?.id);
              closeModal();
            }}
          >
            Перевести
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Users;
