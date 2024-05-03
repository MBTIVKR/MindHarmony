import { useEffect, useState } from 'react';
import { RingProgress, Text, Center } from '@mantine/core';

//@ts-ignore
const TestRing = ({ userId }) => {
  const [completedTests, setCompletedTests] = useState(0);
  const totalTests = 3;

  useEffect(() => {
    fetch(`/api/user/${userId}/test-status`)
      .then(response => response.json())
      .then(data => {
        let count = 0;
        if (data.mbtiCompleted) count++;
        if (data.stroopCompleted) count++;
        //if (data.smilCompleted) count++;
        setCompletedTests(count);
      })
      .catch(error => {
        console.error('Ошибка получения данных о статусе тестов:', error);
      });
  }, [userId]);

  const completionPercentage = Math.round((completedTests / totalTests) * 100);

  return (
    <Center style={{ width: 200, height: 200 }}>
      <RingProgress
        sections={[{ value: completionPercentage, color: completionPercentage === 100 ? 'teal' : 'blue' }]}
        label={
          <Text color={completionPercentage === 100 ? 'teal' : 'blue'} fw={700} ta="center" size="xl">
            {completionPercentage}%
          </Text>
        }
      />
    </Center>
  );
};

export default TestRing;
