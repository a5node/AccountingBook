import { Work } from '@prisma/client';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: React.ReactNode;
  work: Work;
  remove: (id: number) => void;
}
