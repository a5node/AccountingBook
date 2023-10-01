'use client';
import { useCallback, useState } from 'react';

import { TGetUserLinksQueryReq, TGetUserLinksQueryRes, ReqError } from '@interface/contracts.types';

export const useGetUserLinks = (): {
  data: TGetUserLinksQueryRes[] | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  get: (req: TGetUserLinksQueryReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TGetUserLinksQueryRes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const get = useCallback(
    async (req: TGetUserLinksQueryReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.links?.getUserLinks(req);
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
