import { IconButtonProps } from '@chakra-ui/react';

export interface BtnIconProps
  extends Partial<Omit<IconButtonProps, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'>> {
  'aria-label': string;
}
