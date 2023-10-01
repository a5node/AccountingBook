import { Session } from '@interface/index';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ConnecterProps
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
  > {
  children?: ReactNode;
  session?: Session | null;
}
