import { Project, Work, Employee, HireDate, PaymentEmployee, Expenditure, Bank } from '@prisma/client';

export interface Props {
  text?: string;
  project?: (Project & { workers: Work[] }) | null;
  employee?:
    | (Employee & {
        payment?: PaymentEmployee | null;
        hireDates?: HireDate[];
        expenditure?: Expenditure[];
        banks?: Bank[];
        works?: Work[];
      })
    | null;
}
