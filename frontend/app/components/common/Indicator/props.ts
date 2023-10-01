import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IndicatorProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
  text?: boolean;
  color?: 'red' | 'green';
  greenIcon?: boolean;
  redIcon?: boolean;
  yellowIcon?: boolean;
  loading?: boolean;
  loadingItem?: boolean;
}
