import { FC } from 'react';
import { Box, Title, Flex } from '@mantine/core';
import TestCard from '@/Components/Features/Tests/UI/TestCard/TestCard';
import { TestsData } from './Tests/data';

const TestsPage: FC = () => {
  return (
    <Box pb={100}>
      <Title order={1} pt={20} pb={20}>
        Каталог тестов
      </Title>
      <Flex gap={20} pb={20} direction='column' justify='center'>
        {Object.keys(TestsData).map((testKey) => {
          //@ts-ignore
          const test = TestsData[testKey];
          return (
            <TestCard
              key={testKey}
              title={test.title}
              description={test.description}
              bannerSrc={test.bannerSrc}
              buttonText={test.buttonText}
              to={test.to}
              disabled={test.disabled}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export default TestsPage;
