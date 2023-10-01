import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface LoaderIndicatorProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}
