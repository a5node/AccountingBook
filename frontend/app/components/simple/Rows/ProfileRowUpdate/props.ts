import type { Profile, User } from '@prisma/client';

type RowProfile = keyof Omit<Profile, 'id' | 'userId'>;

export interface ProfileRowUpdateProps {
  children?: React.ReactNode;
  id: User['id'];
  label: string;
  rowName: RowProfile;
}
