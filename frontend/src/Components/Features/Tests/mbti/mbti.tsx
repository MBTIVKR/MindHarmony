//@ts-nocheck
import { useEffect, useState } from "react";
import { Box, Button, Flex, Stack, Text, Title, Card } from "@mantine/core";
import { questions } from "./questions";
import { useAuth, useMBTIStore } from "@/Store";
import ProfileCard from "./ProfileCard";
import { OtherTestsSlider } from "../OtherTests/otherTests";
import { mbtiProfiles } from "./descriptions/mbtiProfiles";
import { $host } from "@/Services/instance";

const MBTITest = () => {
  const {
    currentQuestion,
    type,
    showResult,
    handleAnswer,
    checkResult,
    answers,
    setUserMBTIType,
  } = useMBTIStore();

  const userID = useAuth((state) => state.user.id);
  const [userMBTIType, setUserMBTITypeLocally] = useState(null);
  const lStoreMBTI = localStorage.getItem("mbtiResult");
  const [retry, setRetry] = useState(false);

  useEffect(() => {
    $host
      .get(`/api/mbti/${userID}`)
      .then((response) => {
        setUserMBTITypeLocally(response.data.type);
        localStorage.setItem("mbtiResult", response.data.type);
        setRetry(true);
        // console.log(response.data.type);
      })
      .catch((error) => {
        console.error("Failed to fetch MBTI results from server:", error);
        // localStorage.setItem("mbtiResult", "");
      });
  }, [userID]);

  useEffect(() => {
    if (userMBTIType) {
      setUserMBTIType(userMBTIType);
    }
  }, [userMBTIType, setUserMBTIType]);

  useEffect(() => {
    if (showResult) {
      checkResult();
      $host
        .post(`/api/update-mbti-result/${userID}`, { type })
        .then((response) => {
          console.log(
            "Results successfully sent to the server:",
            response.data
          );
        })
        .catch((error) => {
          console.error("Failed to send MBTI results to server:", error);
        });

      setUserMBTIType(type);
      localStorage.setItem("mbtiResult", type);
      setRetry(true);
    }
  }, [showResult, checkResult, type, setUserMBTIType, userID]);

  useEffect(() => {
    localStorage.setItem("mbtiAnswers", JSON.stringify(answers));
  }, [answers]);

  const currentProfile = mbtiProfiles.find((profile) =>
    profile.title.includes(type)
  );
  const store = mbtiProfiles.find((profile) =>
    profile.title.includes(lStoreMBTI)
  );

  const handleRetry = () => {
    setRetry(false);
  };

  return (
    <Stack pt={40}>
      <Title ta="center">Тест MBTI</Title>
      {!retry ? (
        <div>
          <Text className="question" ta="center" pb={20} size="lg">
            {questions[currentQuestion].text}
          </Text>
          <Flex mt={10} justify="center">
            <Box
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12,
                textAlign: "center",
                margin: "0 auto",
              }}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="default"
                  onClick={() =>
                    handleAnswer(questions[currentQuestion].id, index - 3)
                  }
                >
                  {option}
                </Button>
              ))}
            </Box>
          </Flex>
        </div>
      ) : (
        <Stack pb={120}>
          <ProfileCard profile={store} />
          <Button onClick={handleRetry}>Пройти заново</Button>

          <Card radius="md" p="lg" mb={100}>
            <Stack>
              <Title order={2}>Доступные тестирования</Title>
              <OtherTestsSlider excludeTest="Тестирование MBTI" />
            </Stack>
          </Card>
        </Stack>
      )}
    </Stack>
  );
};

export default MBTITest;