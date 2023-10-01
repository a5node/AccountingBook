'use client';

import { useSessionContext } from '@app/contexts';
import { LocalState } from '@store/local';

type UseToken = Pick<LocalState, 'addToken'> & Pick<LocalState['data'], 'token'>;

export function useToken(): UseToken {
  const {
    local: { data, addToken },
  } = useSessionContext();

  return {
    token: data.token,
    addToken,
  };
}
