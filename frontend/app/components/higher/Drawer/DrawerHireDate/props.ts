import { User, Employee, Roles } from '@prisma/client';

export interface Props {
  userId: User['id'];
  roles?: Roles[];
  employeeId?: Employee['id'];
  employeeIsHired?: Employee['isHired'];
  reload?: () => void;
}
