import { defineStyle } from '@chakra-ui/react';
/*** If link is active */
export const active = defineStyle({
  fontWeight: '600',
  color: 'blue.600',
  _dark: {
    color: 'orange.500',
  },
});

/*** If link is not active */
export const unactive = defineStyle({
  fontWeight: '600',
  color: 'black.700',

  _hover: {
    color: 'blue.500',
  },

  _dark: {
    color: 'orange.300',
    _hover: {
      color: 'orange.400',
    },
  },
});
