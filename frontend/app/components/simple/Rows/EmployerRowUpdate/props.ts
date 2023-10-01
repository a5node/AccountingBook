import type { User, Employee } from '@prisma/client';

type RowEmployee = keyof Omit<Employee, 'id' | 'userId'>;

export interface EmployeeRowUpdateProps {
  children?: React.ReactNode;
  id: User['id'];
  label: string;
  rowName: RowEmployee;
  select?: boolean;
}
