import { UseFormRegister } from 'react-hook-form';

export interface SelectRolesProps {
  register: UseFormRegister<any>;
  name: string;
  errors?: string;
  children?: React.ReactNode;
  required?: boolean;
  reload?: boolean;
  setReload?: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
}
