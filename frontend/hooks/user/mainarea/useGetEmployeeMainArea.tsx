'use client';
import { useCallback, useState } from 'react';

import { TGetEmployeeMainAreaQueryReq, TGetEmployeeMainAreaQueryRes, ReqError } from '@interface/contracts.types';

export const useGetEmployeeMainArea = (): {
  data: TGetEmployeeMainAreaQueryRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  addUserRole: (req: TGetEmployeeMainAreaQueryReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TGetEmployeeMainAreaQueryRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const addUserRole = useCallback(
    async (data: TGetEmployeeMainAreaQueryReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.mainArea?.getEmployeeMainAreas(data);
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

  return { data, error, isLoading, addUserRole, reset };
};
