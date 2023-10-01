'use client';
import React from 'react';
import { IconButton } from '@chakra-ui/react';

import { BtnIconProps } from './props';

export const BtnIcon: React.FC<BtnIconProps> = ({ children, onClick, ...props }): JSX.Element => {
  return (
    <IconButton
      variant={'baseBtn'}
      {...props}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        if (onClick) onClick(e);
      }}
    >
      {children}
    </IconButton>
  );
};
