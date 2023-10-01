import { ButtonProps, defineStyle } from '@chakra-ui/react';

import { btnBaseStyles, btnBaseLightStyles, btnBaseDarkStyles } from '@app/components/styles';

export const authBtn: ButtonProps = defineStyle({
  ...btnBaseStyles,
  ...btnBaseLightStyles,

  color: 'black.600',
  bgColor: '#FCFCFD',
  boxShadow: 'rgba(45, 35, 66, 0.4) 0 2px 4px,rgba(45, 35, 66, 0.3) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset',

  fontWeight: '700',
  paddingLeft: '.5rem',
  paddingRight: '.5rem',

  _active: {
    //
    ...btnBaseLightStyles._active,
    boxShadow: '#D6D6E7 0 3px 7px inset',
  },

  _hover: {
    ...btnBaseLightStyles._hover,
    boxShadow: 'rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset',
    color: 'blue.500',
  },

  _dark: {
    ...btnBaseDarkStyles,
    color: 'orange.300',
    bgColor: 'rgba(160, 160, 182, 0.3)',

    boxShadow:
      'rgba(207, 164, 111, 0.4) 0 2px 4px,rgba(207, 164, 111, 0.3) 0 7px 13px -3px, rgba(223, 178, 31, 0.7) 0 -3px 0 inset',

    _active: {
      ...btnBaseDarkStyles._active,
      boxShadow: 'rgb(223, 178, 31) 0 3px 7px inset',
    },

    _hover: {
      ...btnBaseDarkStyles._hover,
      boxShadow:
        'rgba(207, 164, 111, 0.4) 0 4px 8px, rgba(207, 164, 111, 0.3) 0 7px 13px -3px, rgba(223, 178, 31, 0.7) 0 -3px 0 inset',
      color: 'orange.400',
    },
  },
});

export type AuthBtnStylesProps = typeof authBtn;
