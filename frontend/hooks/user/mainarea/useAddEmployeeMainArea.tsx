'use client';
import { useCallback, useState } from 'react';

import { TAddEmployeeMainAreaCommandReq, TAddEmployeeMainAreaCommandRes, ReqError } from '@interface/contracts.types';

export const useAddEmployeeMainArea = (): {
  data: TAddEmployeeMainAreaCommandRes['success'] | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  add: (req: TAddEmployeeMainAreaCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setDate] = useState<TAddEmployeeMainAreaCommandRes['success'] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const add = useCallback(
    async (req: TAddEmployeeMainAreaCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.positions.addEmployeePosition(req);
          if ('success' in res) setDate(res.success);
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
    setDate(null);
    setError(null);
  }, [data, error]);

  return { data, error, isLoading, add, reset };
};
