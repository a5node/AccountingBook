import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ItemEmployerProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: React.ReactNode;
}
