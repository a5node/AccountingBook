import { TGetUserHireDatesQueryRes } from '@interface/contracts.types';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: React.ReactNode;
  hireDates?: TGetUserHireDatesQueryRes['hireDates'];
}
