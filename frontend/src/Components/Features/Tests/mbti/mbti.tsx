//@ts-nocheck
import { useEffect } from 'react';
import { Box, Button, Flex, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { questions } from './questions';
import { useAuth, useMBTIStore } from '@/Store';
import { $host } from '@/Services/instance'; // Убедитесь, что $host импортирован правильно

const MBTITest = () => {
  const userID = useAuth((state) => state.user.id);
  const theme = useMantineTheme();
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
  
      // Отправка результата на сервер с использованием Axios
      $host.post(`/api/update-mbti-result/${userID}`, { type })
        .then(response => {
          if (response.status === 200) {
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
  }, [showResult, checkResult, type, userID]);

  useEffect(() => {
    // Сохранение ответов пользователя в localStorage при их изменении
    localStorage.setItem('mbtiAnswers', JSON.stringify(answers));
  }, [answers]);

  return (
    <Stack pt={40}>
      <Title ta="center">Тест MBTI</Title>
      {currentQuestion < questions.length && (
        <div>
          <Text className='question' ta="center" pb={20} size='lg'>{questions[currentQuestion].text}</Text>
          <Flex mt={10} justify='center'>
            <Box
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 12,
                textAlign: 'center',
                margin: '0px auto',
                justifyContent: 'center'
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
          <Text size="lg" style={{ marginTop: theme.spacing.sm }}>
            Ваш тип личности: {type ? type : "Вычисление результата..."}
          </Text>
        </Box>
      )}
    </Stack>
  );
};

export default MBTITest;
