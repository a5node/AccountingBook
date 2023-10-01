import { ResponsiveValue } from '@chakra-ui/react';
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface LoadingProps
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
  > {
  children?: ReactNode;
  loading: boolean;
  zIndex?: ResponsiveValue<
    | 'banner'
    | 'tooltip'
    | 'base'
    | 'overlay'
    | 'hide'
    | 'docked'
    | 'dropdown'
    | 'sticky'
    | 'modal'
    | 'popover'
    | 'skipLink'
    | 'toast'
    | number
  >;
}
