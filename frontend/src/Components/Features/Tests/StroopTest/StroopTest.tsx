//@ts-nocheck
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Stack,
  Title,
  Button,
  Text,
  Group,
  Container,
  Paper,
  Box,
} from "@mantine/core";

const colors = ["red", "blue", "green", "yellow"];
const words = ["КРАСНЫЙ", "СИНИЙ", "ЗЕЛЕНЫЙ", "ЖЕЛТЫЙ"];

const randomizeTest = () => {
  const word = words[Math.floor(Math.random() * words.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return { word, color };
};

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decoded = jwtDecode(token);
    return decoded?.id;
  }
  return null;
};

const StroopTest = () => {
  const [userId, setUserId] = useState(getUserIdFromToken());
  const [test, setTest] = useState(randomizeTest());
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [timeLeft, setTimeLeft] = useState(null);
  const [testStarted, setTestStarted] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  useEffect(() => {
    let timer;
    if (testStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      sendResultsToServer();
      setTestStarted(false);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, testStarted]);

  const fetchResults = async () => {
    try {
      const response = await fetch(`/api/stroop-results/${userId}`);
      const data = await response.json();
      if (response.ok && data.length > 0) {
        setResults(data);
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const handleAnswer = (color) => {
    if (!testStarted || timeLeft <= 0) return;

    if (color === test.color) {
      setScore((prevScore) => ({
        ...prevScore,
        correct: prevScore.correct + 1,
      }));
    } else {
      setScore((prevScore) => ({
        ...prevScore,
        incorrect: prevScore.incorrect + 1,
      }));
    }
    setTest(randomizeTest());
  };

  const startTest = () => {
    setTestStarted(true);
    setTimeLeft(30);
    setScore({ correct: 0, incorrect: 0 });
    setTest(randomizeTest());
  };

  const sendResultsToServer = async () => {
    if (!userId) {
      console.error("Invalid user ID");
      return;
    }
    const resultData = {
      userId,
      correct: score.correct,
      incorrect: score.incorrect,
    };

    try {
      const response = await fetch("/api/stroop-results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resultData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Тестирование Струпа пройдено:", data);
        localStorage.setItem("token", data.token); // Update the token in localStorage
        setUserId(getUserIdFromToken()); // Refresh userId from the new token if needed
        fetchResults(); // Optionally refresh results from server
      } else {
        throw new Error(data.error || "Failed to save test result");
      }
    } catch (error) {
      console.error("Failed to save test result:", error.message);
    }
  };

  return (
    <Container>
      <Stack pt={40}>
        <Title>Тест Струпа</Title>
        <Text size="sm">
          Инструкция: Нажмите на кнопку, цвет которой соответствует цвету текста
          слова, а не значению слова.
        </Text>
        {results ? (
          <>
            <Text>
              Ваш последний результат: Правильных ответов: {results[0].correct},
              Неправильных ответов: {results[0].incorrect}
            </Text>
            <Button onClick={startTest} color="green">
              Пройти тест заново
            </Button>
          </>
        ) : (
          <Button onClick={startTest} color="green">
            Начать тестирование
          </Button>
        )}
        {testStarted && (
          <Paper withBorder shadow="md" p="md" radius="md">
            <Text ta="center" style={{ color: test.color, fontSize: 24 }}>
              {test.word}
            </Text>
            <Group justify="center" mt={20}>
              {colors.map((color) => (
                <Button
                  key={color}
                  style={{ backgroundColor: color }}
                  onClick={() => handleAnswer(color)}
                >
                  {color}
                </Button>
              ))}
            </Group>
            <Text>Правильных ответов: {score.correct}</Text>
            <Text>Неправильных ответов: {score.incorrect}</Text>
            <Text>Оставшееся время: {timeLeft} секунд</Text>
          </Paper>
        )}

        <Box>
        <Title order={3} pb={10} pt={10}>Рекомендации</Title>
          <Text fw="bold">Условия: </Text>
          <Text>
            Тест следует проходить в тихой обстановке, чтобы минимизировать
            отвлекающие факторы.
          </Text>
        </Box>
        <Box>
          <Text fw="bold">Время на прохождение:</Text>
          <Text size="sm">
            {" "}
            Тест ограничен 30 секундами, что стимулирует быструю реакцию и
            способность к концентрации.
          </Text>
        </Box>
        <Box>
          <Text fw="bold">Цель:</Text>
          <Text>
            Ответить на максимальное количество вопросов правильно за отведённое
            время.
          </Text>
        </Box>
      </Stack>
    </Container>
  );
};

export default StroopTest;
