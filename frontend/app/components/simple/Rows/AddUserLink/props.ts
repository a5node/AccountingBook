import type { User } from '@prisma/client';

export interface Props {
  children?: React.ReactNode;
  id: User['id'];
}
