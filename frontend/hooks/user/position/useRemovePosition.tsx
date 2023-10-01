'use client';
import { useCallback, useState } from 'react';

import { TDeletePositionCommandReq, TDeletePositionCommandRes, ReqError } from '@interface/contracts.types';

export const useRemovePosition = (): {
  data: TDeletePositionCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  remove: (req: TDeletePositionCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TDeletePositionCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const remove = useCallback(
    async (req: TDeletePositionCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.positions.delete(req);
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

  return { data, error, isLoading, remove, reset };
};
