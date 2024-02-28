import { Paths } from '@/Components/App/Routing';
import { Anchor, Center, Container, Flex, Stack, Title } from '@mantine/core';

const NotFound = () => {
  return (
    <Center>
      <Container>
        <Flex align='center' direction={'column'} gap={20}>
          <Stack gap={0} mt={20} align='center'>
            <Title order={1}>Error 404</Title>
            <Title order={4}>Page Not Found</Title>
          </Stack>
          <Anchor href={Paths.Home}>Вернуться на главную страницу</Anchor>
        </Flex>
      </Container>
    </Center>
  );
};

export default NotFound;
