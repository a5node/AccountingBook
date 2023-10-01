'use client';
import { useCallback, useState } from 'react';

import { TUpdateLinkCommandReq, TUpdateLinkCommandRes, ReqError } from '@interface/contracts.types';

export const useUpdateLink = (): {
  data: TUpdateLinkCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  update: (req: TUpdateLinkCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TUpdateLinkCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const update = useCallback(
    async (req: TUpdateLinkCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.links?.update(req);
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

  return { data, error, isLoading, update, reset };
};
