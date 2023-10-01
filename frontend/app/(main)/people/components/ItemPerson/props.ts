import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ItemPersonProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: React.ReactNode;
}
