'use client';

import { Flex } from '@chakra-ui/react';
import { Btn, H } from './components';
import { useRouter } from 'next/navigation';

export default function Error({ error, reset }: { error: Error; reset: () => void }): React.JSX.Element {
  const message = error.message;
  const router = useRouter();
  return (
    <Flex flexDirection={'column'} width={'full'} height={'full'} gap={'2rem'}>
      <H as="h3" size={'2rem'}>
        Error
      </H>
      <H as={'p'} style={{ width: '700px' }}>
        {message}
      </H>
      <Flex flexDirection={'row'} width={'full'} gap={'2rem'}>
        <Btn type="reset" onClick={(): void => reset()}>
          Reset
        </Btn>
        <Btn type="reset" onClick={(): void => router.push('/')}>
          Main page
        </Btn>
      </Flex>
    </Flex>
  );
}
