'use client';
import { useCallback, useState } from 'react';

import { TGetEmployeesPositionsQueryReq, TGetEmployeesPositionsQueryRes, ReqError } from '@interface/contracts.types';

export const useGetEmployeesPositions = (): {
  data: TGetEmployeesPositionsQueryRes[] | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  get: (req: TGetEmployeesPositionsQueryReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TGetEmployeesPositionsQueryRes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const get = useCallback(
    async (req: TGetEmployeesPositionsQueryReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.positions.getEmployeesPositions(req);
          if (Array.isArray(res)) setData(res);
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
    setData([]);
    setError(null);
  }, [data, error]);

  return { data, error, isLoading, get, reset };
};
