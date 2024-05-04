import { useEffect, useState } from "react";
import {
  RingProgress,
  Text,
  Center,
  Stack,
  Badge,
  Flex,
  Card,
  Anchor,
  Group,
} from "@mantine/core";
import { useAuth } from "@/Store";
import { APP } from "@/Share/Variables";
import classes from "./TestsPassed.module.scss";
import { PathsDashboard } from "@/Components/App/Routing";
import { $host } from "@/Services/instance";

const TestsPassed = () => {
  const { user, isAuth } = useAuth();
  const [testStatus, setTestStatus] = useState({
    mbtiCompleted: false,
    stroopCompleted: false,
    smilCompleted: false,
  });

  useEffect(() => {
    if (isAuth && user && user.id) {
      $host.get(`/api/user/${user.id}/test-status`)
        .then((response) => {
          const data = response.data;
          setTestStatus({
            mbtiCompleted: data.mbtiCompleted,
            stroopCompleted: data.stroopCompleted,
            smilCompleted: data.smilCompleted,
          });
        })
        .catch((error) => {
          console.error("Ошибка получения данных о статусе тестов:", error);
        });
    }
  }, [user, isAuth]);

  const completedTests = Object.values(testStatus).filter(Boolean).length;
  const completionPercentage = Math.round(
    (completedTests / APP.Tests.TotalTests) * 100
  );

  return (
    <>
      <Card withBorder radius="md" className={classes.card} mt={20}>
        <Stack justify="space-between">
          <Flex justify="space-between" pb={10}>
            <Text className={classes.title} fw={800}>ТЕСТИРОВАНИЯ</Text>
            <Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }} href={PathsDashboard.Tests}>
              + 2 Тестирования
            </Anchor>
          </Flex>
          <Group>
            <Flex align="center" direction="row" gap={{ sm: "lg", base: "xl" }}>
              <Center w={{ sm: 120, base: 75 }}>
                <RingProgress
                  sections={[
                    {
                      value: completionPercentage,
                      color: completionPercentage === 100 ? "teal" : "blue",
                    },
                  ]}
                  label={
                    <Text
                      c={completionPercentage === 100 ? "teal" : "blue"}
                      fw={700}
                      ta="center"
                      size="lg"
                    >
                      {completionPercentage}%
                    </Text>
                  }
                />
              </Center>
              <Stack>
                <Text size="sm">Статус тестов:</Text>
                <Flex gap="xs" direction={{ base: "column", sm: "row" }}>
                  <Badge color={testStatus.mbtiCompleted ? "green" : "red"}>
                    {testStatus.mbtiCompleted
                      ? "MBTI: Пройден"
                      : "MBTI: Не пройден"}
                  </Badge>
                  <Badge color={testStatus.stroopCompleted ? "green" : "red"}>
                    {testStatus.stroopCompleted
                      ? "Тест Струпа: Пройден"
                      : "Тест Струпа: Не пройден"}
                  </Badge>
                  <Badge color={testStatus.smilCompleted ? "green" : "red"}>
                    {testStatus.smilCompleted
                      ? "СИМЛ: Пройден"
                      : "СИМЛ: Не пройден"}
                  </Badge>
                </Flex>
              </Stack>
            </Flex>
          </Group>
        </Stack>
      </Card>
    </>
  );
};

export default TestsPassed;
