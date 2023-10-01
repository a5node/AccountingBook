import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { IGetUsersRes } from '@interface/contracts.types';

export interface CandidateItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: React.ReactNode;
  candidate: IGetUsersRes;
}
