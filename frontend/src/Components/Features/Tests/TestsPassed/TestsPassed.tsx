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
import { PathsDashboard, TestsPaths } from "@/Components/App/Routing";
import { $host } from "@/Services/instance";
import { Link } from "react-router-dom";

const TestsPassed = () => {
  const { user, isAuth } = useAuth();
  const [testStatus, setTestStatus] = useState({
    mbtiCompleted: false,
    stroopCompleted: false,
    smilCompleted: false,
    beckCompleted: false,
  });

  useEffect(() => {
    if (isAuth && user && user.id) {
      $host
        .get(`/api/user/${user.id}/test-status`)
        .then((response) => {
          const data = response.data;
          setTestStatus({
            mbtiCompleted: data.mbtiCompleted,
            stroopCompleted: data.stroopCompleted,
            smilCompleted: data.smilCompleted,
            beckCompleted: data.beckCompleted,
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

  const badges = [
    { title: "MBTI", completed: testStatus.mbtiCompleted, url: TestsPaths.MBTI },
    { title: "Тест Струпа", completed: testStatus.stroopCompleted, url: TestsPaths.STROOP },
    { title: "СИМЛ", completed: testStatus.smilCompleted, url: TestsPaths.SMIL },
    { title: "Тест Бека", completed: testStatus.beckCompleted, url: TestsPaths.BECK },
  ];

  return (
    <>
      <Card withBorder radius="md" className={classes.card} mt={20}>
        <Stack justify="space-between">
          <Flex justify="space-between" pb={10}>
            <Text className={classes.title} fw={800}>
              ТЕСТИРОВАНИЯ
            </Text>
            <Anchor
              size="xs"
              c="dimmed"
              style={{ lineHeight: 1 }}
              href={PathsDashboard.Tests}
            >
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
                <Flex
                  gap="xs"
                  direction={{ base: "column", sm: "row" }}
                  wrap="wrap"
                >
                  {badges.map(({ title, completed, url }) => (
                    <Link to={url}>
                      <Badge key={title} color={completed ? "green" : "red"}>
                        {completed
                          ? `${title}: Пройден`
                          : `${title}: Не пройден`}
                      </Badge>
                    </Link>
                  ))}
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
