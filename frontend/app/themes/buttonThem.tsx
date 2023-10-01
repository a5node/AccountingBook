import { defineStyleConfig } from '@chakra-ui/react';

import { baseBtn } from '@app/components/common/Btn/styles';
import { authBtn } from '@app/components/simple/AuthBtns/styles';

// https://getcssscan.com/css-buttons-examples
export const Button = defineStyleConfig({
  baseStyle: {
    textTransform: 'uppercase',

    color: 'black.600',
    _hover: {
      color: 'blue.500',
    },

    _dark: {
      color: 'orange.300',
      _hover: {
        color: 'orange.400',
      },
    },
  },
  variants: { authBtn, baseBtn },
});
