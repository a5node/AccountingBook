import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TFindAccountingByUserQueryRes } from '@interface/contracts.types';

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: React.ReactNode;
  currencies: TFindAccountingByUserQueryRes['currencies'];
}
