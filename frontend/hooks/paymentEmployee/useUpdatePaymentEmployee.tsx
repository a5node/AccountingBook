'use client';
import { useCallback, useState } from 'react';

import {
  TUpdatePaymentEmployeeCommandReq,
  TUpdatePaymentEmployeeCommandRes,
  ReqError,
} from '@interface/contracts.types';

export const useUpdatePaymentEmployee = (): {
  data: TUpdatePaymentEmployeeCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  update: (req: TUpdatePaymentEmployeeCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TUpdatePaymentEmployeeCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const update = useCallback(
    async (req: TUpdatePaymentEmployeeCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.paymentEmployees?.update(req);
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
