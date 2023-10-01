import { Work } from '@prisma/client';
import { UseFormRegister } from 'react-hook-form';

export interface SelectEmployeesProps {
  register: UseFormRegister<any>;
  name: string;
  errors?: string;
  children?: React.ReactNode;
  works?: Work[];
  required?: boolean;
  label?: string;
}
