import { defineStyleConfig } from '@chakra-ui/react';

import { active, unactive } from '@app/components/common/ActiveLink/styles';

export const Link = defineStyleConfig({
  baseStyle: {
    fontFamily: 'serif',
    fontWeight: 'normal',
    textTransform: 'uppercase',
    borderRadius: '1px',
    lineHeights: 'shorter',
  },
  variants: { active, unactive },
});
