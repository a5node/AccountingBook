'use client';
import { useCallback, useState } from 'react';

import { TAddEmployeePositionCommandReq, TAddEmployeePositionCommandRes, ReqError } from '@interface/contracts.types';

export const useAddEmployeePosition = (): {
  data: TAddEmployeePositionCommandRes['success'] | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  add: (req: TAddEmployeePositionCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setDate] = useState<TAddEmployeePositionCommandRes['success'] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const add = useCallback(
    async (req: TAddEmployeePositionCommandReq): Promise<void> => {
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
