//@ts-nocheck
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Group,
  useMantineTheme,
  Anchor,
} from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./ActionsGrid.module.scss";
import { links } from "./ActionLinks";
import { AdminPaths } from "../App/Routing";

const ActionsGrid = () => {
  const [userRole, setUserRole] = useState(null);
  const theme = useMantineTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded?.Auth?.role);
    }
  }, []);

  const items = links
    .filter(
      (item) => !item.adminOnly || (item.adminOnly && userRole === "admin")
    )
    .map((item) => {
      const Icon = item.icon;
      return (
        <Link to={item.url} key={item.title} className={classes.item}>
          <UnstyledButton key={item.title} className={classes.item}>
            <Icon color={theme.colors[item.color][6]} size="2rem" />
            <Text size="md" mt={7}>
              {item.title}
            </Text>
          </UnstyledButton>
        </Link>
      );
    });

  return (
    <Card
      withBorder
      radius="md"
      className={classes.card}
      mt={20}
      // mb={{ base: 120, sm: 0 }}
    >
      <Group justify="space-between">
        <Text className={classes.title}>СЕРВИСЫ</Text>
        {userRole === "admin" && (
          <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }} href={AdminPaths.Panel}>
            Панель администратора
          </Anchor>
        )}
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
};

export default ActionsGrid;
