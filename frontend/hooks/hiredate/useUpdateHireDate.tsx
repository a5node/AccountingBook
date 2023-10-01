'use client';
import { useCallback, useState } from 'react';

import { TUpdateHireDateCommandReq, TUpdateHireDateCommandRes, ReqError } from '@interface/contracts.types';

export const useUpdateHireDate = (): {
  data: TUpdateHireDateCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  update: (req: TUpdateHireDateCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TUpdateHireDateCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const update = useCallback(
    async (req: TUpdateHireDateCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.hireDate?.update(req);
          if ('id' in res) setData(res);
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
