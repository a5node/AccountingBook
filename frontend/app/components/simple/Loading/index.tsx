'use client';
import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';

import { LoadingProps } from './props';
import { Loader } from '@app/components';

export const Loading: React.FC<LoadingProps> = ({ children, loading }): JSX.Element => {
  const [state, setState] = useState<boolean>(true);

  useEffect(() => {
    if (loading) setState(true);
    else setState(false);
  }, [loading]);

  return (
    <>
      {state && (
        <Flex
          zIndex={1}
          bgColor={'#000000'}
          width={'full'}
          height={'full'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={'1rem'}
          position={'fixed'}
          top={0}
          left={0}
        >
          <Loader size={'lg'} />
          {children}
        </Flex>
      )}
    </>
  );
};
