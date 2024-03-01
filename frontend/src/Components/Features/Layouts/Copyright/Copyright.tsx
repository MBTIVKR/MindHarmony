import { Box, Flex, Space } from '@mantine/core';
import { APP } from '@/Share/Variables';
import { NowYear } from '@Components/App/Routing';

const Copyright = () => {
  return (
    <Flex align='center' justify='center'>
      <Box>&copy; {APP.FULLNAME}</Box>
      <Space w={3} />
      <NowYear />
    </Flex>
  );
};

export default Copyright;
