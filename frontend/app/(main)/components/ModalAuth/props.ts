import { Session } from '@interface/index';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface ModalAuthProps
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
  > {
  session?: Session | null;
  loading: boolean;
}
