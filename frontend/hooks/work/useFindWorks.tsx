'use client';
import { useCallback, useState } from 'react';

import { TFindWorksQueryRes, TFindWorksQueryReq, ReqError } from '@interface/contracts.types';

export const useFindWorks = (): {
  data: TFindWorksQueryRes[];
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  get: (req: TFindWorksQueryReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TFindWorksQueryRes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const get = useCallback(
    async (req: TFindWorksQueryReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.work?.findWorks(req);
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
