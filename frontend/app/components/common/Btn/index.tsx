'use client';
import React from 'react';
import { Button } from '@chakra-ui/react';

import { BtnProps } from './props';

export const Btn: React.FC<BtnProps> = ({ children, onClick, ...props }): JSX.Element => {
  return (
    <Button
      variant={'baseBtn'}
      {...props}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        if (onClick) onClick(e);
      }}
    >
      {children}
    </Button>
  );
};
