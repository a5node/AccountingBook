'use client';
import { useCallback, useState } from 'react';

import { TCreateMainAreaCommandReq, TCreateMainAreaCommandRes, ReqError } from '@interface/contracts.types';

export const useCreateMainArea = (): {
  data: TCreateMainAreaCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  create: (req: TCreateMainAreaCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TCreateMainAreaCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const create = useCallback(
    async (req: TCreateMainAreaCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.mainArea?.create(req);
          if ('name' in res) setData(res);
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
    setData(null);
    setError(null);
  }, [data, error]);

  return { data, error, isLoading, create, reset };
};
