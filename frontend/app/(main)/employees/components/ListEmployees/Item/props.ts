import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { IGetUsersRes } from '@interface/contracts.types';

export interface EmployerItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: React.ReactNode;
  employee: IGetUsersRes;
}
