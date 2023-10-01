'use client';
import { useCallback, useState } from 'react';

import { TDeleteMainAreaCommandReq, TDeleteMainAreaCommandRes, ReqError } from '@interface/contracts.types';

export const useRemoveMainArea = (): {
  data: TDeleteMainAreaCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  remove: (req: TDeleteMainAreaCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setPosition] = useState<TDeleteMainAreaCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const remove = useCallback(
    async (req: TDeleteMainAreaCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.mainArea.delete(req);
          if ('name' in res) setPosition(res);
          else setError(res);
        }
      } catch (error) {
        setError(new Error('Something went wrong!'));
      }
      setIsLoading(false);
    },
    [data, isLoading, error],
  );

  const reset = useCallback((): void => {
    setPosition(null);
    setError(null);
  }, [data, error]);

  return { data, error, isLoading, remove, reset };
};
