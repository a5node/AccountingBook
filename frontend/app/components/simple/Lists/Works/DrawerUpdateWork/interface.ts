import { Positions, Work } from '@prisma/client';

export interface DrawerUpdateWorkPropsForm {
  hours?: Work['hours'];
  rate?: Work['rate'];
  isWork?: 'yes' | 'no';
  start?: Work['start'];
  end?: Work['end'];
  positionName?: Work['positionName'];
  position?: Positions['name'];
}
