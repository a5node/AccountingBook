'use client';
import { useCallback, useState } from 'react';

import { TGetUserHireDatesQueryRes, TGetUserHireDatesQueryReq, ReqError } from '@interface/contracts.types';

export const useGetUserHireDate = (): {
  data: TGetUserHireDatesQueryRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  get: (req: TGetUserHireDatesQueryReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TGetUserHireDatesQueryRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const get = useCallback(
    async (req: TGetUserHireDatesQueryReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.hireDate?.getUserHireDates(req);
          if ('hireDates' in res) setData(res);
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

  return { data, error, isLoading, get, reset };
};
