'use client';
import { useCallback, useState } from 'react';

import { TCreateLinkCommandReq, TCreateLinkCommandRes, ReqError } from '@interface/contracts.types';

export const useCreateLink = (): {
  data: TCreateLinkCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  create: (req: TCreateLinkCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TCreateLinkCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const create = useCallback(
    async (req: TCreateLinkCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.links?.create(req);
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

  return { data, error, isLoading, create, reset };
};
