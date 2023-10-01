import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: React.ReactNode;
  hired: Date;
  fired: Date | null;
  commit: string | null;
}
