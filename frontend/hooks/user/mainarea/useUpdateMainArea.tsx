'use client';
import { useCallback, useState } from 'react';

import { TUpdateMainAreaCommandReq, TUpdateMainAreaCommandRes, ReqError } from '@interface/contracts.types';

export const useUpdateMainArea = (): {
  data: TUpdateMainAreaCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  update: (req: TUpdateMainAreaCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TUpdateMainAreaCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const update = useCallback(
    async (req: TUpdateMainAreaCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.mainArea?.update(req);
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

  return { data, error, isLoading, update, reset };
};
