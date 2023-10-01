import { Expenditure } from '@prisma/client';

export interface Props {
  employeeId?: Expenditure['employeeId'];
  accountingId?: Expenditure['accountingId'];
  projectId?: Expenditure['projectId'];
}
