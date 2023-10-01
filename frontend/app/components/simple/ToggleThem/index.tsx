'use client';
import React from 'react';
import { useColorMode } from '@chakra-ui/react';
import { BiMoon, BiSun } from 'react-icons/bi';

import { Btn } from '@app/components';

export const ToggleThem: React.FC = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Btn
      as={'button'}
      onClick={toggleColorMode}
      paddingLeft={'5px'}
      paddingRight={'5px'}
      textTransform="capitalize"
      rightIcon={colorMode === 'light' ? <BiMoon /> : <BiSun />}
    >
      {colorMode === 'light' ? 'dark' : 'light'}
    </Btn>
  );
};
