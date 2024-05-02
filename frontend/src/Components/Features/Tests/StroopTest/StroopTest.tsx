import { useState, useEffect } from "react";
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

const StroopTest = () => {
  const [test, setTest] = useState(randomizeTest());
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds timer

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleAnswer = (color) => {
    if (timeLeft <= 0) return; // Do not handle answer if time is up

    if (color === test.color) {
      setScore({ ...score, correct: score.correct + 1 });
    } else {
      setScore({ ...score, incorrect: score.incorrect + 1 });
    }
    setTest(randomizeTest());
  };

  return (
    <Container>
      <Stack pt={40}>
        <Title>Тест Струпа</Title>
        <Text size="sm">
          Инструкция: Нажмите на кнопку, цвет которой соответствует цвету текста
          слова, а не значению слова. Пример: если слово "СИНИЙ" написано
          красным цветом, нажмите кнопку "Красный". Вы должны ответить на
          максимальное количество вопросов за 30 секунд.
        </Text>
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
      </Stack>

      <Stack pt={20}>
        <Box>
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
            <Text>Ответить на максимальное количество вопросов правильно за
        отведённое время.</Text>
        </Box>
      </Stack>
    </Container>
  );
};

export default StroopTest;
