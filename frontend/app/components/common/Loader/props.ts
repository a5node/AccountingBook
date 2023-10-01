import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface LoaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}
