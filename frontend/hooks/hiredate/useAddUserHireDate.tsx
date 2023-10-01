'use client';
import { useCallback, useState } from 'react';

import { TAddUserHireDateCommandReq, TAddUserHireDateCommandRes, ReqError } from '@interface/contracts.types';

export const useAddUserHireDate = (): {
  data: TAddUserHireDateCommandRes['success'] | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  add: (req: TAddUserHireDateCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TAddUserHireDateCommandRes['success'] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const add = useCallback(
    async (req: TAddUserHireDateCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.hireDate?.addUserHireDate(req);
          if ('success' in res) setData(res.success);
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

  return { data, error, isLoading, add, reset };
};
