import { UseFormRegister } from 'react-hook-form';

export interface SelectMainAreasProps {
  register: UseFormRegister<any>;
  name: string;
  errors?: string;
  label: string;
  required?: boolean;
}
