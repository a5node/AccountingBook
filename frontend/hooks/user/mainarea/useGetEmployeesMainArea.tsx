'use client';
import { useCallback, useState } from 'react';

import { TGetEmployeesMainAreaQueryReq, TGetEmployeesMainAreaQueryRes, ReqError } from '@interface/contracts.types';

export const useGetEmployeesMainAreaQuery = (): {
  data: TGetEmployeesMainAreaQueryRes[] | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  get: (req: TGetEmployeesMainAreaQueryReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TGetEmployeesMainAreaQueryRes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const get = useCallback(
    async (req: TGetEmployeesMainAreaQueryReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.mainArea.getEmployeesMainAreas(req);
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
