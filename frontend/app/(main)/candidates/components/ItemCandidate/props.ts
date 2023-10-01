import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ItemCandidateProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: React.ReactNode;
}
