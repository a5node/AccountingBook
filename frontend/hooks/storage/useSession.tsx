'use client';

import { useSessionContext } from '@app/contexts';
import { SessionStore } from '@store/session';

export function useSession(): Partial<SessionStore> {
  const { session } = useSessionContext();
  return {
    sessionToken: session?.sessionToken,
    accessToken: session?.accessToken,
    refreshToken: session?.refreshToken,
    user: {
      id: session?.user.id,
      name: session?.user.name,
      email: session?.user.email,
      password: session?.user.password,
      roles: session?.user.roles,
    },
  };
}
