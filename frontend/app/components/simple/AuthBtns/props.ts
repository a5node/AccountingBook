import { ReactNode } from 'react';
import { AuthBtnStylesProps } from './styles';

export interface AuthBtnsProps
  extends Partial<Omit<AuthBtnStylesProps, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'>> {
  layout?: boolean;
  children?: ReactNode;
}
