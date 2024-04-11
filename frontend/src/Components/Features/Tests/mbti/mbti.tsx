import { useEffect } from 'react';
import { Box, Button, Flex, Stack, Text, Title } from '@mantine/core';
import { questions } from './questions';
import { useAuth, useMBTIStore } from '@/Store';

const MBTITest = () => {
  const userID = useAuth((state) => state.user.id);
  const {
    currentQuestion,
    type,
    showResult,
    handleAnswer,
    checkResult,
    answers,
  } = useMBTIStore();

  useEffect(() => {
    if (showResult) {
      checkResult();
  
      // Отправка результата на сервер
      fetch(`/api/update-mbti-result/${userID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      })
        .then(response => {
          if (response.ok) {
            console.log('Результат успешно отправлен на сервер');
          } else {
            console.error('Ошибка при отправке результата на сервер');
          }
        })
        .catch(error => {
          console.error('Ошибка при отправке результата на сервер:', error);
        });
  
      // Сохранение результата в localStorage
      localStorage.setItem('mbtiResult', type);
    }
  }, [showResult, checkResult, type]);
  

  useEffect(() => {
    // Сохранение ответов пользователя в localStorage при их изменении
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
          {type ? (
            <p>Ваш тип личности: {type}</p>
          ) : (
            <p>Вычисление результата...</p>
          )}
        </Box>
      )}
    </Stack>
  );
};

export default MBTITest;
