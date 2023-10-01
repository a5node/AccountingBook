import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { TFindProjectsQueryRes } from '@interface/contracts.types';

export interface ProjectsItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  children?: React.ReactNode;
  project: TFindProjectsQueryRes;
}
