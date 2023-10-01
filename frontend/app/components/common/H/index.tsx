'use client';

import { Heading } from '@chakra-ui/react';
import { HProps } from './props';

export const H: React.FC<HProps> = ({ children, ...props }): JSX.Element => {
  return (
    <>
      <Heading {...props} userSelect={'none'} _dark={{ color: 'orange.300' }}>
        {children}
      </Heading>
    </>
  );
};
