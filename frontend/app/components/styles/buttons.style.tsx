'use client';
import { ButtonProps, defineStyle } from '@chakra-ui/react';

export const btnBaseStyles: ButtonProps = defineStyle({
  appearance: 'none',
  cursor: 'pointer',
  overflow: 'hidden',
  userSelect: 'none',
  boxSize: 'border-box',
  transition: 'box-shadow .15s,transform .15s',
  touchAction: 'manipulation',
  whiteSpace: 'nowrap',
  willChange: 'box-shadow,transform',
  borderRadius: '4px',
  borderWidth: '0',
  fontFamily: 'font-family: "JetBrains Mono",monospace',
  fontSize: '1rem',
  lineHeight: '1',
  listStyle: 'none',
  textAlign: 'left',
  textDecor: 'none',
  height: '2rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  display: 'inline-flex',
  position: 'relative',
  alignItems: 'center',

  _active: {
    transform: 'translateY(2px)',
  },

  _hover: {
    transform: 'translateY(-2px)',
  },
});

export const btnBaseLightStyles: ButtonProps = defineStyle({
  color: 'black.700',
  bgColor: '#FCFCFD',
  boxShadow: 'rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset',
  _active: {
    ...btnBaseStyles._active,
    boxShadow: '#D6D6E7 0 3px 7px inset',
  },

  _hover: {
    ...btnBaseStyles._hover,
    color: 'blue.600',
    boxShadow: 'rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset',
  },
});

export const btnBaseDarkStyles: ButtonProps = defineStyle({
  color: 'orange.300',
  bgColor: 'rgba(160, 160, 182, 0.3)',

  boxShadow:
    'rgba(207, 164, 111, 0.4) 0 2px 4px,rgba(207, 164, 111, 0.3) 0 7px 13px -3px, rgba(223, 178, 31, 0.7) 0 -3px 0 inset',

  _active: {
    ...btnBaseStyles._active,
    boxShadow: 'rgb(223, 178, 31) 0 3px 7px inset',
  },

  _hover: {
    ...btnBaseStyles._hover,
    color: 'orange.400',
    boxShadow:
      'rgba(207, 164, 111, 0.4) 0 4px 8px, rgba(207, 164, 111, 0.3) 0 7px 13px -3px, rgba(223, 178, 31, 0.7) 0 -3px 0 inset',
  },
});
