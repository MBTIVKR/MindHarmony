import { Loader } from '@mantine/core';
import { ElementType, Suspense } from 'react';

export const Loadable = (Component: ElementType) => (props: object) => {
  return (
    <Suspense fallback={<Loader variant="bars" />}>
      <Component {...props} />
    </Suspense>
  );
};