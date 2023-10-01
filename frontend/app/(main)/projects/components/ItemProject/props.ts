import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ItemProjectProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: React.ReactNode;
}
