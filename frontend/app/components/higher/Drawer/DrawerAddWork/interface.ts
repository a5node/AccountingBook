import { Positions, Work } from '@prisma/client';

export interface WorkForm {
  hours: Work['hours'];
  rate: Work['rate'];
  isWork: 'yes' | 'no';
  start: Work['start'];
  positionName: Work['positionName'];
  position: Positions['name'];
  projectSelect?: string;
  employeeSelect?: string;
}
