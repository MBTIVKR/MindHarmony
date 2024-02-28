import { Center, Loader } from '@mantine/core';
import { ElementType, Suspense } from 'react';

export const Loadable = (Component: ElementType) => (props: object) => {
  return (
    <Suspense
      fallback={
        <Center h={100}>
          <Loader color='blue' type='dots' />
        </Center>
      }
    >
      <Component {...props} />
    </Suspense>
  );
};
