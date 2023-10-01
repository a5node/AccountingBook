import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { BtnStylesProps } from './styles';

export type Btn = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
>;

export interface BtnProps
  extends Partial<Omit<BtnStylesProps, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'>> {
  children: ReactNode;
}
