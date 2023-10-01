'use client';
import { useCallback, useState } from 'react';

import { TAddProjectCommandReq, TAddProjectCommandRes, ReqError } from '@interface/contracts.types';

export const useAddProject = (): {
  data: TAddProjectCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  add: (req: TAddProjectCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TAddProjectCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const add = useCallback(
    async (req: TAddProjectCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.project?.addProject(req);
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

  return { data, error, isLoading, add, reset };
};
