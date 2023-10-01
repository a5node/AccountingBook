'use client';
import { useCallback, useState } from 'react';

import {
  TDeletePaymentEmployeeCommandReq,
  TDeletePaymentEmployeeCommandRes,
  ReqError,
} from '@interface/contracts.types';

export const useDeletePaymentEmployee = (): {
  data: TDeletePaymentEmployeeCommandRes | null;
  error: Partial<ReqError> | Error | null;
  isLoading: boolean;
  remove: (req: TDeletePaymentEmployeeCommandReq) => Promise<void>;
  reset: () => void;
} => {
  const [data, setData] = useState<TDeletePaymentEmployeeCommandRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ReqError> | Error | null>(null);

  const remove = useCallback(
    async (req: TDeletePaymentEmployeeCommandReq): Promise<void> => {
      try {
        if (window) {
          setIsLoading(true);
          setError(null);
          const res = await window.api?.database?.paymentEmployees?.delete(req);
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

  return { data, error, isLoading, remove, reset };
};
