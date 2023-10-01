import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { IGetUsersRes } from '@interface/contracts.types';

export interface UsersItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: React.ReactNode;
  person: IGetUsersRes;
}
