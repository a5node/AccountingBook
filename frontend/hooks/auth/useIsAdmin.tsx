'use client';
import { useCallback, useState, useEffect } from 'react';

import { ReqError } from '../../../contracts/types';

export const useIsAdmin = (): {
  isAdmin: boolean;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  check: () => void;
  reset: () => void;
} => {
  const [isAdmin, setAdmin] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const check = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await window?.api?.database?.auth.isAdmin();
      if (typeof res === 'boolean') setAdmin(res);
      else setError(res);
      setLoading(false);
    } catch {
      setError(new Error('Something went wrong!'));
      setLoading(false);
    }
  }, []);

  const reset = useCallback((): void => {
    setAdmin(false);
    setError(null);
  }, [isAdmin, error]);

  useEffect(() => {
    void check();
  }, []);

  return { isAdmin, error, isLoading, check, reset };
};
