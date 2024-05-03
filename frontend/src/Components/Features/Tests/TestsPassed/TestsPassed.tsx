import React, { useEffect, useState } from "react";
import {
  RingProgress,
  Text,
  Center,
  Title,
  Paper,
  Stack,
  Badge,
  Flex,
} from "@mantine/core";
import { useAuth } from "@/Store";
import { APP } from "@/Share/Variables";

const TestsPassed = () => {
  const { user, isAuth } = useAuth();
  const [testStatus, setTestStatus] = useState({
    mbtiCompleted: false,
    stroopCompleted: false,
    smilCompleted: false,
  });

  useEffect(() => {
    if (isAuth && user && user.id) {
      fetch(`/api/user/${user.id}/test-status`)
        .then((response) => response.json())
        .then((data) => {
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
      <Title order={1} pt={20} pb={20}>
        Пройденные тесты
      </Title>
      <Paper withBorder shadow="md" p="md" radius="md">
        <Flex align="center" direction="row" gap={{sm: "lg", base: 'xl'}}>
          <Center w={{sm: 120, base: 75}}>
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
            <Flex gap="xs" direction={{base: 'column', sm: 'row'}}>
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
      </Paper>
    </>
  );
};

export default TestsPassed;
