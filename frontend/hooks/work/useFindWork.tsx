'use client';
import { useCallback, useState } from 'react';

import { TFindWorkQueryRes, TFindWorkQueryReq, ReqError } from '@interface/contracts.types';

export const useFindWork = (): {
  data: TFindWorkQueryRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  get: (req: TFindWorkQueryReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TFindWorkQueryRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const get = useCallback(
    async (req: TFindWorkQueryReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.work.find(req);
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

  return { data, error, isLoading, get, reset };
};
