import { UseFormRegister } from 'react-hook-form';

export interface SelectCurrenciesProps {
  register: UseFormRegister<any>;
  name: string;
  errors?: string;
  children?: React.ReactNode;
  required?: boolean;
}
