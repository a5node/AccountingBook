import { ButtonProps, defineStyle } from '@chakra-ui/react';

import { btnBaseStyles, btnBaseLightStyles, btnBaseDarkStyles } from '@app/components/styles';

export const baseBtn: ButtonProps = defineStyle({
  ...btnBaseStyles,
  ...btnBaseLightStyles,
  _active: {
    //
    ...btnBaseLightStyles._active,
    boxShadow: '#D6D6E7 0 3px 7px inset',
  },
  _hover: {
    ...btnBaseLightStyles._hover,
    boxShadow: 'rgba(45, 35, 66, 0.4) 0 4px 8px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset',
  },

  // dark them
  _dark: {
    ...btnBaseDarkStyles,
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
    },
  },
});

export type BtnStylesProps = typeof baseBtn;
