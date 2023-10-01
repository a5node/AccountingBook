import type { User } from '@prisma/client';

type RowUser = keyof Omit<User, 'id'>;

export interface UserRowUpdateProps {
  children?: React.ReactNode;
  id: User['id'];
  label: string;
  rowName: RowUser;
}
