import { useEffect } from 'react';
import { Box, Button, Flex, Stack, Text, Title } from '@mantine/core';
import { questions } from './questions';
import { useMBTIStore } from '@/Store';

const MBTITest = () => {
  const {
    currentQuestion,
    result,
    showResult,
    handleAnswer,
    checkResult,
    answers,
  } = useMBTIStore();

  useEffect(() => {
    if (showResult) {
      checkResult();
      //? Сохранение результата в localStorage
      localStorage.setItem('mbtiResult', result);
    }
  }, [showResult, checkResult, result]);

  useEffect(() => {
    //? Сохранение ответов пользователя в localStorage при их изменении
    localStorage.setItem('mbtiAnswers', JSON.stringify(answers));
  }, [answers]);

  return (
    <Stack pt={40}>
      <Title>Тест MBTI</Title>
      {currentQuestion < questions.length && (
        <div>
          <Text className='question'>{questions[currentQuestion].text}</Text>
          <Flex mt={10}>
            <Box
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 10,
                textAlign: 'center',
              }}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant='default'
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
      )}
      {showResult && (
        <Box>
          <Title order={2}>Результаты теста</Title>
          {result ? (
            <p>Ваш тип личности: {result}</p>
          ) : (
            <p>Вычисление результата...</p>
          )}
        </Box>
      )}
    </Stack>
  );
};

export default MBTITest;
