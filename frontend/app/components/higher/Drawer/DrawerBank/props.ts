import { Employee } from '@prisma/client';

export interface Props {
  employeeId?: Employee['id'];
}
