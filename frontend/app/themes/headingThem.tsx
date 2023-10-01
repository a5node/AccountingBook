import { defineStyleConfig } from '@chakra-ui/react';

export const Heading = defineStyleConfig({
  baseStyle: {
    userSelect: 'none',
    color: 'black.600',
    _dark: {
      color: 'orange.300',
    },
  },
  variants: {},
});
