'use client';
import { useCallback, useEffect, useState } from 'react';

import { TFindManyRolesQueryRes, ReqError } from '@interface/contracts.types';

export const useFindManyRoles = (): {
  data: TFindManyRolesQueryRes[];
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  get: () => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TFindManyRolesQueryRes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const get = useCallback(async (): Promise<void> => {
    try {
      if (window) {
        setIsLoading(true);
        setError(null);
        const res = await window.api?.database?.roles?.findMany();
        if (Array.isArray(res)) setData(res);
        else setError(res);
      }
    } catch (error) {
      setError(new Error('Something went wrong!'));
    }
    setIsLoading(false);
  }, [data, isLoading, error]);

  const reset = useCallback((): void => {
    setData([]);
    setError(null);
  }, [data, error]);

  useEffect(() => {
    void get();
  }, []);

  return { data, error, isLoading, get, reset };
};
