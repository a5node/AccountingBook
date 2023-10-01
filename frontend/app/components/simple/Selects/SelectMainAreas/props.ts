import { UseFormRegister } from 'react-hook-form';

export interface SelectMainAreasProps {
  register: UseFormRegister<any>;
  name: string;
  errors?: string;
  children?: React.ReactNode;
  reload?: boolean;
  required?: boolean;
  setReload?: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
}
