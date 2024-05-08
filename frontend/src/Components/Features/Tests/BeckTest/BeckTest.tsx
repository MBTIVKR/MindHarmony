//@ts-nocheck
import { useState } from "react";
import { BeckQuestions as questions } from "./BeckQuestions";
import {
  Button,
  RadioGroup,
  Radio,
  Text,
  Container,
  Title,
  Box,
  Stack,
  Slider
} from "@mantine/core";
import { $authHost } from "@/Services/instance";
import { useAuth } from "@/Store";
import { OtherTestsSlider } from "../OtherTests/otherTests";
import BeckScale from "./Share/BeckScale";

const calculateDepressionLevel = (score) => {
  switch (true) {
    case (score <= 13):
      return { label: "Минимальная или отсутствующая депрессия", color: "green" };
    case (score <= 19):
      return { label: "Легкая депрессия", color: "yellow" };
    case (score <= 28):
      return { label: "Умеренная депрессия", color: "orange" };
    case (score >= 29):
      return { label: "Тяжелая депрессия", color: "red" };
    default:
      return { label: "Неопределенный уровень депрессии", color: "gray" };
  }
};

const getTotalScore = (answers) => {
  return Object.values(answers).reduce((total, current) => total + current, 0);
};

const BeckTest = () => {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [testResult, setTestResult] = useState(null);
  const [error, setError] = useState("");
  const userID = useAuth((state) => state.user.id);

  const handleSelect = (questionId: number, score: string) => {
    const scoreAsNumber = parseInt(score);
    setAnswers((prev) => ({
      ...prev,
      [questionId]: scoreAsNumber,
    }));
  };

  const allQuestionsAnswered = questions.length === Object.keys(answers).length;

const handleSubmit = async () => {
  if (!userID) {
    setError("Не удалось идентифицировать пользователя.");
    return;
  }

  if (!allQuestionsAnswered) {
    setError("Пожалуйста, ответьте на все вопросы перед отправкой теста.");
    return;
  }

  const totalScore = getTotalScore(answers);
  const depressionLevel = calculateDepressionLevel(totalScore);

  // Форматирование ответов для отправки
  const formattedAnswers = {};
  Object.keys(answers).forEach(questionId => {
    const question = questions.find(q => q.id === parseInt(questionId));
    const selectedOption = question.options.find(option => option.score === answers[questionId]);
    formattedAnswers[questionId] = {
      score: selectedOption.score,
      text: selectedOption.text,
    };
  });

  try {
    const response = await $authHost.post(`/api/beck-results/${userID}`, {
      userID,
      answers: formattedAnswers,
      totalScore,
    });
    console.log("Test submitted:", response.data);
    setTestResult({
      score: totalScore,
      level: depressionLevel.label,
      color: depressionLevel.color,
    });
    setError("");
  } catch (error) {
    console.error("Error submitting test:", error);
    setError("Не удалось отправить результаты теста. Пожалуйста, попробуйте снова.");
  }
};

  return (
    <Container size="sm" p="md">
      <Title order={2} style={{ textAlign: "center" }}>
        Тест Бека на депрессию
      </Title>
      {questions.map((question) => (
        <Box key={question.id} my="md">
          <Text>{question.text}</Text>
          <RadioGroup
            value={answers[question.id]?.toString()}
            onChange={(value) => handleSelect(question.id, value)}
            required
          >
            {question.options.map((option) => (
              <Radio
                key={option.score}
                value={option.score.toString()}
                label={option.text}
              />
            ))}
          </RadioGroup>
        </Box>
      ))}
      <Button onClick={handleSubmit} fullWidth mt="lg" mb={30} disabled={!allQuestionsAnswered}>
        Отправить ответы
      </Button>
      {testResult && (
        <>
          <Text>Последний результат: {testResult.score}</Text>
          <Text>Уровень депрессии: {testResult.level}</Text>
          <Slider
            value={testResult.score}
            min={0}
            max={42}
            label={testResult.level}
            marks={[
              { value: 13, label: '13' },
              { value: 19, label: '19' },
              { value: 28, label: '28' },
              { value: 29, label: '29' },
              { value: 63, label: '63' }
            ]}
            disabled
            styles={{
              bar: {
                backgroundColor: testResult.color,
              }
            }}
          />
        </>
      )}
      {error && <Text color="red">{error}</Text>}
      <Stack pt={40} pb={130}>
        <Title order={2}>Доступные тестирования</Title>
        <OtherTestsSlider excludeTest="Шкала депрессии Бека" />
      </Stack>
    </Container>
  );
};

export default BeckTest;
